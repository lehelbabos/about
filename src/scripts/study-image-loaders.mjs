const loaders = new WeakMap();
export const registerImageLoader = (image, load) => loaders.set(image, load);
export async function resolveImage(link) {
  const image = link.querySelector('img');
  const load = loaders.get(image);
  if (load) await load();
  return link.href;
}
