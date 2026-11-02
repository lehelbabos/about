import { defineConfig } from 'astro/config';

export default defineConfig({
  site: process.env.SITE_URL || 'https://lehelbabos.github.io',
  base: process.env.SITE_BASE || '/about',
  trailingSlash: 'always',
  devToolbar: { enabled: false },
  vite: {
    plugins: [{
      name: 'case-study-live-preview',
      configureServer(server) {
        server.watcher.add('.private/studies');
        server.watcher.on('change', (file) => {
          if (file.includes('/.private/studies/')) server.ws.send({ type: 'full-reload' });
        });
      },
    }],
  },
});
