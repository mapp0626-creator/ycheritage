import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = fileURLToPath(new URL('../dist/', import.meta.url));
test('built page has all local assets and valid section anchors', async () => {
  const html = await readFile(path.join(root, 'index.html'), 'utf8');
  for (const [, reference] of html.matchAll(/(?:src|href)="([^"]+)"/g)) {
    if (reference.startsWith('#')) assert.ok(html.includes(`id="${reference.slice(1)}"`), reference);
    else if (!/^[a-z]+:/i.test(reference)) await access(path.join(root, reference));
  }
  assert.match(html, /Suite 1117, Sun House/);
  assert.match(html, /mailto:blahblah@blahblah.com/);
  assert.doesNotMatch(html, /menu-toggle|id="philosophy"/);
});
