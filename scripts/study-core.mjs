import { randomBytes, pbkdf2Sync, createCipheriv, createDecipheriv } from 'node:crypto';
import fs from 'node:fs/promises';
import path from 'node:path';
import { marked } from 'marked';
import matter from 'gray-matter';
import { renderStory, resolveStoryBase, storyBaseToken } from '../src/lib/story-layout.mjs';

export const iterations = 600_000;
export const projectRoot = process.cwd();
const mimeTypes = { '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.gif': 'image/gif', '.svg': 'image/svg+xml', '.avif': 'image/avif' };
export const escapeHTML = value => String(value ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
export const assetToken = file => `__PRIVATE_ASSET_${Buffer.from(file).toString('base64url')}__`;

export function encrypt(payload, password, salt = randomBytes(16)) {
  if (!password) throw new Error('A password is required.');
  const iv = randomBytes(12);
  const key = pbkdf2Sync(password, salt, iterations, 32, 'sha256');
  const cipher = createCipheriv('aes-256-gcm', key, iv);
  const bytes = Buffer.concat([cipher.update(JSON.stringify(payload)), cipher.final(), cipher.getAuthTag()]);
  return { version: 1, algorithm: 'AES-GCM', kdf: 'PBKDF2', hash: 'SHA-256', iterations, salt: salt.toString('base64'), iv: iv.toString('base64'), ciphertext: bytes.toString('base64') };
}

export function decrypt(envelope, password) {
  if (envelope.version !== 1 || envelope.iterations !== iterations) throw new Error('Unsupported encrypted study format.');
  const key = pbkdf2Sync(password, Buffer.from(envelope.salt, 'base64'), envelope.iterations, 32, 'sha256');
  const bytes = Buffer.from(envelope.ciphertext, 'base64');
  const cipher = createDecipheriv('aes-256-gcm', key, Buffer.from(envelope.iv, 'base64'));
  cipher.setAuthTag(bytes.subarray(-16));
  return JSON.parse(Buffer.concat([cipher.update(bytes.subarray(0, -16)), cipher.final()]).toString('utf8'));
}

async function collectFiles(dir, current = '', files = {}) {
  for (const entry of await fs.readdir(path.join(dir, current), { withFileTypes: true })) {
    const name = path.posix.join(current, entry.name);
    if (entry.isDirectory()) await collectFiles(dir, name, files);
    else if (entry.isFile()) {
      const bytes = await fs.readFile(path.join(dir, name));
      const mime = mimeTypes[path.extname(name).toLowerCase()];
      files[name] = { encoding: mime ? 'base64' : 'utf8', mime: mime || 'text/plain', data: bytes.toString(mime ? 'base64' : 'utf8') };
    }
  }
  return files;
}

export function safeFilePath(root, file) {
  const result = path.resolve(root, file);
  if (!file || path.isAbsolute(file) || !result.startsWith(path.resolve(root) + path.sep)) throw new Error('Invalid study file path.');
  return result;
}

export async function renderStudy(dir) {
  const files = await collectFiles(dir);
  let html, metadata;
  if (files['layout.json'] && !files['index.md']) {
    metadata = JSON.parse(files['layout.json'].data);
    const sections = [];
    for (const section of metadata.sections) {
      const blocks = [];
      for (const block of section.blocks) {
        let body = '';
        if (block.type === 'text') {
          const content = files[block.file];
          if (!content) throw new Error(`Missing content file: ${block.file}`);
          body = `<div class="sqs-html-content ${escapeHTML(block.textClass || '')}" ${block.align ? `style="text-align:${escapeHTML(block.align)}"` : ''}>${await marked.parse(content.data)}</div>`;
        } else if (block.type === 'image') {
          if (!files[block.src]) throw new Error(`Missing image: ${block.src}`);
          body = `<figure class="study-figure"><button class="image-zoom" type="button" aria-label="View fullsize ${escapeHTML(block.alt)}"><img src="${assetToken(block.src)}" alt="${escapeHTML(block.alt)}" style="object-fit:${block.fit || 'contain'}" loading="lazy" /></button>${block.caption ? `<figcaption>${escapeHTML(block.caption)}</figcaption>` : ''}</figure>`;
        } else if (block.type === 'embed') {
          if (!block.src) throw new Error(`Missing embed URL: ${block.id}`);
          const url = new URL(block.src);
          if (url.protocol !== 'https:') throw new Error('Embed URLs must use HTTPS.');
          body = `<iframe class="study-embed" src="${escapeHTML(url.href)}" title="${escapeHTML(block.title)}" loading="lazy" allowfullscreen></iframe>`;
        } else body = block.html;
        blocks.push(`<div class="${escapeHTML(block.class)}"><div class="sqs-block" id="${escapeHTML(block.id)}"><div class="sqs-block-content">${body}</div></div></div>`);
      }
      sections.push(`<section class="${escapeHTML(section.class)}" style="${escapeHTML(section.style)}">${section.background ? `<img class="study-background" src="${assetToken(section.background)}" alt="" />` : ''}<div class="content-wrapper" style="${escapeHTML(section.padding)}"><div class="${escapeHTML(section.grid)}">${blocks.join('')}</div></div></section>`);
    }
    html = `<style>${files['layout.css'].data}</style><article class="migrated-study">${sections.join('')}</article>`;
  } else {
    if (!files['index.md']) throw new Error(`No index.md or layout.json in ${dir}`);
    const parsed = matter(files['index.md'].data);
    metadata = parsed.data;
    if (typeof metadata.title !== 'string' || typeof metadata.slug !== 'string') throw new Error('A study needs a title and slug.');
    html = renderStory({ title: metadata.title, company: metadata.company, tags: metadata.tags, summary: metadata.summary, body: await marked.parse(parsed.content), base: storyBaseToken });
  }
  // Every private asset, including backgrounds, stays inside the encrypted bundle.
  for (const [name, file] of Object.entries(files)) {
    if (file.encoding === 'base64') html = html.replaceAll(name, assetToken(name));
  }
  return { metadata, html, files };
}

export function previewHTML(payload, base = '/') {
  let html = resolveStoryBase(payload.html, base);
  for (const [name, file] of Object.entries(payload.files)) {
    if (file.encoding === 'base64') html = html.replaceAll(assetToken(name), `data:${file.mime};base64,${file.data}`);
  }
  return html;
}
