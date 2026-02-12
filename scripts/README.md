# Scripts

## generate-image.js

Generate images for blog posts using fal.ai.

### Setup

1. Copy the sample env file and add your API key:
   ```bash
   cp scripts/.env.sample scripts/.env
   ```
2. Get an API key from [fal.ai](https://fal.ai) and set `FAL_API_KEY` in `scripts/.env`.

### Usage

```bash
node scripts/generate-image.js --prompt "A poker table with scattered chips" --output images/blog/poker-table.png
```

### Options

| Flag | Required | Default | Description |
|------|----------|---------|-------------|
| `--prompt` | Yes | — | Text prompt for image generation |
| `--output` | Yes | — | Output file path (directories created automatically) |
| `--size` | No | `4:3` | Aspect ratio (see per-model sizes below) |
| `--model` | No | from `.env` | Override `FAL_MODEL_ID` for this run |

### Model configuration

Set `FAL_MODEL_ID` in `scripts/.env` to use a different fal.ai model. Default: `fal-ai/flux/dev`.

## Models

### fal-ai/imagen4/preview — $0.04/image

Google Imagen 4. High-detail images with enhanced lighting and minimal artifacts.

| Param | Values |
|-------|--------|
| `--size` | `1:1`, `4:3`, `3:4`, `16:9`, `9:16` |
| resolution | `1K` (default), `2K` — set via env not CLI |
| output_format | jpeg, png (default), webp |
| num_images | 1-4 |

### fal-ai/ideogram/v2 — $0.08/image

Best-in-class typography and text rendering — great for posters and logos.

| Param | Values |
|-------|--------|
| `--size` | `1:1`, `4:3`, `3:4`, `16:9`, `9:16`, `3:2`, `2:3`, `10:16`, `16:10`, `1:3`, `3:1` |
| style | auto (default), general, realistic, design, render_3D, anime |
| negative_prompt | supported |
| expand_prompt | true (default) — auto-enhances prompt |

### xai/grok-imagine-image — $0.02/image

Highly aesthetic outputs across diverse creative styles. Cheapest option.

| Param | Values |
|-------|--------|
| `--size` | `1:1`, `4:3`, `3:4`, `16:9`, `9:16`, `3:2`, `2:3`, `2:1`, `1:2`, `20:9`, `9:20`, `19.5:9`, `9:19.5` |
| output_format | jpeg (default), png, webp |
| num_images | 1-4 |

### fal-ai/nano-banana — $0.04/image

Google model with multiple aspect ratios and image editing support.

| Param | Values |
|-------|--------|
| `--size` | `1:1`, `4:3`, `3:4`, `16:9`, `9:16`, `3:2`, `2:3`, `5:4`, `4:5`, `21:9` |
| output_format | jpeg, png (default), webp |
| num_images | 1-4 |
| safety_tolerance | 1 (strict) – 6 (lenient), default 4 |

### fal-ai/nano-banana-pro — $0.15/image

Premium quality with exceptional text rendering and multi-character consistency.

| Param | Values |
|-------|--------|
| `--size` | `auto`, `1:1`, `4:3`, `3:4`, `16:9`, `9:16`, `3:2`, `2:3`, `5:4`, `4:5`, `21:9` |
| resolution | `1K` (default), `2K`, `4K` |
| output_format | jpeg, png (default), webp |
| num_images | 1-4 |
| safety_tolerance | 1 (strict) – 6 (lenient), default 4 |
| enable_web_search | false (default) — use web info for generation |

### fal-ai/flux-2/turbo — ~$0.01/image

Fast and cheap ($0.008/megapixel). Good realism and native editing capabilities.

| Param | Values |
|-------|--------|
| `--size` | `square_hd`, `square`, `portrait_4_3`, `portrait_16_9`, `landscape_4_3` (default), `landscape_16_9`, or custom width/height 512-2048px |
| guidance_scale | 0-20, default 2.5 |
| num_inference_steps | 4-50, default 28 |
| output_format | jpeg, png (default), webp |
| num_images | 1-4 |
| enable_prompt_expansion | false (default) |

> **Note:** flux models use `image_size` format (e.g., `landscape_4_3`). All other models use aspect ratio format (e.g., `4:3`). The script handles this automatically — you can pass `4:3` to a flux model and it will be converted.