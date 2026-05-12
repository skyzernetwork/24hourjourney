import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import netlify from '@astrojs/netlify';

export default defineConfig({
  site: 'https://24hourjourney.blog',
  output: 'static',
  integrations: [react(), sitemap()],
  adapter: netlify(),

  vite: {
    resolve: {
      alias: {
        '@': '/src'
      }
    }
  },
});