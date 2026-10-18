# Rony Vargas · Portafolio retrowave (Astro)

Versión en código de la **v5** del canvas "Portfolio Retrowave". Página estática con Astro, islas de React para las partes interactivas y React Three Fiber para el 3D en vivo.

## Arrancar

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # genera dist/
npm run preview   # sirve dist/ para probar el build
```

Requiere Node 20 o superior.

## Estructura

```
src/
  layouts/Base.astro           <head> con SEO: título, descripción, canónica, Open Graph, JSON-LD (Person), fuentes
  pages/index.astro            arma la página sección por sección
  pages/lab/delorean.astro     página de prueba del DeLorean en 3D
  styles/global.css            todo el CSS de la v5 (keyframes, .rw-chrome, .rw-hsun, etc.)
  data/
    site.json                  nombre, URL, descripción, redes y el interruptor "delorean3d"
    jobs.json                  Experiencia (casetes)
    skills.json                Skills (carpetas del RV-OS)
    projects.json              Proyectos (Vapor.exe)
  components/
    sections/*.astro           secciones estáticas: Hero, Sobre mí, carretera, Formación, Contacto, Footer…
    islands/
      CassetteDeck.jsx         Experiencia: deck de casetes
      RvOs.jsx                 Skills: escritorio RV-OS
      VaporExe.jsx             Proyectos: escritorio Vapor.exe
      DeLorean3D.jsx           DeLorean en vivo con React Three Fiber
public/
  assets/                      renders .webp, sprites y montañas .svg
  models/delorean.glb          DeLorean comprimido (13.7 MB → 1.6 MB, Meshopt)
  Rony_Vargas_CV_2026.pdf
  og.png                       imagen para compartir en redes (1200×630)
```

Las islas se hidratan con `client:visible`: su JavaScript solo se descarga cuando la sección entra en pantalla. El HTML ya viene renderizado, así que Google lee todo el texto.

## Cambiar contenido

- **Experiencia, Skills y Proyectos:** edita los JSON de `src/data/`.
- **Sobre mí, Formación y Contacto:** por ahora están en su `.astro` correspondiente en `src/components/sections/`.
- **Tu foto:** busca `[TU FOTO]` en `About.astro` y cámbialo por un `<img>`.

## 3D en vivo

- `DeLorean3D.jsx` carga `public/models/delorean.glb` con `useGLTF` de drei, que decodifica Meshopt solo.
- Mientras carga, o en equipos muy modestos o con "reducir movimiento" activado, se ve el sprite de siempre.
- Para probarlo abre `/lab/delorean/`. Agrega `?3d` a la URL para forzarlo en cualquier equipo.
- Para usarlo en la portada pon `"delorean3d": true` en `src/data/site.json`.

Para preparar otro modelo:

```bash
npx @gltf-transform/cli weld entrada.glb a.glb
npx @gltf-transform/cli simplify a.glb b.glb --ratio 0.3 --error 0.0008
npx @gltf-transform/cli meshopt b.glb public/models/salida.glb
```

Después cárgalo igual que el DeLorean: una escena por sección, con la imagen .webp como respaldo mientras carga.

## SEO

- Cambia el dominio en `astro.config.mjs` (`site`), en `src/data/site.json` (`url`) y en `public/robots.txt`.
- El sitemap se genera solo al compilar (`sitemap-index.xml`).
- Título, descripción y redes están en `src/data/site.json`.
- Las fuentes se sirven desde el propio sitio con Fontsource, sin pedirlas a Google.

## Publicar en Netlify

`netlify.toml` ya trae el comando de build, la carpeta `dist` y caché larga para `/assets` y `/models`. Conecta el repositorio en Netlify y listo.

## Pendientes antes de publicar

- [ ] **Busto (`public/assets/bust.webp`):** su licencia es CC BY-NC-SA (no comercial). Cámbialo por uno CC BY o CC0 y actualiza el crédito en `Footer.astro`.
- [ ] **Imagen anime (`public/assets/fondo-rv.webp`):** confirma quién la hizo y si puedes usarla, o reemplázala.
- [ ] **Foto:** sustituir `[TU FOTO]` en Sobre mí.
- [ ] **Etiqueta "3D PENDIENTE · TELÉFONO DE DISCO"** en `Contact.astro`: quítala o pon el modelo.
- [ ] Revisar que el correo, LinkedIn y GitHub de Contacto sean los correctos.

## Créditos

Los modelos 3D y sus licencias están en el footer (`src/components/sections/Footer.astro`). El estilo base viene de "Synthwave website" de Matthieu Petel (CodePen, licencia MIT).
