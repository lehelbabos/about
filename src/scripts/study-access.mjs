// A derived decryption key grants access across pages and tabs; the password is never stored.
export const accessPrefix = 'portfolio-access-v1:';
export const accessLifetime = 8 * 60 * 60 * 1000;

export function forgetAccess(storage, salt) {
  try { storage?.removeItem(accessPrefix + salt); } catch {}
}

export function readAccess(storage, salt, now = Date.now()) {
  try {
    const entry = JSON.parse(storage?.getItem(accessPrefix + salt) || 'null');
    if (entry && /^[A-Za-z0-9+/]{43}=$/.test(entry.key) && Number.isFinite(entry.expiresAt) && entry.expiresAt > now) return entry.key;
  } catch {}
  forgetAccess(storage, salt);
  return null;
}

export function rememberAccess(storage, salt, key, now = Date.now()) {
  try { storage?.setItem(accessPrefix + salt, JSON.stringify({ key, expiresAt: now + accessLifetime })); } catch {}
}

export function hasAccess(storage, now = Date.now()) {
  try {
    const names = Array.from({ length: storage.length }, (_, i) => storage.key(i));
    return names.filter(name => name?.startsWith(accessPrefix)).some(name => readAccess(storage, name.slice(accessPrefix.length), now));
  } catch { return false; }
}
