---
allowed-tools: Bash(node scripts/remove-bg.js:*)
description: Remove background from an image using fal.ai pixelcut/background-removal
argument-hint: <input-path> [--output path]
---

## Context

- API key config: `scripts/.env` (FAL_API_KEY)
- Model: `pixelcut/background-removal` (fal.ai)

## Your task

Remove the background from an image.

User request: $ARGUMENTS

## Instructions

1. Parse the user's request to extract:
   - **input** (required): Path to the input image (PNG or JPEG)
   - **output** (optional): Output file path. Default: `temp/removed-bg/<original-name>-no-bg.png`
   - **batch** (optional): If the input is a directory, loop over images in it and call the script once per file.

2. Generate an output path if none given:
   - Extract the filename without extension
   - Place in `temp/removed-bg/`
   - Example: `images/chip.png` → `temp/removed-bg/chip-no-bg.png`

3. Run the script:

   ```
   node scripts/remove-bg.js --input "<input>" --output "<output-path>"
   ```

4. After processing, report the output path.

## Notes

- Output is always PNG with an alpha channel (transparency). If the user needs a different format, convert afterwards (e.g. `sips -s format jpeg <path>`).
- Uses fal.ai credits (billed per call).
