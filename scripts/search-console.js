#!/usr/bin/env node

const { google } = require("googleapis");
const http = require("http");
const fs = require("fs");
const path = require("path");

const ENV_PATH = path.join(__dirname, ".env");
require("dotenv").config({ path: ENV_PATH, quiet: true });

// ── Arg parsing ──────────────────────────────────────────────────────────────

function parseArgs(argv) {
  const args = { flags: {} };
  const raw = argv.slice(2);

  if (raw.length === 0) {
    usage();
    process.exit(1);
  }

  args.subcommand = raw[0];

  let i = 1;
  if (i < raw.length && !raw[i].startsWith("--")) {
    args.positional = raw[i++];
  }

  while (i < raw.length) {
    const key = raw[i];
    if (key === "--compare") {
      args.flags.compare = true;
      i++;
    } else if (raw[i + 1] !== undefined) {
      args.flags[key.replace(/^--/, "")] = raw[++i];
      i++;
    } else {
      i++;
    }
  }

  return args;
}

function usage() {
  console.error(`Usage: search-console.js <subcommand> [positional] [flags]

Subcommands:
  auth                  Authorize with Google (one-time browser flow)
  page <url-path>       Page performance metrics
  keywords <url-path>   Top queries for a page
  query <keyword>       Keyword performance over time
  overview              Site-wide top pages and keywords

Flags:
  --days <n>            Last N days (default: 28, ignored if --start/--end)
  --start <YYYY-MM-DD>  Explicit start date
  --end <YYYY-MM-DD>    Explicit end date
  --compare             Include previous period comparison
  --limit <n>           Max rows (default: 20)`);
}

// ── Date helpers ─────────────────────────────────────────────────────────────

function getDateRange(flags) {
  let end, start, days;

  if (flags.start && flags.end) {
    start = flags.start;
    end = flags.end;
    days = Math.round((new Date(end) - new Date(start)) / 86400000) + 1;
  } else {
    days = parseInt(flags.days || "28", 10);
    const now = new Date();
    end = formatDate(new Date(now.getTime() - 3 * 86400000));
    start = formatDate(new Date(new Date(end).getTime() - (days - 1) * 86400000));
  }

  return { start, end, days };
}

function getPreviousPeriod(start, days) {
  const s = new Date(start);
  const prevEnd = formatDate(new Date(s.getTime() - 86400000));
  const prevStart = formatDate(new Date(s.getTime() - days * 86400000));
  return { start: prevStart, end: prevEnd };
}

function formatDate(d) {
  return d.toISOString().slice(0, 10);
}

// ── Auth ─────────────────────────────────────────────────────────────────────

const SCOPES = ["https://www.googleapis.com/auth/webmasters.readonly"];
const REDIRECT_PORT = 3847;
const REDIRECT_URI = `http://localhost:${REDIRECT_PORT}`;

function getOAuth2Client() {
  const clientId = process.env.GSC_CLIENT_ID;
  const clientSecret = process.env.GSC_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    console.error("Error: GSC_CLIENT_ID and GSC_CLIENT_SECRET must be set in scripts/.env");
    process.exit(1);
  }
  return new google.auth.OAuth2(clientId, clientSecret, REDIRECT_URI);
}

function upsertEnvVar(key, value) {
  let content = "";
  if (fs.existsSync(ENV_PATH)) {
    content = fs.readFileSync(ENV_PATH, "utf-8");
  }
  const regex = new RegExp(`^${key}=.*$`, "m");
  if (regex.test(content)) {
    content = content.replace(regex, `${key}=${value}`);
  } else {
    content = content.trimEnd() + `\n${key}=${value}\n`;
  }
  fs.writeFileSync(ENV_PATH, content);
}

async function cmdAuth() {
  const oauth2Client = getOAuth2Client();
  const authUrl = oauth2Client.generateAuthUrl({ access_type: "offline", scope: SCOPES, prompt: "consent" });

  console.log(`Opening browser for authorization...\n\n${authUrl}\n`);

  const { exec } = require("child_process");
  exec(`open "${authUrl}"`);

  const code = await new Promise((resolve, reject) => {
    const server = http.createServer((req, res) => {
      const url = new URL(req.url, REDIRECT_URI);
      const code = url.searchParams.get("code");
      const error = url.searchParams.get("error");

      if (error) {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end("<h1>Authorization denied.</h1><p>You can close this tab.</p>");
        server.close();
        reject(new Error(`Authorization denied: ${error}`));
        return;
      }

      if (code) {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end("<h1>Authorization successful!</h1><p>You can close this tab.</p>");
        server.close();
        resolve(code);
      }
    });
    server.listen(REDIRECT_PORT);
  });

  const { tokens } = await oauth2Client.getToken(code);

  if (tokens.refresh_token) {
    upsertEnvVar("GSC_REFRESH_TOKEN", tokens.refresh_token);
    console.log("Refresh token saved to scripts/.env");
  } else {
    console.error("Warning: No refresh token received. Try revoking access and running auth again.");
  }

  return null;
}

async function getSearchConsole() {
  const refreshToken = process.env.GSC_REFRESH_TOKEN;
  if (!refreshToken) {
    console.error("Error: GSC_REFRESH_TOKEN not set. Run: node scripts/search-console.js auth");
    process.exit(1);
  }

  const property = process.env.GSC_PROPERTY;
  if (!property) {
    console.error("Error: GSC_PROPERTY not set in scripts/.env");
    process.exit(1);
  }

  const oauth2Client = getOAuth2Client();
  oauth2Client.setCredentials({ refresh_token: refreshToken });

  const searchconsole = google.searchconsole({ version: "v1", auth: oauth2Client });
  return { searchconsole, property };
}

// ── API helper ───────────────────────────────────────────────────────────────

async function querySearchAnalytics(sc, property, { startDate, endDate, dimensions, dimensionFilterGroups, rowLimit }) {
  const res = await sc.searchanalytics.query({
    siteUrl: property,
    requestBody: {
      startDate,
      endDate,
      dimensions,
      dimensionFilterGroups: dimensionFilterGroups || [],
      rowLimit: rowLimit || 20,
    },
  });
  return res.data.rows || [];
}

// ── Subcommands ──────────────────────────────────────────────────────────────

async function cmdPage(sc, property, args) {
  const urlPath = args.positional;
  if (!urlPath) { console.error("Error: page subcommand requires a URL path"); process.exit(1); }

  const { start, end, days } = getDateRange(args.flags);
  const limit = parseInt(args.flags.limit || "20", 10);

  const filters = [{
    filters: [{ dimension: "page", expression: urlPath, operator: "contains" }],
  }];

  const rows = await querySearchAnalytics(sc, property, {
    startDate: start, endDate: end, dimensions: ["page"],
    dimensionFilterGroups: filters, rowLimit: limit,
  });

  const metrics = aggregateMetrics(rows);
  const result = { subcommand: "page", page: urlPath, period: { start, end } };

  if (args.flags.compare) {
    const prev = getPreviousPeriod(start, days);
    const prevRows = await querySearchAnalytics(sc, property, {
      startDate: prev.start, endDate: prev.end, dimensions: ["page"],
      dimensionFilterGroups: filters, rowLimit: limit,
    });
    const prevMetrics = aggregateMetrics(prevRows);
    result.current = { start, end, ...metrics };
    result.previous = { start: prev.start, end: prev.end, ...prevMetrics };
    result.delta = computeDelta(metrics, prevMetrics);
  } else {
    result.metrics = metrics;
  }

  return result;
}

async function cmdKeywords(sc, property, args) {
  const urlPath = args.positional;
  if (!urlPath) { console.error("Error: keywords subcommand requires a URL path"); process.exit(1); }

  const { start, end, days } = getDateRange(args.flags);
  const limit = parseInt(args.flags.limit || "20", 10);

  const filters = [{
    filters: [{ dimension: "page", expression: urlPath, operator: "contains" }],
  }];

  const rows = await querySearchAnalytics(sc, property, {
    startDate: start, endDate: end, dimensions: ["query"],
    dimensionFilterGroups: filters, rowLimit: limit,
  });

  const keywords = rows.map((r) => ({
    query: r.keys[0], clicks: r.clicks, impressions: r.impressions,
    ctr: round(r.ctr, 4), position: round(r.position, 1),
  }));

  const result = { subcommand: "keywords", page: urlPath, period: { start, end }, keywords };

  if (args.flags.compare) {
    const prev = getPreviousPeriod(start, days);
    const prevRows = await querySearchAnalytics(sc, property, {
      startDate: prev.start, endDate: prev.end, dimensions: ["query"],
      dimensionFilterGroups: filters, rowLimit: limit,
    });
    const prevMap = Object.fromEntries(prevRows.map((r) => [r.keys[0], r]));
    result.keywords = keywords.map((kw) => {
      const p = prevMap[kw.query];
      return {
        ...kw,
        previous: p ? { clicks: p.clicks, impressions: p.impressions, ctr: round(p.ctr, 4), position: round(p.position, 1) } : null,
        delta: p ? { clicks: kw.clicks - p.clicks, impressions: kw.impressions - p.impressions, ctr: round(kw.ctr - p.ctr, 4), position: round(kw.position - p.position, 1) } : null,
      };
    });
    result.previousPeriod = { start: prev.start, end: prev.end };
  }

  return result;
}

async function cmdQuery(sc, property, args) {
  const keyword = args.positional;
  if (!keyword) { console.error("Error: query subcommand requires a keyword"); process.exit(1); }

  const { start, end, days } = getDateRange(args.flags);

  const filters = [{
    filters: [{ dimension: "query", expression: keyword, operator: "contains" }],
  }];

  const rows = await querySearchAnalytics(sc, property, {
    startDate: start, endDate: end, dimensions: ["date"],
    dimensionFilterGroups: filters, rowLimit: 25000,
  });

  const daily = rows.map((r) => ({
    date: r.keys[0], clicks: r.clicks, impressions: r.impressions,
    ctr: round(r.ctr, 4), position: round(r.position, 1),
  }));

  const result = { subcommand: "query", query: keyword, period: { start, end }, daily, totals: aggregateMetrics(rows) };

  if (args.flags.compare) {
    const prev = getPreviousPeriod(start, days);
    const prevRows = await querySearchAnalytics(sc, property, {
      startDate: prev.start, endDate: prev.end, dimensions: ["date"],
      dimensionFilterGroups: filters, rowLimit: 25000,
    });
    result.previousPeriod = { start: prev.start, end: prev.end };
    result.previousTotals = aggregateMetrics(prevRows);
    result.delta = computeDelta(result.totals, result.previousTotals);
  }

  return result;
}

async function cmdOverview(sc, property, args) {
  const { start, end, days } = getDateRange(args.flags);
  const limit = parseInt(args.flags.limit || "10", 10);

  const [pageRows, queryRows] = await Promise.all([
    querySearchAnalytics(sc, property, { startDate: start, endDate: end, dimensions: ["page"], rowLimit: limit }),
    querySearchAnalytics(sc, property, { startDate: start, endDate: end, dimensions: ["query"], rowLimit: limit }),
  ]);

  const topPages = pageRows.map((r) => ({
    page: r.keys[0], clicks: r.clicks, impressions: r.impressions,
    ctr: round(r.ctr, 4), position: round(r.position, 1),
  }));

  const topQueries = queryRows.map((r) => ({
    query: r.keys[0], clicks: r.clicks, impressions: r.impressions,
    ctr: round(r.ctr, 4), position: round(r.position, 1),
  }));

  const result = { subcommand: "overview", period: { start, end }, topPages, topQueries };

  if (args.flags.compare) {
    const prev = getPreviousPeriod(start, days);
    const [prevPageRows, prevQueryRows] = await Promise.all([
      querySearchAnalytics(sc, property, { startDate: prev.start, endDate: prev.end, dimensions: ["page"], rowLimit: limit }),
      querySearchAnalytics(sc, property, { startDate: prev.start, endDate: prev.end, dimensions: ["query"], rowLimit: limit }),
    ]);
    const prevPageMap = Object.fromEntries(prevPageRows.map((r) => [r.keys[0], r]));
    const prevQueryMap = Object.fromEntries(prevQueryRows.map((r) => [r.keys[0], r]));

    result.topPages = topPages.map((p) => {
      const prev = prevPageMap[p.page];
      return { ...p, previous: prev ? { clicks: prev.clicks, impressions: prev.impressions, ctr: round(prev.ctr, 4), position: round(prev.position, 1) } : null };
    });
    result.topQueries = topQueries.map((q) => {
      const prev = prevQueryMap[q.query];
      return { ...q, previous: prev ? { clicks: prev.clicks, impressions: prev.impressions, ctr: round(prev.ctr, 4), position: round(prev.position, 1) } : null };
    });
    result.previousPeriod = { start: prev.start, end: prev.end };
  }

  return result;
}

// ── Utilities ────────────────────────────────────────────────────────────────

function aggregateMetrics(rows) {
  if (rows.length === 0) return { clicks: 0, impressions: 0, ctr: 0, position: 0 };
  const clicks = rows.reduce((s, r) => s + r.clicks, 0);
  const impressions = rows.reduce((s, r) => s + r.impressions, 0);
  const ctr = impressions > 0 ? clicks / impressions : 0;
  const position = rows.reduce((s, r) => s + r.position * r.impressions, 0) / (impressions || 1);
  return { clicks, impressions, ctr: round(ctr, 4), position: round(position, 1) };
}

function computeDelta(current, previous) {
  return {
    clicks: current.clicks - previous.clicks,
    impressions: current.impressions - previous.impressions,
    ctr: round(current.ctr - previous.ctr, 4),
    position: round(current.position - previous.position, 1),
  };
}

function round(n, decimals) {
  const f = Math.pow(10, decimals);
  return Math.round(n * f) / f;
}

// ── Main ─────────────────────────────────────────────────────────────────────

const SUBCOMMANDS = { auth: cmdAuth, page: cmdPage, keywords: cmdKeywords, query: cmdQuery, overview: cmdOverview };

async function main() {
  const args = parseArgs(process.argv);
  const handler = SUBCOMMANDS[args.subcommand];

  if (!handler) {
    console.error(`Error: unknown subcommand "${args.subcommand}"`);
    usage();
    process.exit(1);
  }

  if (args.subcommand === "auth") {
    try { await cmdAuth(); } catch (err) { console.error(`Error: ${err.message}`); process.exit(1); }
    return;
  }

  const { searchconsole, property } = await getSearchConsole();

  try {
    const result = await handler(searchconsole, property, args);
    console.log(JSON.stringify(result, null, 2));
  } catch (err) {
    console.error(`Error: ${err.message}`);
    process.exit(1);
  }
}

main();
