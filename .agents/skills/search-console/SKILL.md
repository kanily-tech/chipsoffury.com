---
name: search-console
description: >
 Use when the user asks about Google Search Console data, SEO performance,
 organic search traffic, keyword rankings, impressions, clicks, CTR, or
 average position for a page or keyword. Triggers on questions like "how is
 [page] doing in search?", "what keywords drive traffic to [page]?", "how is
 [keyword] ranking?", "show me top pages/keywords", or "has [page] improved?".
 Queries Search Console via `scripts/search-console.js` and interprets the
 results.
allowed-tools: Bash(node scripts/search-console.js:*) Bash(grep:*)
---

# search-console: query Google Search Console for SEO analysis

Run `scripts/search-console.js` to pull Google Search Console (GSC) metrics for
the site, then interpret the JSON results into a plain-language analysis.

## Prerequisites

The script reads credentials from `scripts/.env`. Before running a query,
confirm the site property is configured:

```bash
grep GSC_PROPERTY scripts/.env
```

If `GSC_PROPERTY` is missing, tell the user it must be set in `scripts/.env`.
If the script reports `GSC_REFRESH_TOKEN not set`, the user must first run the
one-time browser auth flow: `node scripts/search-console.js auth`.

## Workflow

1. Parse the user's request to determine:
   - **subcommand**: `page`, `keywords`, `query`, or `overview`
   - **positional**: URL path (for `page`/`keywords`) or keyword string (for `query`)
   - **flags**: `--days`, `--start`, `--end`, `--compare`, `--limit`

2. Mapping guide:
   - "How is [page] doing?" → `page <path>`
   - "What keywords drive traffic to [page]?" → `keywords <path>`
   - "How is [keyword] ranking?" → `query "<keyword>"`
   - "Show me top pages/keywords" → `overview`
   - "Compare before/after" or "has it improved?" → add `--compare`
   - Time references like "last week" → `--days 7`, "last 3 months" → `--days 90`
   - Explicit dates → `--start YYYY-MM-DD --end YYYY-MM-DD`

3. Run the script:

   ```bash
   node scripts/search-console.js <subcommand> [positional] [flags]
   ```

4. Interpret the JSON results. Provide:
   - **Summary**: Key metrics in plain language
   - **Highlights**: Best performing keywords, notable positions, CTR observations
   - **Trends**: If `--compare` was used, call out improvements and declines with percentages
   - **Opportunities**: Actionable suggestions, e.g.:
     - High impressions + low CTR → improve title/meta description
     - Position 5-15 → "striking distance" keywords worth optimizing for
     - Position declining → investigate content freshness or competition
     - New keywords appearing → consider creating dedicated content

## Subcommands

| Subcommand     | Positional | Description                              |
|----------------|------------|------------------------------------------|
| `page <path>`     | URL path   | Aggregate metrics for a page             |
| `keywords <path>` | URL path   | Top queries driving traffic to a page    |
| `query "<keyword>"` | Keyword  | Daily tracking for a keyword             |
| `overview`        | none       | Site-wide top pages and queries          |
| `auth`            | none       | One-time Google authorization (browser)  |

## Flags

| Flag             | Default | Description                                 |
|------------------|---------|---------------------------------------------|
| `--days <n>`       | 28      | Last N days (ignored if `--start`/`--end`)  |
| `--start <date>`   | —       | Start date (YYYY-MM-DD)                     |
| `--end <date>`     | —       | End date (YYYY-MM-DD)                       |
| `--compare`        | —       | Compare to previous equal-length period     |
| `--limit <n>`      | 20      | Max rows                                    |
