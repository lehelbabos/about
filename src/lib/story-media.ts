import { getImage } from 'astro:assets';
import type { ImageMetadata } from 'astro';
import sharp from 'sharp';
import path from 'node:path';

const images = import.meta.glob<{ default: ImageMetadata }>('../../public/images/case-studies/**/*.webp', { eager: true });
const cache = new Map<string, Promise<string>>();

// Keep full-size originals for the image viewer and animations; send smaller static images to phones.
export async function responsiveStory(html: string) {
  const original = html;
  const matches = [...original.matchAll(/<img\b[^>]*>/g)];
  for (const match of matches) {
    const tag = match[0];
    const src = /\bsrc="([^"]+)"/.exec(tag)?.[1];
    const relative = src?.slice(src.indexOf('/images/case-studies/') + 1);
    const image = images[`../../public/${relative}`]?.default;
    if (!src || !image || image.width <= 800) continue;
    const figureStart = original.lastIndexOf('<figure', match.index);
    const wide = original.slice(figureStart, match.index).includes('story-figure wide');
    const sizes = `(max-width: 767px) calc(100vw - 48px), ${wide ? '(max-width: 1272px) 88vw, 1120px' : '720px'}`;
    const key = src + sizes;
    if (!cache.has(key)) cache.set(key, (async () => {
      if ((await sharp(path.resolve('public', relative!)).metadata()).pages! > 1) return '';
      const widths = [400, 800, 1200].filter(width => width < image.width);
      const result = await getImage({ src: image, width: widths.at(-1), widths, format: 'webp', quality: 85 });
      return `src="${result.src}" srcset="${result.srcSet.attribute}, ${src} ${image.width}w" sizes="${sizes}"`;
    })());
    const attributes = await cache.get(key);
    if (attributes) html = html.replace(tag, tag.replace(`src="${src}"`, attributes));
  }
  return html;
}
