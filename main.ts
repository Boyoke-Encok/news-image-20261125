// news-image-20261125: a one-day world-news image for Wednesday 25 November 2026.
// The program copies the entry.png beside this file to the output directory
// (MAKEFUN_OUTPUT_DIR, default /output). Node 22, standard library only, no network.
//
// Run locally: mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

// The image is shipped in the repository, so every run copies the same
// bytes: the output is byte-identical across runs by construction.
const entryPath = fileURLToPath(new URL('./entry.png', import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(outDir, { recursive: true });
copyFileSync(entryPath, join(outDir, 'entry.png'));
