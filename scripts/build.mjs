import { cp, mkdir, readdir, rm } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import config from '../site.config.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const source = path.resolve(root, config.sourceDirectory);
const assets = path.resolve(root, config.publicDirectory);
const output = path.resolve(root, config.outputDirectory);
// Keep the only recursive deletion confined to the generated dist folder.
if (output !== path.join(root, 'dist')) throw new Error('Build output must be project/dist.');
await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
for (const directory of [source, assets]) {
  for (const entry of await readdir(directory)) {
    await cp(path.join(directory, entry), path.join(output, entry), { recursive: true });
  }
}
console.log('Built static website in dist/');
