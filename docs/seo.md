# SEO y previews

El origen canónico es **https://www.adriandelosreyes.me**. La configuración vive
en `util/i18n.ts`; `util/metadata.ts` genera los metadatos completos de cada página.

## Implementación

- Portada, proyectos, contacto y los 38 casos localizados tienen título,
  descripción, URL canónica y variantes `en`, `es` y `x-default`.
- `x-default` apunta a la versión inglesa concreta, evitando una URL intermedia
  que depende del idioma del navegador. La navegación existente por idioma se conserva.
- Open Graph y Twitter usan el contenido de cada página y una imagen PNG de
  1200 × 630. `/social/og.png` genera las tarjetas sin servicios externos ni
  solicitudes a imágenes arbitrarias; tiene caché y texto de entrada acotado.
- Las tarjetas usan dos instancias estáticas de Manrope, pesos 400 y 700,
  derivadas de `Manrope.ttf`. La licencia existente `public/fonts/Manrope-OFL.txt`
  se conserva. El renderer de imágenes de Next 13 no admite esta fuente variable.
- JSON-LD incluye `Person`, `WebSite`, `ProfilePage`, `ContactPage`,
  `CollectionPage`, `CreativeWork` y breadcrumbs según corresponda. El JSON
  serializado escapa `<` antes de insertarse en HTML.
- `app/robots.ts` y `app/sitemap.ts` usan el mismo dominio. El sitemap tiene 40
  URLs indexables; los cuatro casos ocultos conservan `noindex,follow` y no se
  incluyen. Las URLs con filtros canonizan al índice de proyectos.
- Los despliegues con `VERCEL_ENV=preview` tienen `noindex` y permiten rastrear
  el HTML para que los bots puedan leer esa directiva. Las imágenes sociales de
  producción son públicas y rastreables.
- `next.config.mjs` redirige el host exacto anterior
  `adriandelosreyes.vercel.app` al dominio canónico con 308, conservando rutas y
  parámetros. Los demás hosts de preview y localhost no se redirigen.
- Vercel ya configura el dominio sin `www` con redirección 308 hacia `www`.
  Se verificó la conexión DNS y una respuesta HTTPS 200 del dominio principal.

## Publicación e indexación

1. Publicar estos cambios en el proyecto existente de Vercel y comprobar el HTML
   del dominio principal. Tener conectado el dominio no publica los cambios locales.
2. Verificar la propiedad de dominio `adriandelosreyes.me` en
   [Search Console](https://search.google.com/search-console), usando el TXT exacto
   que entregue Google en el proveedor DNS autoritativo. No hay un valor genérico.
3. Enviar **https://www.adriandelosreyes.me/sitemap.xml** e inspeccionar `/en`, `/es`
   y un caso de proyecto. Para una propiedad de prefijo URL, el campo opcional
   `GOOGLE_SITE_VERIFICATION` permite usar su verificación HTML. Se conserva el
   token previo como respaldo para no romper la propiedad existente.
4. Si el dominio anterior estaba en Search Console, completar el cambio de
   dirección desde esa propiedad una vez publicadas y comprobadas las redirecciones.
5. Revisar las tarjetas con las herramientas de depuración de las plataformas
   donde se comparta el enlace. Sus cachés pueden conservar una tarjeta anterior.

## Verificación local

Con el servidor levantado:

```powershell
pnpm exec node scripts/verify-seo.mjs http://127.0.0.1:3001
pnpm exec tsc --noEmit
```

El verificador recorre las 44 páginas localizadas, valida metadatos y JSON-LD,
descarga seis previews y comprueba la firma PNG y sus dimensiones reales,
contrasta el sitemap completo y prueba filtros y redirecciones. Escribe el informe
y las imágenes de revisión en `.impeccable/build/`.

La verificación pasó también contra `pnpm build` + `pnpm start`: 44 páginas,
seis PNG y 40 entradas del sitemap. TypeScript y Rome pasan en los archivos
modificados. El chequeo global de Rome conserva los diez errores previos en chat,
API y el helper MDX.

Referencias: [migraciones de dominio de Google](https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes),
[versiones localizadas](https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites),
[protocolo Open Graph](https://ogp.me/).
