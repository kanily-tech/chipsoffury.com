---
name: remove-bg
description: >
 Remove the background from an image using fal.ai (pixelcut/background-removal).
 Trigger when the user asks to "remove background", "make transparent", "cut
 out subject", "isolate from background", or supplies an image path and asks
 for it without a background. Output is PNG with alpha. Executes via the
 `genmedia` skill — no bespoke script.
allowed-tools: Bash(genmedia:*) Bash(mkdir:*)
---

# remove-bg: background removal via fal.ai

Removes the background from a single image (or a directory of images) using `pixelcut/background-removal` on fal.ai. All execution goes through the `genmedia` CLI; auth is handled by `genmedia setup`, no project `.env` required.

## Inputs to extract from the user

- **input** (required): path to a PNG or JPEG, or a directory of images for batch mode.
- **output** (optional): output file path. Default: `temp/removed-bg/<original-name>-no-bg.png`.

If input is a directory, loop and run the steps below once per image.

## Steps

Run each step as its own Bash call — do not chain with `&&`, do not use shell variable assignment with `$(…)`, do not add stray `echo` statements. Each call must be a single simple command that matches the allow-list.

1. Compute the output path if none was given (replace extension with `-no-bg.png`, place under `temp/removed-bg/`), then ensure its parent directory exists:

   ```bash
   mkdir -p "<output-dir>"
   ```

2. Upload the local file to the fal.ai CDN:

   ```bash
   genmedia upload "<input>" --json
   ```

   Read the `url` field from the JSON response — that is the CDN URL to use in step 3.

3. Run the model and download the result, passing the URL from step 2 as a literal string:

   ```bash
   genmedia run pixelcut/background-removal --image_url "<cdn-url-from-step-2>" --output_format rgba --download "<output-path>" --json
   ```

4. Report the saved output path.

## Notes

- Output is PNG with alpha channel. Convert afterwards if needed (e.g. `sips -s format jpeg <path>`).
- Uses fal.ai credits (billed per call).
- For a different background-removal model, run `genmedia models "background removal" --json` to discover alternatives, then `genmedia schema <id> --json` to confirm the input field name.
