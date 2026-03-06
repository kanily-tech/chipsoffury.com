---
allowed-tools: Bash(node scripts/search-console.js:*)
description: Query Google Search Console data for SEO analysis
argument-hint: <natural language query about page performance, keywords, or SEO>
---

## Context

- Site property: !`grep GSC_PROPERTY scripts/.env 2>/dev/null || echo "GSC_PROPERTY not configured in scripts/.env"`

## Your task

Query Google Search Console and analyze the results.

User request: $ARGUMENTS

## Instructions

1. Parse the user's request to determine:
   - **subcommand**: `page`, `keywords`, `query`, or `overview`
   - **positional**: URL path (for page/keywords) or keyword string (for query)
   - **flags**: --days, --start, --end, --compare, --limit

2. Mapping guide:
   - "How is [page] doing?" → `page <path>`
   - "What keywords drive traffic to [page]?" → `keywords <path>`
   - "How is [keyword] ranking?" → `query "<keyword>"`
   - "Show me top pages/keywords" → `overview`
   - "Compare before/after" or "has it improved?" → add `--compare`
   - Time references like "last week" → `--days 7`, "last 3 months" → `--days 90`
   - Explicit dates → `--start YYYY-MM-DD --end YYYY-MM-DD`

3. Run the script:
   ```
   node scripts/search-console.js <subcommand> [positional] [flags]
   ```

4. Interpret the JSON results. Provide:
   - **Summary**: Key metrics in plain language
   - **Highlights**: Best performing keywords, notable positions, CTR observations
   - **Trends**: If --compare was used, call out improvements and declines with percentages
   - **Opportunities**: Actionable suggestions, e.g.:
     - High impressions + low CTR → improve title/meta description
     - Position 5-15 → "striking distance" keywords worth optimizing for
     - Position declining → investigate content freshness or competition
     - New keywords appearing → consider creating dedicated content

## Subcommands Reference

| Subcommand | Positional | Description |
|------------|-----------|-------------|
| `page <path>` | URL path | Aggregate metrics for a page |
| `keywords <path>` | URL path | Top queries driving traffic to a page |
| `query "<keyword>"` | Keyword | Daily tracking for a keyword |
| `overview` | none | Site-wide top pages and queries |

## Flags

| Flag | Default | Description |
|------|---------|-------------|
| `--days <n>` | 28 | Last N days |
| `--start <date>` | — | Start date (YYYY-MM-DD) |
| `--end <date>` | — | End date (YYYY-MM-DD) |
| `--compare` | — | Compare to previous equal-length period |
| `--limit <n>` | 20 | Max rows |
