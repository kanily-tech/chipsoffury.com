---
allowed-tools: Bash(node scripts/generate-image.js:*)
description: Generate an image using fal.ai from a text prompt
argument-hint: <prompt> [--output path] [--model model-id] [--size ratio]
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

## Aspect ratios

Most models: `1:1`, `4:3`, `3:4`, `16:9`, `9:16`, `3:2`, `2:3`
Flux models use: `square`, `landscape_4_3`, `portrait_4_3`, `landscape_16_9`, `portrait_16_9` (script converts automatically)
