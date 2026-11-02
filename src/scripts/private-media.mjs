import { registerImageLoader } from './study-image-loaders.mjs';
const decode = text => Uint8Array.from(atob(text), char => char.charCodeAt(0));
const placeholder = image => {
  const width = Number(image.getAttribute('width')) || 300;
  const height = Number(image.getAttribute('height')) || 150;
  return 'data:image/svg+xml,' + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}"/>`);
};

// The page can render immediately. Each encrypted image is fetched only near the viewport.
export function mountPrivateMedia(root, html, assets, key, bundleURL, publicHero) {
  const template = document.createElement('template');
  template.innerHTML = html;
  for (const image of template.content.querySelectorAll('img[src]')) {
    if (publicHero && image.getAttribute('src') === publicHero.original) {
      image.srcset = publicHero.srcset; image.sizes = publicHero.sizes; image.src = publicHero.src;
    }
    const token = image.getAttribute('src');
    if (!assets[token]) continue;
    image.dataset.privateAsset = token;
    image.src = placeholder(image);
    image.decoding = 'async';
  }
  for (const link of template.content.querySelectorAll('a[href]')) {
    if (assets[link.getAttribute('href')]) link.href = '#';
  }
  root.replaceChildren(template.content);
  const pending = new Map();
  const urls = [];
  let disposed = false;
  async function loadAsset(token, priority) {
    if (!pending.has(token)) pending.set(token, (async () => {
      const entry = assets[token];
      const url = new URL(entry.href, new URL(bundleURL, location.href));
      if (url.origin !== location.origin) throw new Error('Invalid image location.');
      const response = await fetch(url, { priority });
      if (!response.ok) throw new Error('Image unavailable.');
      const bytes = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: decode(entry.iv) }, key, await response.arrayBuffer());
      if (disposed) throw new Error('Page closed.');
      const blob = URL.createObjectURL(new Blob([bytes], { type: entry.mime }));
      urls.push(blob);
      return blob;
    })().catch(error => { pending.delete(token); throw error; }));
    return pending.get(token);
  }
  const loadImage = async image => {
    const link = image.closest('a');
    try {
      const url = await loadAsset(image.dataset.privateAsset, image.fetchPriority || 'auto');
      image.src = url;
      if (link) link.href = url;
      image.parentElement.querySelector('.image-load-status')?.remove();
      image.removeAttribute('data-load-error');
      observer?.unobserve(image);
    } catch (error) {
      if (disposed) return;
      image.dataset.loadError = '';
      if (!image.parentElement.querySelector('.image-load-status')) {
        const status = document.createElement('span');
        status.className = 'image-load-status'; status.setAttribute('role', 'status');
        status.textContent = 'Image unavailable. Select it to retry.';
        image.after(status);
      }
      throw error;
    }
  };
  const observer = 'IntersectionObserver' in window ? new IntersectionObserver(entries => {
    for (const entry of entries) if (entry.isIntersecting) loadImage(entry.target).catch(() => {});
  }, { rootMargin: '600px 0px' }) : null;
  for (const image of root.querySelectorAll('img[data-private-asset]')) {
    registerImageLoader(image, () => loadImage(image));
    if (observer) observer.observe(image);
    else loadImage(image).catch(() => {});
  }
  return () => { disposed = true; observer?.disconnect(); urls.forEach(url => URL.revokeObjectURL(url)); };
}
