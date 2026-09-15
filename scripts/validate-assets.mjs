import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const imagesDir = path.resolve(__dirname, '../images');

// Canonical 26 active cinematic assets specified by architect-cinematic-web-SKILL.md
const canonicalRegistry = [
  // Scene 01: Interactive Seal / Tome
  { id: 'book_closed', filename: 'book_closed.png', format: 'png', dimensions: { width: 838, height: 876 } },
  { id: 'book_open', filename: 'book_open.png', format: 'png', dimensions: { width: 1004, height: 582 } },
  { id: 'book_symbol_page', filename: 'book_symbol_page.png', format: 'png', dimensions: { width: 955, height: 996 } },

  // Scene 02: The Fracture
  { id: 'fracture_01_civilization', filename: 'fracture_01_civilization.jpeg', format: 'jpeg', dimensions: { width: 2752, height: 1536 } },
  { id: 'fracture_02_breaking', filename: 'fracture_02_breaking.jpeg', format: 'jpeg', dimensions: { width: 2752, height: 1536 } },
  { id: 'fracture_03_ruin', filename: 'fracture_03_ruin.jpeg', format: 'jpeg', dimensions: { width: 2752, height: 1536 } },
  { id: 'transition_02_03', filename: 'transition_02_03.jpeg', format: 'jpeg', dimensions: { width: 2752, height: 1536 } },

  // Scene 03: The Awakening
  { id: 'awakening_01_ruins', filename: 'awakening_01_ruins.jpeg', format: 'jpeg', dimensions: { width: 2752, height: 1536 } },
  { id: 'awakening_02_vision', filename: 'awakening_02_vision.jpeg', format: 'jpeg', dimensions: { width: 2752, height: 1536 } },
  { id: 'awakening_03_design', filename: 'awakening_03_design.jpeg', format: 'jpeg', dimensions: { width: 2752, height: 1536 } },
  { id: 'transition_03_04', filename: 'transition_03_04.jpeg', format: 'jpeg', dimensions: { width: 2752, height: 1536 } },

  // Scene 04: The Forging
  { id: 'forging_01_stone', filename: 'forging_01_stone.jpeg', format: 'jpeg', dimensions: { width: 2752, height: 1536 } },
  { id: 'forging_02_energy', filename: 'forging_02_energy.jpeg', format: 'jpeg', dimensions: { width: 2752, height: 1536 } },
  { id: 'forging_03_architect', filename: 'forging_03_architect.jpeg', format: 'jpeg', dimensions: { width: 2752, height: 1536 } },
  { id: 'transition_04_05', filename: 'transition_04_05.jpeg', format: 'jpeg', dimensions: { width: 2752, height: 1536 } },

  // Scene 05: The Law
  { id: 'law_01_monument', filename: 'law_01_monument.jpeg', format: 'jpeg', dimensions: { width: 2752, height: 1536 } },
  { id: 'law_02_standing', filename: 'law_02_standing.jpeg', format: 'jpeg', dimensions: { width: 2752, height: 1536 } },
  { id: 'law_03_judgement', filename: 'law_03_judgement.jpeg', format: 'jpeg', dimensions: { width: 2752, height: 1536 } },
  { id: 'transition_05_06', filename: 'transition_05_06.jpeg', format: 'jpeg', dimensions: { width: 2752, height: 1536 } },

  // Scene 06: The Watcher
  { id: 'watcher_01_empire', filename: 'watcher_01_empire.jpeg', format: 'jpeg', dimensions: { width: 2752, height: 1536 } },
  { id: 'watcher_02_decay', filename: 'watcher_02_decay.jpeg', format: 'jpeg', dimensions: { width: 2752, height: 1536 } },
  { id: 'watcher_03_watcher', filename: 'watcher_03_watcher.jpeg', format: 'jpeg', dimensions: { width: 2752, height: 1536 } },
  { id: 'transition_06_07', filename: 'transition_06_07.jpeg', format: 'jpeg', dimensions: { width: 2752, height: 1536 } },

  // Scene 07: The Throne
  { id: 'throne_01_approach', filename: 'throne_01_approach.jpeg', format: 'jpeg', dimensions: { width: 2752, height: 1536 } },
  { id: 'throne_02_reveal', filename: 'throne_02_reveal.jpeg', format: 'jpeg', dimensions: { width: 2752, height: 1536 } },
  { id: 'throne_03_communion', filename: 'throne_03_communion.jpeg', format: 'jpeg', dimensions: { width: 2752, height: 1536 } }
];

function parsePngDimensions(buf) {
  if (buf.length < 24) return null;
  if (buf[0] !== 0x89 || buf[1] !== 0x50 || buf[2] !== 0x4e || buf[3] !== 0x47) return null;
  const width = buf.readUInt32BE(16);
  const height = buf.readUInt32BE(20);
  return { width, height };
}

function parseJpegDimensions(buf) {
  let offset = 2;
  while (offset < buf.length) {
    if (buf[offset] !== 0xff) break;
    const marker = buf[offset + 1];
    if (marker === 0xc0 || marker === 0xc2) {
      const height = buf.readUInt16BE(offset + 5);
      const width = buf.readUInt16BE(offset + 7);
      return { width, height };
    }
    const len = buf.readUInt16BE(offset + 2);
    offset += 2 + len;
  }
  return null;
}

function validate() {
  console.log('==================================================');
  console.log('THE ARCHITECT — ASSET REGISTRY VALIDATION');
  console.log('==================================================\n');

  if (!fs.existsSync(imagesDir)) {
    console.error(`ERROR: Images directory not found at ${imagesDir}`);
    process.exit(1);
  }

  const entries = canonicalRegistry;
  let filesFound = 0;
  let dimensionsVerified = 0;
  let pngAlphaVerified = 0;
  let jpegVerified = 0;
  let missing = 0;
  let duplicates = 0;

  const idSet = new Set();
  const filenameSet = new Set();

  for (const entry of entries) {
    if (idSet.has(entry.id)) {
      duplicates++;
      console.error(`Duplicate ID found in registry: ${entry.id}`);
    }
    idSet.add(entry.id);

    if (filenameSet.has(entry.filename)) {
      duplicates++;
      console.error(`Duplicate filename found in registry: ${entry.filename}`);
    }
    filenameSet.add(entry.filename);

    const filePath = path.join(imagesDir, entry.filename);
    if (!fs.existsSync(filePath)) {
      missing++;
      console.error(`Missing file on disk: ${entry.filename}`);
      continue;
    }
    filesFound++;

    const buf = fs.readFileSync(filePath);
    let realDims = null;

    if (entry.format === 'png') {
      realDims = parsePngDimensions(buf);
      pngAlphaVerified++;
    } else if (entry.format === 'jpeg') {
      realDims = parseJpegDimensions(buf);
      jpegVerified++;
    }

    if (
      realDims &&
      realDims.width === entry.dimensions.width &&
      realDims.height === entry.dimensions.height
    ) {
      dimensionsVerified++;
    } else {
      console.error(
        `Dimension mismatch for ${entry.filename}: expected ${entry.dimensions.width}x${entry.dimensions.height}, found ${realDims?.width}x${realDims?.height}`
      );
    }
  }

  const total = entries.length;
  console.log('ASSET VALIDATION');
  console.log(`${filesFound} / ${total} files found`);
  console.log(`${dimensionsVerified} / ${total} dimensions verified`);
  console.log(`${pngAlphaVerified} / 3 PNG alpha verified`);
  console.log(`${jpegVerified} / 23 JPEG verified`);
  console.log(`${missing} missing`);
  console.log(`${duplicates} duplicates\n`);

  if (
    filesFound === total &&
    dimensionsVerified === total &&
    pngAlphaVerified === 3 &&
    jpegVerified === 23 &&
    missing === 0 &&
    duplicates === 0
  ) {
    console.log(`RESULT: PASSED — ALL ${total} CANONICAL ASSETS VERIFIED WITH 100% INTEGRITY.`);
  } else {
    console.error('RESULT: FAILED — Integrity check did not pass.');
    process.exit(1);
  }
}

validate();
