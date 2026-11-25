// news-image-20261125: a one-day world-news image for Wednesday 25 November 2026.
// The program copies the entry.png beside this file to the output directory
// (MAKEFUN_OUTPUT_DIR, default /output). Node 22, standard library only, no network.
//
// Run locally: mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';

// The image is shipped in the repository, so every run copies the same
// bytes: the output is byte-identical across runs by construction.
const entryPath = fileURLToPath(new URL('./entry.png', import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(outDir, { recursive: true });

// Validate the shipped image before handing it in: it must be a whole PNG
// of 1024x1024 or smaller and at most 1 MiB, the limits the bounty gates on.
// A corrupt or oversized image fails loudly here instead of at the gate.
const bytes = readFileSync(entryPath);
const PNG_MAGIC = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
if (!bytes.subarray(0, 8).equals(PNG_MAGIC)) throw new Error('entry.png is not a PNG');
const width = bytes.readUInt32BE(16);
const height = bytes.readUInt32BE(20);
if (width > 1024 || height > 1024) throw new Error(`entry.png is ${width}x${height}, over 1024x1024`);
if (bytes.length > 1048576) throw new Error(`entry.png is ${bytes.length} bytes, over 1 MiB`);
const outPath = join(outDir, 'entry.png');
copyFileSync(entryPath, outPath);
const sha = createHash('sha256').update(bytes).digest('hex');
console.log(`entry.png ${width}x${height} ${bytes.length} bytes sha256 ${sha}`);
