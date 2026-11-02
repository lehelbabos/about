import type { ImageMetadata } from 'astro';
const images = import.meta.glob<{ default: ImageMetadata }>('../../public/images/*.{png,jpg,jpeg}', { eager: true });

export function portfolioImageOptions(name: string) {
  const image = images[`../../public/images/${name}`]?.default;
  if (!image) throw new Error(`Unknown portfolio image: ${name}`);
  const widths = [400, 800, 1200, 1600].filter(width => width < image.width);
  widths.push(Math.min(image.width, 1600));
  return { src: image, format: 'webp' as const, quality: name === 'brewbox.jpg' ? 75 : 85, width: Math.min(image.width, 1600), widths };
}
