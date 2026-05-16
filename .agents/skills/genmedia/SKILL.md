---
name: genmedia
description: >
 Use the genmedia CLI to search, inspect, run, and manage 1200+ fal.ai model
 endpoints. Trigger when the user mentions "genmedia", "fal CLI", or asks to
 "search models", "run a model", "fetch schema", "check pricing", "upload to
 fal", "queue async job", "track request", or any direct interaction with the
 fal.ai endpoint catalog. This is the foundational skill. Every other
 fal.ai-related skill in this repo executes its work through genmedia
 commands. Use `--json` whenever the output will be parsed by an agent.
allowed-tools: Bash(genmedia:*) Bash(jq:*) Bash(mkdir:*)
---

# genmedia CLI: fal.ai endpoint runner

`genmedia` is the agent-first CLI for fal.ai. It works in a terminal for humans (pretty output) and equally well for agents (structured JSON when piped or with `--json`). All other skills in this repo call `genmedia` for execution, they do not wrap the fal.ai HTTP API directly.

For the full command surface (every flag, every option, every example), see [references/full-reference.md](references/full-reference.md).

## Critical rules

1. **Always use `--json` when an agent will read the output.** Pretty mode is for humans only.
2. **Never invent endpoint IDs.** Use `genmedia models "<query>"` to discover, `genmedia models --endpoint_id <id>` to verify.
3. **Inspect schema before running.** `genmedia schema <endpoint_id> --json` shows the exact field names. Guessed flags fail with 422.
4. **Pass `array<...>` inputs as a JSON-array literal.** For any field whose schema type is `array<...>` (e.g. `image_urls`, `images`, `reference_images`), use a single flag whose value is a JSON-encoded list: `--image_urls '["url1","url2"]'`. Comma-joined strings (`"url1,url2"`) and repeated flags (`--image_urls url1 --image_urls url2`) both fail with 422 `Input should be a valid list` — the CLI does not split or repeat-collect for array params.
5. **Save files with `--download`, not curl.** The CLI handles authentication, naming, and file format detection.
6. **Use `--async` for long-running generation.** Image work usually completes inline; video/audio/3D usually need queue + status polling.

## Command index

| Command | Purpose |
|---------|---------|
| `genmedia setup` | Configure API key, output mode, auto-update |
| `genmedia models <query>` | Search the catalog (or `--category`, or `--endpoint_id`) |
| `genmedia schema <endpoint_id>` | Inspect inputs/outputs (compact or `--format openapi`) |
| `genmedia run <endpoint_id> --<param> <value>` | Execute a model |
| `genmedia status <endpoint_id> <request_id>` | Poll an async job (with `--result`, `--logs`, `--cancel`, `--download`) |
| `genmedia upload <path-or-url>` | Upload a local file or remote URL to the fal.ai CDN |
| `genmedia pricing <endpoint_id>` | Check cost per call |
| `genmedia docs <query>` | Search fal.ai documentation |
| `genmedia init` | Install the default skill bundle into `.agents/skills/` or `.claude/skills/` |
| `genmedia skills <list|install|update|remove>` | Manage installed agent skills |
| `genmedia version` / `genmedia update` | Check or apply CLI updates |

## Quick patterns

### Run a model and download the result

```bash
genmedia run fal-ai/flux/dev \
 --prompt "a cat on the moon" \
 --download "./out/{request_id}_{index}.{ext}" \
 --json
```

### Async + poll

```bash
SUBMIT=$(genmedia run fal-ai/veo3.1 --prompt "a dog running" --async --json)
REQ=$(echo "$SUBMIT" | jq -r '.request_id')
genmedia status fal-ai/veo3.1 "$REQ" \
 --download "./out/{request_id}_{index}.{ext}" \
 --json
```

### Upload then run

```bash
URL=$(genmedia upload ./photo.jpg --json | jq -r '.cdn_url')
genmedia run fal-ai/nano-banana-pro/edit \
 --image_urls "[\"$URL\"]" \
 --prompt "make the sky stormy" \
 --download "./out/{request_id}_{index}.{ext}" \
 --json
```

For multiple URLs, build the JSON array with `jq` so quoting stays clean:

```bash
URLS_JSON=$(jq -nc '$ARGS.positional' --args "$URL_A" "$URL_B" "$URL_C")
genmedia run fal-ai/nano-banana-2/edit \
 --image_urls "$URLS_JSON" \
 --prompt "..." \
 --json
```

### Discover when the user names a fuzzy task

```bash
genmedia models "background removal product image" --json
genmedia models --category text-to-video --limit 5 --json
genmedia docs "webhook callbacks" --json
```

## Setup (first-time only)

If `genmedia` is not installed:

```bash
curl https://genmedia.sh/install -fsS | bash # Linux / macOS
irm https://genmedia.sh/install.ps1 | iex # Windows PowerShell
genmedia setup --non-interactive --api-key "$FAL_KEY"
```

For full setup details (output modes, auto-update, `.env` loading) see [full-reference.md](references/full-reference.md).
