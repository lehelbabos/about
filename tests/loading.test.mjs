import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import { randomBytes, pbkdf2Sync, webcrypto } from 'node:crypto';
import sharp from 'sharp';
import { prepareStudy } from '../scripts/study-publishing.mjs';
import { decrypt, assetToken, iterations } from '../scripts/study-core.mjs';

const read = file => fs.readFile(path.join('dist', file), 'utf8');

test('all page types share cached icons/fonts and explicit image loading priorities', async () => {
  const routes = ['', 'about/', 'indeed-connect/', 'tablecheck-reservations/', ...['tablekit', 'suikakeibo', 'cognos-data-science', 'watson-social-data', 'cognos-data-connections', 'query', 'brewbox'].map(slug => `case-studies/${slug}/`)];
  const sprites = new Set();
  for (const route of routes) {
    const html = await read(route + 'index.html');
    assert.ok(!html.includes('<symbol'), `Inline icon definitions repeated on ${route}`);
    const sprite = /<use href="([^"#]+\.svg)#/.exec(html)?.[1];
    assert.ok(sprite); sprites.add(sprite); await fs.access(path.join('dist', sprite));
    assert.equal([...html.matchAll(/rel="preload" as="font"/g)].length, 2);
    for (const [, image] of html.matchAll(/(<img\b[^>]*\bsrc="[^"]+"[^>]*>)/g)) {
      assert.match(image, /\bwidth="\d+"/); assert.match(image, /\bheight="\d+"/);
    }
    if (route.startsWith('case-studies/')) {
      const body = html.slice(html.indexOf('class="story-body"'));
      const images = [...body.matchAll(/<img\b[^>]*\bsrc="[^"]+"[^>]*>/g)].map(match => match[0]);
      assert.match(images[0], /loading="eager"/); assert.match(images[0], /fetchpriority="high"/);
      for (const image of images.slice(1)) assert.match(image, /loading="lazy"/);
      for (const [, srcset] of body.matchAll(/srcset="([^"]+)"/g)) for (const candidate of srcset.split(',')) await fs.access(path.join('dist', candidate.trim().split(' ')[0]));
    }
  }
  assert.equal(sprites.size, 1);
  const home = await read('index.html');
  const cards = [...home.matchAll(/<img\b[^>]*class="card-image"[^>]*>/g)].map(match => match[0]);
  assert.equal(cards.length, 9);
  assert.match(cards[0], /fetchpriority="high"/);
  for (const image of cards.slice(1)) assert.match(image, /loading="lazy"/);
  for (const image of cards) { assert.match(image, /srcset="/); assert.match(image, /\.webp/); }
  assert.ok(!home.includes('images/profile.jpeg'), 'Original portrait must not compete with the initial page');
  assert.ok(home.includes('ship products and scale design.'));
});

test('protected reading pages stay small and separate from encrypted editable archives', async () => {
  for (const slug of ['indeed-connect', 'tablecheck-reservations']) {
    const text = await read(`protected/${slug}.json`);
    assert.ok(Buffer.byteLength(text) < 100_000);
    const envelope = JSON.parse(text);
    const source = JSON.parse(await read(`protected/${envelope.source}`));
    assert.equal(source.algorithm, 'AES-GCM');
    assert.equal(source.salt, envelope.salt);
    assert.notEqual(source.iv, envelope.iv);
    assert.ok(!text.includes('PRIVATE_ASSET'));
    const files = await fs.readdir(`dist/protected/media/${slug}`);
    assert.equal(files.length, slug === 'indeed-connect' ? 20 : 4);
    assert.ok(files.every(file => /^[a-f0-9]{32}\.bin$/.test(file)));
  }
});

test('individually encrypted images decrypt in Web Crypto, reject tampering, and preserve source pixels', async () => {
  const original = await sharp({ create: { width: 30, height: 20, channels: 4, background: '#3268a4' } }).png().toBuffer();
  const token = assetToken('assets/example.png');
  const payload = { metadata: { slug: 'example', title: 'Private example' }, html: `<img src="${token}" />`, files: { 'assets/example.png': { encoding: 'base64', mime: 'image/png', data: original.toString('base64') }, 'index.md': { encoding: 'utf8', data: 'Private editable text' } } };
  const salt = randomBytes(16);
  const result = await prepareStudy(payload, 'test-only-password', salt);
  const runtime = decrypt(result.envelope, 'test-only-password');
  assert.ok(!runtime.files);
  assert.equal(Object.keys(runtime.assets).length, 1);
  assert.deepEqual(decrypt(result.source, 'test-only-password'), payload);
  const asset = runtime.assets[token];
  const key = await webcrypto.subtle.importKey('raw', pbkdf2Sync('test-only-password', salt, iterations, 32, 'sha256'), 'AES-GCM', false, ['decrypt']);
  const decryptImage = bytes => webcrypto.subtle.decrypt({ name: 'AES-GCM', iv: Buffer.from(asset.iv, 'base64') }, key, bytes);
  const opened = Buffer.from(await decryptImage(result.media[0].bytes));
  assert.deepEqual(await sharp(opened).ensureAlpha().raw().toBuffer(), await sharp(original).ensureAlpha().raw().toBuffer());
  const altered = Buffer.from(result.media[0].bytes); altered[0] ^= 1;
  await assert.rejects(decryptImage(altered));
});
