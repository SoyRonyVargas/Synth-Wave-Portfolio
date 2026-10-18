# CLAUDE.md · Portafolio retrowave de Rony Vargas

Contexto del proyecto para Claude. Resume todo lo decidido en el chat de diseño, así que léelo antes de cambiar algo.

## Quién y qué

- **Rony Vargas**, Fullstack Developer en Cancún, Quintana Roo. Su stack: Node.js, React, Next.js, Vue, Nest.js, SQL Server, MySQL, Tailwind.
- Portafolio de una sola página, estética **synthwave / retrowave / vaporwave de los 80**.
- El diseño se hizo primero en un canvas de diseño de Claude ("Portfolio Retrowave"). La versión aprobada es la **v5 ("Quinta")** y este proyecto es su traducción a Astro. **La v5 manda**: si hay duda de cómo debe verse algo, se respeta la v5.
- Idioma del sitio: español (es-MX).

## Stack

- **Astro** (salida estática), **React** solo para islas interactivas (`client:visible`) y **React Three Fiber + drei** para el 3D en vivo.
- Las fuentes se sirven con **Fontsource** (no Google Fonts). Despliegue en **Netlify** (`netlify.toml`).
- Contenido en `src/data/*.json`: `site.json`, `jobs.json`, `skills.json` y `projects.json`.
- CSS global en `src/styles/global.css`, con todas las clases y keyframes de la v5.

## Orden de secciones

1. Nav
2. **Hero** (`#inicio`): logo "Rony VARGAS · Fullstack Developer" con inclinación al mover el mouse, sol rayado, montañas de alambre, carretera de cuadrícula y DeLorean visto de atrás (sprite de 12 frames).
3. **Sobre mí** (`#sobre-mi`): foto en marco CRT (`[TU FOTO]` pendiente), stats y boombox debajo de la foto.
4. **Transición**: el DeLorean cruza de lado por la carretera, con fuego en las ruedas.
5. **Experiencia** (`#experiencia`, `CassetteDeck.jsx`): deck de casetes. Eliges un casete en el estante y el display muestra el puesto y su lista de logros. Al fondo, una ciudad SVG oscura con sol y palmeras.
6. **Skills** (`#skills`, `RvOs.jsx`): PC retro frente a un ventanal con persianas y la ciudad. La pantalla es el escritorio "RV-OS", donde cada carpeta es un área. Hay lámpara de lava, lámpara de escritorio neón y taza de café.
7. **Zócalo**: unión sutil de 64 px con dos tiras de neón (rosa y cian).
8. **Proyectos** (`#proyectos`, `VaporExe.jsx`): escritorio vaporwave "Vapor.exe":
   - carpetas 3D por proyecto (la seleccionada aparece abierta);
   - disquete que descarga el CV y un sobre que lleva a contacto;
   - busto frente al sol y un delfín que salta;
   - ventana `fondo_rv.png` con una imagen anime;
   - ventana de aviso "¿Hacemos juntos el proyecto 05?".
9. **Formación** (`#formacion`): tabla "★ HIGH SCORES ★" (1ST/2ND/3RD) con planetas rocosos renderizados en 3D, lunas, joystick y cartucho RV-85.
10. **Contacto** (`#contacto`): "INSERT COIN", máquina arcade con menú (email, LinkedIn, GitHub, CV) y moneda.
11. Footer con los créditos de los modelos 3D.

## Sistema de diseño (no romperlo)

- **Paleta:** rosa `#ff2fb3`, cian `#3ff0ff`, amarillo `#fff27a`, morado `#b26bff`, menta `#7dffcf`, naranja `#ff9a5a`. Fondos: `#0b0420`, `#12021f`, `#160733`, `#1a0838` y `#22104a`.
- **Tipografía:**

  | Uso | Fuente |
  |---|---|
  | Títulos cromados | Orbitron 900 (`.rw-chrome-wrap` / `.rw-chrome-depth` / `.rw-chrome`) |
  | Script neón | Mr Dafoe (`.rw-script`) |
  | Kicker pixel (ej. "04 · C:\RONY\PROYECTOS") | Press Start 2P |
  | Cuerpo | IBM Plex Mono |
  | Letreros | Londrina Solid / Outline |

- **Motivos:**
  - sol rayado (`.rw-hsun`);
  - piso de cuadrícula en perspectiva (`.rw-about-floor`; cuando el contenedor es alto, con `perspective-origin: 50% 0`);
  - estrellas (`.rw-stars-static`);
  - palmeras en silueta;
  - bordes y sombras de neón;
  - líneas de escaneo CRT.
- **Numeración de secciones en el kicker:** 01 Sobre mí · 02 Experiencia · 03 RV-OS · 04 Proyectos · 05 Contacto.
- Respetar `prefers-reduced-motion` y las clases `.rw-hide-sm` (se ocultan en celular).

## Reglas del dueño (importantes)

- **Toda propuesta nueva debe seguir el vocabulario visual de la página.** El dueño rechaza diseños que "no siguen la regla de diseño de cómo está hecho lo demás".
- Siempre synthwave/retrowave. Las transiciones entre secciones deben ser **sutiles y chicas (60–110 px)**.
- Cuando pida propuestas: hacer variantes, cada una con su motivo y su contra (pros y contras).
- **Modelos 3D solo con licencia CC BY o CC0. Nada de NonCommercial (NC).** Se descargan de Sketchfab en GLB y cada uno lleva su crédito en el footer.
- **Sin logos de marcas reales.** Ya se taparon "Keystone" y "Wurlitzer" y se cambiaron etiquetas por "RV".
- No copiar arte con derechos (ilustraciones o fan art de terceros).
- Responde en español, de forma breve y clara.

## 3D

- Los objetos de la página son **renders estáticos (.webp y sprites)** hechos con Three.js, con luz rosa y cian y un ambiente synthwave. Así la página carga rápido.
- **DeLorean en vivo:** `src/components/islands/DeLorean3D.jsx` carga `public/models/delorean.glb`, comprimido con gltf-transform (weld, simplify y meshopt: 13.7 MB → 1.6 MB).
  - Usa el sprite como respaldo mientras carga, en equipos débiles o con "reducir movimiento".
  - Se prueba en `/lab/delorean/?3d`.
  - Se activa en la portada con `"delorean3d": true` en `site.json`.
- Para modelos nuevos:
  - comprimir con `npx @gltf-transform/cli` (weld, simplify, meshopt);
  - una sola escena por sección;
  - carga con `client:visible`;
  - imagen .webp como placeholder.
- Los planetas de Formación son procedurales (no son modelos descargados), así que no llevan crédito.

## SEO

- `Base.astro` trae título, descripción, canónica, Open Graph (`public/og.png`), Twitter card y JSON-LD `Person`.
- El sitemap lo genera `@astrojs/sitemap`, junto con `robots.txt`.
- Dominio de ejemplo: `https://soyronyvargas.netlify.app`. Cambiarlo en `astro.config.mjs`, `site.json` y `robots.txt`.
- Mantener el texto real en HTML (nada de texto importante dentro de imágenes).

## Datos reales

- **Experiencia:** Upnify (2024–2026), UPQROO (2023), Hiplot (2021–2022), Freelance (2020). El detalle está en `jobs.json`.
- **Proyectos:**
  - Addons para CRM · Upnify
  - Oferta Educativa Quintana Roo · UPQROO
  - Editor de sitios drag & drop · Hiplot
  - Portafolio personal (https://soyronyvargas.netlify.app)
- **Formación:**
  - Ingeniería en Software, Universidad Politécnica de Quintana Roo (2022–2025)
  - Certified JavaScript Developer (Pro), W3Schools, Ago 2025 (https://verify.w3schools.com/684F1SEOR)
  - Idiomas: español nativo, inglés técnico
- **Contacto:**
  - soyronyvargas@gmail.com
  - https://linkedin.com/in/rony-vargas-212bb2182
  - https://github.com/SoyRonyVargas

## Pendientes

- [ ] **Busto** (`public/assets/bust.webp`): licencia CC BY-NC-SA. Reemplazarlo por uno CC BY o CC0 y actualizar el footer.
- [ ] **Imagen anime** (`public/assets/fondo-rv.webp`): confirmar autor y permiso, o reemplazarla.
- [ ] Foto real en lugar de `[TU FOTO]` (`About.astro`).
- [ ] Quitar la etiqueta "3D PENDIENTE · TELÉFONO DE DISCO" (`Contact.astro`) o poner el modelo.
- [ ] Opcional: pasar Sobre mí, Formación y Contacto a JSON como las demás secciones.
- [ ] Opcional: modelos que faltan (videocasetera, teléfono de disco), siempre CC BY o CC0.
