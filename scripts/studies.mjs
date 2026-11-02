import fs from 'node:fs/promises';
import path from 'node:path';
import { randomBytes } from 'node:crypto';
import { createInterface } from 'node:readline/promises';
import { decrypt, renderStudy, safeFilePath, projectRoot } from './study-core.mjs';

import { prepareStudy } from './study-publishing.mjs';

const action = process.argv[2];
const privateRoot = path.join(projectRoot, '.private/studies');
const encryptedRoot = path.join(projectRoot, 'public/protected');

async function readPassword() {
  process.stdout.write('Case-study password (input is hidden): ');
  if (!process.stdin.isTTY) {
    const rl = createInterface({ input: process.stdin, crlfDelay: Infinity });
    for await (const line of rl) { rl.close(); return line; }
    throw new Error('No password supplied.');
  }
  process.stdin.setRawMode(true);
  process.stdin.resume();
  const password = await new Promise((resolve, reject) => {
    let value = '';
    const onData = chunk => {
      for (const char of chunk.toString()) {
        if (char === '\u0003') { cleanup(); reject(new Error('Cancelled.')); return; }
        if (char === '\r' || char === '\n') { cleanup(); resolve(value); return; }
        if (char === '\u007f' || char === '\b') value = value.slice(0, -1);
        else if (char >= ' ') value += char;
      }
    };
    const cleanup = () => { process.stdin.off('data', onData); process.stdin.setRawMode(false); process.stdin.pause(); };
    process.stdin.on('data', onData);
  });
  process.stdout.write('\n');
  if (!password) throw new Error('A password is required.');
  return password;
}

try {
  if (action === 'new') {
    const slug = process.argv[3];
    if (!slug || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) throw new Error('Use: npm run study:new -- project-name');
    const dir = path.join(privateRoot, slug);
    await fs.mkdir(privateRoot, { recursive: true });
    await fs.mkdir(dir, { recursive: false });
    await fs.mkdir(path.join(dir, 'assets'));
    const template = await fs.readFile(path.join(projectRoot, 'templates/case-study.md'), 'utf8');
    await fs.writeFile(path.join(dir, 'index.md'), template.replace('your-project', slug));
    console.log(`Draft created: .private/studies/${slug}/index.md`);
  } else if (action === 'unlock') {
    const password = await readPassword();
    for (const file of await fs.readdir(encryptedRoot)) {
      if (!file.endsWith('.json')) continue;
      const slug = path.basename(file, '.json');
      const dir = path.join(privateRoot, slug);
      try { await fs.access(dir); console.log(`Kept existing local edits: ${slug}`); continue; } catch {}
      const envelope = JSON.parse(await fs.readFile(path.join(encryptedRoot, file), 'utf8'));
      const archive = envelope.source ? JSON.parse(await fs.readFile(safeFilePath(encryptedRoot, envelope.source), 'utf8')) : envelope;
      const payload = decrypt(archive, password);
      // Validate all entries before creating any files.
      for (const name of Object.keys(payload.files)) safeFilePath(dir, name);
      for (const [name, entry] of Object.entries(payload.files)) {
        const target = safeFilePath(dir, name);
        await fs.mkdir(path.dirname(target), { recursive: true });
        await fs.writeFile(target, entry.data, entry.encoding === 'base64' ? 'base64' : 'utf8');
      }
      console.log(`Ready to edit: .private/studies/${slug}`);
    }
  } else if (action === 'seal') {
    const password = await readPassword();
    const salt = randomBytes(16);
    await fs.mkdir(encryptedRoot, { recursive: true });
    const entries = await fs.readdir(privateRoot, { withFileTypes: true });
    // Render everything first: a failed study cannot leave a partially updated collection.
    const ready = [];
    const drafts = [];
    for (const entry of entries) {
      if (!entry.isDirectory()) continue;
      const payload = await renderStudy(path.join(privateRoot, entry.name));
      if (payload.metadata.draft !== false) { console.log(`Draft excluded: ${entry.name}`); drafts.push(entry.name); continue; }
      if (payload.metadata.slug !== entry.name) throw new Error(`Slug must match folder: ${entry.name}`);
      ready.push([entry.name, await prepareStudy(payload, password, salt)]);
    }
    for (const [slug, publication] of ready) {
      for (const asset of publication.media) {
        const target = safeFilePath(encryptedRoot, asset.href);
        await fs.mkdir(path.dirname(target), { recursive: true });
        await fs.writeFile(target, asset.bytes);
      }
      const source = safeFilePath(encryptedRoot, publication.envelope.source);
      await fs.mkdir(path.dirname(source), { recursive: true });
      await fs.writeFile(source, JSON.stringify(publication.source));
      await fs.writeFile(path.join(encryptedRoot, slug + '.json'), JSON.stringify(publication.envelope));
      const used = new Set(publication.media.map(asset => path.basename(asset.href)));
      const mediaDir = path.join(encryptedRoot, 'media', slug);
      for (const old of await fs.readdir(mediaDir).catch(() => [])) if (!used.has(old)) await fs.rm(path.join(mediaDir, old));
      console.log(`Encrypted text, images, and editable source: ${slug}`);
    }
    for (const slug of drafts) {
      await fs.rm(path.join(encryptedRoot, slug + '.json'), { force: true });
      await fs.rm(path.join(encryptedRoot, 'source', slug + '.json'), { force: true });
      await fs.rm(path.join(encryptedRoot, 'media', slug), { recursive: true, force: true });
    }
  } else throw new Error('Choose unlock, seal, or new.');
} catch (error) { console.error(error.message); process.exitCode = 1; }
