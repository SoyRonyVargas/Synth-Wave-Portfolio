import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

// Cambia "site" por tu dominio final: se usa para la URL canónica, el sitemap y la imagen para redes.
export default defineConfig({
  site: 'https://soyronyvargas.netlify.app',
  // /home1-3 son pruebas de la animación del hero: fuera del sitemap
  integrations: [react(), sitemap({ filter: (page) => !/\/home\d\/?$/.test(page) })],
});
