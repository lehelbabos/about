import fs from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';
import { marked } from 'marked';

export async function publicStudies(base = '/') {
  const folder = path.resolve('src/content/case-studies');
  const files = (await fs.readdir(folder)).filter(name => name.endsWith('.md'));
  return Promise.all(files.map(async name => {
    const { data, content } = matter(await fs.readFile(path.join(folder, name), 'utf8'));
    if (!data.title || !/^[a-z0-9-]+$/.test(data.slug)) throw new Error(`Invalid study metadata: ${name}`);
    const html = marked.parse(content).replace(/<img\b[^>]*>/, image => image.replace(/loading="lazy"/, 'loading="eager" fetchpriority="high"')).replace(/\b(src|href)="\/(?!\/)/g, `$1="${base}`);
    return { ...data, html };
  })).then(studies => studies.filter(study => !study.draft));
}
