// @ts-check
import { defineConfig } from 'astro/config';

import netlify from '@astrojs/netlify';
import react from '@astrojs/react';

import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
  integrations: [react(), icon()],
  output: 'server',
  adapter: netlify(),
});
