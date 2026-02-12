#!/usr/bin/env node

const { fal } = require("@fal-ai/client");
const fs = require("fs");
const path = require("path");

require("dotenv").config({ path: path.join(__dirname, ".env") });

// Models that use image_size (e.g., "landscape_4_3") instead of aspect_ratio (e.g., "4:3")
const IMAGE_SIZE_MODELS = ["fal-ai/flux-2/turbo", "fal-ai/flux/dev"];

const VALID_ASPECT_RATIOS = [
  "1:1", "4:3", "3:4", "16:9", "9:16", "3:2", "2:3",
  "21:9", "5:4", "4:5", "10:16", "16:10", "1:3", "3:1",
  "20:9", "9:20", "19.5:9", "9:19.5", "2:1", "1:2",
];

const VALID_IMAGE_SIZES = [
  "square_hd", "square", "portrait_4_3", "portrait_16_9",
  "landscape_4_3", "landscape_16_9",
];

// Map aspect ratios to flux image_size equivalents
const RATIO_TO_IMAGE_SIZE = {
  "1:1": "square",
  "4:3": "landscape_4_3",
  "3:4": "portrait_4_3",
  "16:9": "landscape_16_9",
  "9:16": "portrait_16_9",
};

function parseArgs(argv) {
  const args = {};
  for (let i = 2; i < argv.length; i++) {
    if (argv[i] === "--prompt" && argv[i + 1]) {
      args.prompt = argv[++i];
    } else if (argv[i] === "--output" && argv[i + 1]) {
      args.output = argv[++i];
    } else if (argv[i] === "--size" && argv[i + 1]) {
      args.size = argv[++i];
    } else if (argv[i] === "--model" && argv[i + 1]) {
      args.model = argv[++i];
    }
  }
  return args;
}

async function main() {
  const args = parseArgs(process.argv);

  if (!args.prompt) {
    console.error("Error: --prompt is required");
    process.exit(1);
  }
  if (!args.output) {
    console.error("Error: --output is required");
    process.exit(1);
  }

  const apiKey = process.env.FAL_API_KEY;
  if (!apiKey) {
    console.error("Error: FAL_API_KEY not set in scripts/.env");
    process.exit(1);
  }

  const modelId = args.model || process.env.FAL_MODEL_ID || "fal-ai/flux/dev";
  const usesImageSize = IMAGE_SIZE_MODELS.some((m) => modelId.startsWith(m));
  const sizeArg = args.size || (usesImageSize ? "landscape_4_3" : "4:3");

  // Build the size input param based on model type
  let sizeInput;
  if (usesImageSize) {
    // Flux models: accept image_size values directly, or convert from aspect ratio
    const mapped = RATIO_TO_IMAGE_SIZE[sizeArg];
    const value = mapped || sizeArg;
    if (!VALID_IMAGE_SIZES.includes(value)) {
      console.error(`Error: invalid --size "${sizeArg}" for ${modelId}. Valid: ${VALID_IMAGE_SIZES.join(", ")}`);
      process.exit(1);
    }
    sizeInput = { image_size: value };
  } else {
    // Most models: use aspect_ratio
    if (!VALID_ASPECT_RATIOS.includes(sizeArg)) {
      console.error(`Error: invalid --size "${sizeArg}" for ${modelId}. Use aspect ratio format, e.g.: ${VALID_ASPECT_RATIOS.slice(0, 6).join(", ")}`);
      process.exit(1);
    }
    sizeInput = { aspect_ratio: sizeArg };
  }

  fal.config({ credentials: apiKey });

  try {
    console.log(`Generating image with ${modelId}...`);
    const result = await fal.subscribe(modelId, {
      input: {
        prompt: args.prompt,
        ...sizeInput,
      },
    });

    const imageUrl = result.data.images[0].url;
    console.log(`Downloading from ${imageUrl}...`);

    const response = await fetch(imageUrl);
    if (!response.ok) {
      throw new Error(`Failed to download image: ${response.status} ${response.statusText}`);
    }

    const buffer = Buffer.from(await response.arrayBuffer());
    const outputPath = path.resolve(args.output);
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, buffer);

    console.log(outputPath);
  } catch (err) {
    console.error(`Error: ${err.message}`);
    process.exit(1);
  }
}

main();
