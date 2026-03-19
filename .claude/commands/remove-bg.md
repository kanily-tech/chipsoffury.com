---
allowed-tools: Bash(uv run --project scripts/python withoutbg:*)
description: Remove background from an image using AI (local or API)
argument-hint: <input-path> [--output path] [--use-api] [--format png|jpg|webp]
---

## Context

- API key config: `scripts/.env` (WITHOUTBG_API_KEY)
- Python env: `scripts/python/` (run `uv sync --project scripts/python` if missing)

## Your task

Remove the background from an image.

User request: $ARGUMENTS

## Instructions

1. Parse the user's request to extract:
   - **input** (required): Path to the input image
   - **output** (optional): Output file path. Default: `temp/removed-bg/<original-name>-no-bg.png`
   - **use-api** (optional): If specified, use withoutBG Pro cloud API instead of local model
   - **format** (optional): Output format — `png`, `jpg`, or `webp`. Default: `png`
   - **quality** (optional): JPEG quality 1-100 (only relevant for jpg format)
   - **batch** (optional): If the input is a directory, process all images in it

2. Generate an output path if none given:
   - Extract the filename without extension
   - Place in `temp/removed-bg/`
   - Example: `images/chip.png` → `temp/removed-bg/chip-no-bg.png`

3. Build and run the command:

   **Local mode (default):**
   ```
   uv run --project scripts/python withoutbg "<input>" --output <output-path> [--format <fmt>]
   ```

   **API mode** (when user requests `--use-api` or higher quality):
   ```
   source scripts/.env && WITHOUTBG_API_KEY=$WITHOUTBG_API_KEY uv run --project scripts/python withoutbg "<input>" --output <output-path> --use-api [--format <fmt>]
   ```

4. After processing, report:
   - The output path
   - The mode used (local or API)
   - The output format

## Modes

| Mode | Cost | Quality | Speed |
|------|------|---------|-------|
| Local (default) | Free | Good | ~5-10s first run (downloads ~320MB models), fast after |
| API (`--use-api`) | Per-image | Best | Fast, 7 req/min rate limit |