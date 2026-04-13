---
allowed-tools: Bash(node scripts/generate-image.js:*)
description: Generate an image using fal.ai from a text prompt
argument-hint: <prompt> [--output path] [--model model-id] [--size ratio] [--quality low|medium|high]
---

## Context

- Available models and their defaults: !`cat scripts/.env.sample`
- Current model config: !`cat scripts/.env 2>/dev/null || echo "scripts/.env not found — run: cp scripts/.env.sample scripts/.env"`

## Your task

Generate an image using the fal.ai image generation script.

User request: $ARGUMENTS

## Instructions

1. Parse the user's request to extract:
   - **prompt** (required): The image description. If the user gave a topic or concept rather than a detailed prompt, craft a good visual prompt from it.
   - **output** (optional): Output file path. Default: `temp/generated-images/<slugified-prompt>.png`
   - **model** (optional): Model ID to use. If not specified, omit the flag (uses .env default).
   - **size** (optional): Aspect ratio like `4:3`, `16:9`, `1:1`. Default: `4:3`
   - **quality** (optional, `fal-ai/gpt-image-1.5` only): `low`, `medium`, or `high`. Default: `high`. Passed via `--quality`.

2. Generate a filename from the prompt if no output path is given:
   - Slugify: lowercase, replace spaces with hyphens, remove special chars, truncate to ~50 chars
   - Place in `temp/generated-images/`
   - Example: "A red poker chip on felt" → `temp/generated-images/a-red-poker-chip-on-felt.png`

3. Run the script:
   ```
   node scripts/generate-image.js --prompt "<prompt>" --output <path> [--model <model>] [--size <ratio>]
   ```

4. After generation, report:
   - The output path
   - The model used
   - The aspect ratio used

## Available models

| Model | Price | Best for |
|-------|-------|----------|
| `fal-ai/imagen4/preview` | $0.04 | High detail, lighting, minimal artifacts |
| `fal-ai/ideogram/v2` | $0.08 | Text/typography in images, logos |
| `xai/grok-imagine-image` | $0.02 | Aesthetic creative styles, cheapest |
| `fal-ai/nano-banana` | $0.04 | Multiple aspect ratios, editing |
| `fal-ai/nano-banana-pro` | $0.15 | Premium quality, text rendering |
| `fal-ai/flux-2/turbo` | ~$0.01 | Fast and cheap |
| `fal-ai/nano-banana-2` | $0.04 | Updated version of nano-banana |
| `fal-ai/gpt-image-1.5` | variable (see below) | Strong prompt adherence, composition, fine detail |

### `fal-ai/gpt-image-1.5` pricing and sizing

Pricing is per-image and depends on `quality` × `image_size` (plus a small text token fee):

| Quality | 1024x1024 | 1024x1536 | 1536x1024 |
|---------|-----------|-----------|-----------|
| low     | $0.009    | $0.013    | $0.013    |
| medium  | $0.034    | $0.051    | $0.050    |
| high    | $0.133    | $0.200    | $0.199    |

- Only three `image_size` values are supported: `1024x1024` (1:1), `1536x1024` (landscape ≈ 3:2), `1024x1536` (portrait ≈ 2:3). Pass `--size` as either the pixel string or a common ratio — the script maps `1:1`/`4:3`/`16:9`/`3:2` → `1536x1024` landscape variants, and `3:4`/`9:16`/`2:3` → `1024x1536` portrait.
- Pass `--quality low|medium|high` (default `high`). Use `low` for cheap drafts.

## Aspect ratios

Most models: `1:1`, `4:3`, `3:4`, `16:9`, `9:16`, `3:2`, `2:3`
Flux models use: `square`, `landscape_4_3`, `portrait_4_3`, `landscape_16_9`, `portrait_16_9` (script converts automatically)
