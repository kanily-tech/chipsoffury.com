#!/usr/bin/env node

const { fal } = require("@fal-ai/client");
const fs = require("fs");
const path = require("path");

require("dotenv").config({ path: path.join(__dirname, ".env"), quiet: true });

const MODEL_ID = "pixelcut/background-removal";

function parseArgs(argv) {
  const args = {};
  for (let i = 2; i < argv.length; i++) {
    if (argv[i] === "--input" && argv[i + 1]) {
      args.input = argv[++i];
    } else if (argv[i] === "--output" && argv[i + 1]) {
      args.output = argv[++i];
    }
  }
  return args;
}

async function main() {
  const args = parseArgs(process.argv);

  if (!args.input) {
    console.error("Error: --input is required");
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

  const inputPath = path.resolve(args.input);
  if (!fs.existsSync(inputPath)) {
    console.error(`Error: input file not found: ${inputPath}`);
    process.exit(1);
  }

  fal.config({ credentials: apiKey });

  try {
    const fileBuffer = fs.readFileSync(inputPath);
    const ext = path.extname(inputPath).toLowerCase();
    const mime = ext === ".jpg" || ext === ".jpeg" ? "image/jpeg" : "image/png";
    const blob = new Blob([fileBuffer], { type: mime });

    console.log(`Uploading ${path.basename(inputPath)}...`);
    const uploadedUrl = await fal.storage.upload(blob);

    console.log(`Removing background with ${MODEL_ID}...`);
    const result = await fal.subscribe(MODEL_ID, {
      input: {
        image_url: uploadedUrl,
        output_format: "rgba",
        sync_mode: false,
      },
    });

    const imageUrl = result.data?.image?.url;
    if (!imageUrl) {
      throw new Error(`Unexpected response: ${JSON.stringify(result.data)}`);
    }

    console.log(`Downloading result...`);
    const response = await fetch(imageUrl);
    if (!response.ok) {
      throw new Error(`Failed to download result: ${response.status} ${response.statusText}`);
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
