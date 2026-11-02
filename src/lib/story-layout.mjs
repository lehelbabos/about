export const storyBaseToken = '__PORTFOLIO_BASE__';
const escape = value => String(value ?? '').replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));

// Shared by static public pages and the HTML sealed inside protected bundles.
export function renderStory({ title, company = '', tags = [], summary = '', body, base = '/' }) {
  return `<article class="case-study" aria-labelledby="study-title">
    <header class="story-header">
      <a class="back-to-work" href="${escape(base)}#work-heading">← All work</a>
      <p class="story-eyebrow">Case study${company ? ` · ${escape(company)}` : ''}</p>
      <h1 id="study-title">${escape(title)}</h1>
      ${summary ? `<p class="story-summary">${escape(summary)}</p>` : ''}
      ${tags.length ? `<ul class="story-tags" aria-label="Disciplines">${tags.map(tag => `<li>${escape(tag)}</li>`).join('')}</ul>` : ''}
    </header>
    <div class="story-body">${body}</div>
    <footer class="story-end"><a href="${escape(base)}#work-heading">← Back to all work</a></footer>
  </article>`;
}

export function resolveStoryBase(html, base = '/') {
  return html.replaceAll(storyBaseToken, base);
}
