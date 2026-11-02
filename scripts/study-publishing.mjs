import { randomBytes, pbkdf2Sync, createCipheriv, createHash } from 'node:crypto';
import sharp from 'sharp';
import { encrypt, assetToken, iterations } from './study-core.mjs';

// Keep editable originals in an encrypted archive; deliver only the reading page at unlock.
export async function prepareStudy(payload, password, salt) {
  const key = pbkdf2Sync(password, salt, iterations, 32, 'sha256');
  const media = [];
  const assets = {};
  for (const [name, file] of Object.entries(payload.files)) {
    const token = assetToken(name);
    if (file.encoding !== 'base64' || !payload.html.includes(token)) continue;
    let bytes = Buffer.from(file.data, 'base64');
    let mime = file.mime;
    if (mime !== 'image/svg+xml') {
      // Lossless WebP keeps diagram text and UI pixels intact. Originals are also recoverable.
      const optimized = await sharp(bytes, { animated: true }).webp({ lossless: true, effort: 4 }).toBuffer();
      if (optimized.length < bytes.length) { bytes = optimized; mime = 'image/webp'; }
    }
    const iv = randomBytes(12);
    const cipher = createCipheriv('aes-256-gcm', key, iv);
    const ciphertext = Buffer.concat([cipher.update(bytes), cipher.final(), cipher.getAuthTag()]);
    const hash = createHash('sha256').update(ciphertext).digest('hex').slice(0, 32);
    const href = `media/${payload.metadata.slug}/${hash}.bin`;
    assets[token] = { href, iv: iv.toString('base64'), mime };
    media.push({ href, bytes: ciphertext });
  }
  const envelope = encrypt({ metadata: payload.metadata, html: payload.html, assets }, password, salt);
  envelope.source = `source/${payload.metadata.slug}.json`;
  return { envelope, source: encrypt(payload, password, salt), media };
}
