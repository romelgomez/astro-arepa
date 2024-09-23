// @ts-check
import { defineConfig } from 'astro/config';
import netlify from '@astrojs/netlify';
import react from '@astrojs/react';
import clerk from '@clerk/astro'
import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
  integrations: [react(), icon(), clerk()],
  output: 'server',
  adapter: netlify(),
});
