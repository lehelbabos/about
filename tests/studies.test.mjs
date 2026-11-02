import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import { webcrypto } from 'node:crypto';
import { spawnSync } from 'node:child_process';
import { encrypt, decrypt, renderStudy, previewHTML, safeFilePath, assetToken } from '../scripts/study-core.mjs';
import { readAccess, rememberAccess, hasAccess, accessLifetime } from '../src/scripts/study-access.mjs';

test('encrypted bundles open in Web Crypto, reject incorrect passwords, and authenticate all bytes', async () => {
  const source = { html: '<h1>A private study</h1>', files: { 'assets/a.png': { data: 'aGVsbG8=', encoding: 'base64', mime: 'image/png' } } };
  const envelope = encrypt(source, 'test-only-password');
  assert.deepEqual(decrypt(envelope, 'test-only-password'), source);
  assert.throws(() => decrypt(envelope, 'wrong-password'));
  assert.ok(!JSON.stringify(envelope).includes('A private study'));
  const altered = structuredClone(envelope);
  const bytes = Buffer.from(altered.ciphertext, 'base64'); bytes[0] ^= 1; altered.ciphertext = bytes.toString('base64');
  assert.throws(() => decrypt(altered, 'test-only-password'));
  const material = await webcrypto.subtle.importKey('raw', new TextEncoder().encode('test-only-password'), 'PBKDF2', false, ['deriveKey']);
  const key = await webcrypto.subtle.deriveKey({ name: 'PBKDF2', salt: Buffer.from(envelope.salt, 'base64'), iterations: envelope.iterations, hash: 'SHA-256' }, material, { name: 'AES-GCM', length: 256 }, false, ['decrypt']);
  const result = await webcrypto.subtle.decrypt({ name: 'AES-GCM', iv: Buffer.from(envelope.iv, 'base64') }, key, Buffer.from(envelope.ciphertext, 'base64'));
  assert.deepEqual(JSON.parse(new TextDecoder().decode(result)), source);
});

test('local Markdown and assets can be rendered and restored from a sealed study', async () => {
  const dir = await fs.mkdtemp(path.join(os.tmpdir(), 'portfolio-study-'));
  try {
    await fs.mkdir(path.join(dir, 'assets'));
    await fs.writeFile(path.join(dir, 'index.md'), '---\ntitle: Example\nslug: example\ndraft: true\n---\n\n## Context\n\nA draft with ![a diagram](assets/diagram.png)');
    await fs.writeFile(path.join(dir, 'assets/diagram.png'), Buffer.from([1, 2, 3]));
    // The original migration remains archived beside the active Markdown source.
    await fs.writeFile(path.join(dir, 'layout.json'), JSON.stringify({ title: 'Archived title', sections: [] }));
    const payload = await renderStudy(dir);
    assert.equal(payload.metadata.draft, true);
    assert.match(payload.html, /<h2>Context<\/h2>/);
    assert.match(payload.html, /<article class="case-study"/);
    assert.ok(!payload.html.includes('Archived title'));
    assert.ok(payload.html.includes(assetToken('assets/diagram.png')));
    assert.ok(!payload.html.includes('src="assets/'));
    const preview = previewHTML(payload, '/portfolio/');
    assert.match(preview, /href="\/portfolio\/#work-heading"/);
    assert.match(preview, /src="data:image\/png;base64,/);
    assert.ok(!preview.includes('__PORTFOLIO_BASE__'));
    const restored = decrypt(encrypt(payload, 'test-only-password'), 'test-only-password');
    assert.equal(restored.files['index.md'].data, payload.files['index.md'].data);
    assert.deepEqual(Buffer.from(restored.files['assets/diagram.png'].data, 'base64'), Buffer.from([1, 2, 3]));
    assert.throws(() => safeFilePath(dir, '../outside'));
    assert.throws(() => safeFilePath(dir, '/absolute'));
  } finally { await fs.rm(dir, { recursive: true, force: true }); }
});

test('production output contains empty password shells and encrypted assets, with no private source files', async () => {
  const root = path.resolve('dist');
  const walk = async dir => (await Promise.all((await fs.readdir(dir, { withFileTypes: true })).map(async e => e.isDirectory() ? walk(path.join(dir, e.name)) : path.join(dir, e.name)))).flat();
  for (const file of await walk(root)) {
    assert.ok(!file.includes('/.private/'));
    if (!/\.(?:html|css|js|json|map|md)$/.test(file)) continue;
    const text = await fs.readFile(file, 'utf8');
    assert.ok(!text.includes('images.squarespace-cdn.com'), `Squarespace asset dependency: ${file}`);
  }
  for (const slug of ['indeed-connect', 'tablecheck-reservations']) {
    const html = await fs.readFile(path.join(root, slug, 'index.html'), 'utf8');
    assert.match(html, /Case study password/);
    assert.ok(!html.includes('class="migrated-study"'));
    assert.equal(/<div id="study-content"[^>]*>([\s\S]*?)<\/div>/.exec(html)?.[1], '');
    const envelope = JSON.parse(await fs.readFile(path.join(root, 'protected', slug + '.json'), 'utf8'));
    assert.equal(envelope.algorithm, 'AES-GCM');
    assert.ok(envelope.ciphertext.length > 1000);
    assert.ok(!('files' in envelope));
    assert.ok(!('html' in envelope));
  }
});

test('one successful unlock grants access across pages and tabs until expiry without storing the password', () => {
  const items = new Map();
  const storage = { get length() { return items.size; }, key: index => [...items.keys()][index], getItem: key => items.get(key) ?? null, setItem: (key, value) => items.set(key, value), removeItem: key => items.delete(key) };
  const rawKey = Buffer.alloc(32, 3).toString('base64');
  const now = 1000;
  rememberAccess(storage, 'shared-collection', rawKey, now);
  assert.equal(hasAccess(storage, now), true);
  assert.equal(readAccess(storage, 'shared-collection', now), rawKey);
  assert.equal(readAccess(storage, 'different-collection', now), null);
  assert.equal(readAccess(storage, 'shared-collection', now + accessLifetime), null);
  assert.equal(hasAccess(storage, now + accessLifetime), false);
  assert.equal(items.size, 0);
  const deniedStorage = { getItem() { throw new Error('Storage disabled'); }, setItem() { throw new Error('Storage disabled'); } };
  assert.doesNotThrow(() => rememberAccess(deniedStorage, 'collection', rawKey));
  assert.equal(readAccess(deniedStorage, 'collection'), null);
});

test('authoring commands preserve local edits, restore encrypted source, and exclude drafts', async () => {
  const dir = await fs.mkdtemp(path.join(os.tmpdir(), 'portfolio-authoring-'));
  const script = path.resolve('scripts/studies.mjs');
  const run = (...args) => spawnSync(process.execPath, [script, ...args], { cwd: dir, input: 'test-only-password\n', encoding: 'utf8' });
  try {
    await fs.mkdir(path.join(dir, 'templates'));
    await fs.copyFile('templates/case-study.md', path.join(dir, 'templates/case-study.md'));
    assert.equal(run('new', 'example').status, 0);
    const study = path.join(dir, '.private/studies/example');
    const source = path.join(study, 'index.md');
    assert.match(await fs.readFile(source, 'utf8'), /draft: true/);
    assert.equal(run('seal').status, 0);
    assert.deepEqual(await fs.readdir(path.join(dir, 'public/protected')), []);
    const published = (await fs.readFile(source, 'utf8')).replace('draft: true', 'draft: false');
    await fs.writeFile(source, published);
    assert.equal(run('seal').status, 0);
    await fs.writeFile(source, published + '\nLocal edits to keep.\n');
    assert.equal(run('unlock').status, 0);
    assert.match(await fs.readFile(source, 'utf8'), /Local edits to keep/);
    await fs.rm(study, { recursive: true });
    assert.equal(run('unlock').status, 0);
    assert.equal(await fs.readFile(source, 'utf8'), published);
    await fs.writeFile(source, published.replace('draft: false', 'draft: true'));
    assert.equal(run('seal').status, 0);
    assert.deepEqual(await fs.readdir(path.join(dir, 'public/protected')), []);
  } finally { await fs.rm(dir, { recursive: true, force: true }); }
});
