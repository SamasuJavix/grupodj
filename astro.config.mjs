// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import vercel from '@astrojs/vercel'; 




import tailwindcss from '@tailwindcss/vite';
import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
  integrations: [react(), icon()],

  vite: {
    plugins: [tailwindcss()]
  },

  output: 'server', // Habilita renderizado dinámico en servidor y endpoints API con adaptador Vercel
  adapter: vercel(),
});