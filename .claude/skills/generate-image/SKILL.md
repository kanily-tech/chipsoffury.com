---
name: generate-image
description: >
 Generate an image from a text prompt using fal.ai. Trigger when the user
 asks to "generate an image", "create an image", "make a picture", "render
 this prompt", or wants visual content from a description. Supports multiple
 models (imagen4, ideogram, flux, gpt-image, nano-banana family, grok-imagine)
 with model-specific size-flag dispatch. Executes via the `genmedia` skill —
 no bespoke script.
allowed-tools: Bash(genmedia:*) Bash(mkdir:*)
---

# generate-image: text-to-image via fal.ai

Runs a text-to-image model on fal.ai through the `genmedia` CLI. Auth is handled by `genmedia setup`, no project `.env` required.

## Inputs to extract from the user

- **prompt** (required): the image description. If the user gave only a topic, craft a good visual prompt from it.
- **output** (optional): output file path. Default: `temp/generated-images/<slugified-prompt>.png` (slugify: lowercase, hyphens for spaces, strip special chars, ~50 chars).
- **model** (optional): default `fal-ai/imagen4/preview`. See model table below.
- **size** (optional): default `4:3`. Map to the right flag for the chosen model — see "Size flag dispatch" below.
- **quality** (optional, `fal-ai/gpt-image-1.5` only): `low | medium | high`, default `high`.

## Steps

1. Ensure the output directory exists:

   ```bash
   mkdir -p "$(dirname "<output-path>")"
   ```

2. Pick the size flag for the model (see dispatch table below), then run:

   ```bash
   genmedia run <model-id> \
     --prompt "<prompt>" \
     <size-flag> \
     [--quality <quality>] \
     --download "<output-path>" \
     --json
   ```

3. Report the output path, the model used, and the size that was passed.

## Size flag dispatch

The right flag depends on the model. Three families:

- **`fal-ai/flux/dev`, `fal-ai/flux-2/turbo`** — use `--image_size <named>` where named ∈ `square`, `square_hd`, `landscape_4_3`, `landscape_16_9`, `portrait_4_3`, `portrait_16_9`. Map common ratios:
  `1:1` → `square`, `4:3` → `landscape_4_3`, `3:4` → `portrait_4_3`, `16:9` → `landscape_16_9`, `9:16` → `portrait_16_9`.

- **`fal-ai/gpt-image-1.5`** — use `--image_size <pixels>` where pixels ∈ `1024x1024`, `1536x1024`, `1024x1536`. Map:
  `1:1` → `1024x1024`, `4:3` / `3:2` / `16:9` → `1536x1024`, `3:4` / `2:3` / `9:16` → `1024x1536`. Also pass `--quality <low|medium|high>` (default `high`).

- **All other models** (`fal-ai/imagen4/preview`, `fal-ai/ideogram/v2`, `xai/grok-imagine-image`, `fal-ai/nano-banana`, `fal-ai/nano-banana-pro`, `fal-ai/nano-banana-2`) — pass `--aspect_ratio <ratio>` directly (e.g. `4:3`, `16:9`).

For an unfamiliar model, run `genmedia schema <model-id> --json` to see which size field it expects.

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

### `fal-ai/gpt-image-1.5` pricing

Per-image, depends on `quality` × `image_size` (plus a small text token fee):

| Quality | 1024x1024 | 1024x1536 | 1536x1024 |
|---------|-----------|-----------|-----------|
| low     | $0.009    | $0.013    | $0.013    |
| medium  | $0.034    | $0.051    | $0.050    |
| high    | $0.133    | $0.200    | $0.199    |

Use `low` for cheap drafts.

## Aspect ratios accepted from the user

`1:1`, `4:3`, `3:4`, `16:9`, `9:16`, `3:2`, `2:3` are the common ones — translate to the model-specific flag per the dispatch table above.
