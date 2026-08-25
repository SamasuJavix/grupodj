// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import node from '@astrojs/node';




import tailwindcss from '@tailwindcss/vite';
import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
  security: {
    checkOrigin: false
  },
  integrations: [react(), icon()],

  vite: {
    plugins: [tailwindcss()]
  },

  output: 'server', // Habilita renderizado dinámico en servidor para Hostinger
  adapter: node({
    mode: 'standalone'
  }),
});