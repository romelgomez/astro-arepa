// import netlify from '@astrojs/netlify';
// import vercel from '@astrojs/vercel/serverless';
import node from '@astrojs/node';

import react from '@astrojs/react';
import clerk from '@clerk/astro';
import icon from 'astro-icon';
// @ts-check
import { defineConfig } from 'astro/config';

import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  integrations: [
    react(),
    icon(),
    clerk(),
    tailwind({
      applyBaseStyles: false,
    }),
  ],
  output: 'server',
  adapter: node({
    mode: 'standalone',
  }),
  server: {
    host: '0.0.0.0',
  },
});
