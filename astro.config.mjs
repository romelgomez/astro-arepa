// import netlify from '@astrojs/netlify';
import react from '@astrojs/react';
import clerk from '@clerk/astro';
import icon from 'astro-icon';
// @ts-check
import { defineConfig } from 'astro/config';

import tailwind from '@astrojs/tailwind';

import vercel from '@astrojs/vercel/serverless';

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
  adapter: vercel(),
});
