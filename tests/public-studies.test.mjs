import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import { publicStudies } from '../src/lib/public-studies.mjs';

test('all seven public studies publish locally with complete media and working navigation', async () => {
  const studies = await publicStudies();
  for (const slug of ['tablekit', 'suikakeibo', 'cognos-data-science', 'watson-social-data', 'cognos-data-connections', 'query', 'brewbox']) {
    assert.ok(studies.some(study => study.slug === slug), `Missing imported study: ${slug}`);
  }
  const home = await fs.readFile('dist/index.html', 'utf8');
  const cards = [...home.matchAll(/<a\b[^>]*class="work_item [^"]+"[^>]*>/g)].map(match => match[0]);
  assert.equal(cards.length, 9);
  for (const card of cards) assert.ok(!/target="_blank"/.test(card), 'Case studies must open in the current tab');
  const images = new Set();
  for (const study of studies) {
    const route = `/case-studies/${study.slug}/`;
    assert.ok(home.includes(`href="${route}"`), `Missing homepage link: ${route}`);
    const html = await fs.readFile(`dist${route}index.html`, 'utf8');
    assert.ok(html.includes(`https://www.lehelbabos.com${route}`));
    assert.ok(!/miro\.medium\.com|cdn\.embedly\.com/.test(html));
    assert.ok(!html.includes('Get Lehel’s stories in'));
    assert.ok(!/Originally (?:posted|published) on Medium|story-byline|\d+ min read/i.test(html), 'Imported study headers and footers omit Medium attribution and bylines');
    assert.ok(html.includes('class="case-study"'));
    assert.ok(!/<p>\s*<(?:span|div)[^>]*id="[^\"]+"[^>]*><\/(?:span|div)>\s*<\/p>/.test(html), 'Source anchors must not add empty paragraphs');
    for (const match of html.matchAll(/(?:src|href)="(\/images\/case-studies\/[^"#]+)"/g)) {
      const bytes = await fs.readFile(path.join('dist', match[1]));
      images.add(match[1]);
      assert.equal(bytes.toString('ascii', 0, 4), 'RIFF', `Invalid image: ${match[1]}`);
      assert.equal(bytes.toString('ascii', 8, 12), 'WEBP');
    }
    for (const match of html.matchAll(/href="(\/case-studies\/[^"#]+)"/g)) {
      await fs.access(path.join('dist', match[1], 'index.html'));
    }
  }
  assert.ok(images.size >= 174, 'Missing imported media');
  const articles = JSON.parse(await fs.readFile('src/data/articles.json', 'utf8'));
  assert.equal(articles.length, 4);
  for (const article of articles) assert.ok(home.includes(article.href.replaceAll('&', '&amp;')));
});

test('public study links and images respect an alternate deployment base', async () => {
  for (const study of await publicStudies('/portfolio/')) {
    assert.ok(!/\b(?:src|href)="\/(?:images|case-studies)\//.test(study.html));
    assert.match(study.html, /src="\/portfolio\/images\/case-studies\//);
  }
});
