# Adrián de los Reyes — portfolio

Bilingual portfolio for recruiters and developers, built with Next.js 13, React 18, TypeScript, Contentlayer and Three.js.

## Development

Use Node.js 20+ and pnpm 10.29.2.

```sh
pnpm install
pnpm dev
pnpm build
pnpm start
pnpm exec rome check .
```

The public pages live in `app/[lang]`. `/` and legacy paths redirect to `/en` or `/es`, using a saved `portfolio-language` cookie before `Accept-Language`; unsupported languages fall back to English. Explicit locale paths win. The footer switches languages while preserving the route, query and fragment, and stores the preference for a year.

## Content

- `content/profile.ts`: verified experience, technologies and education.
- `util/i18n.ts`: interface copy, contact details and the current English/Spanish CV URLs.
- `content/projects/{en,es}/*.mdx`: matched bilingual cases. Use the same slug in both languages.
- `contentlayer.config.js`: required locale, category, presentation, role and summary. Set `repositoryVisibility: public` before adding a public repository URL.
- `presentation`: `featured` for the home page, `listed` for the gallery, `archived` for the folded earlier-work section, `hidden` for historical pages excluded from galleries and sitemap.
- `util/projects.ts`: legacy aliases for merged La Misión and CrazyGrow cases.
- `public/projects/SOURCES.md`: media provenance.

Keep factual outcomes distinct from ongoing work. Moka's 1,500+ verified users and 30 active merchants describe its state before acquisition, not current Ahí Va metrics. No private repositories, credentials or operational data are shipped.

The 3D hero loads lazily on desktop, on request on mobile, and renders only on interaction. Reduced motion, missing JavaScript and WebGL failure retain the semantic SVG and readable content. Controls remain accessible HTML.

See `PRODUCT.md` and `DESIGN.md` for the brief and design decisions. The existing bot API stays server-side and follows `.env.example`; `BOT_SECRET` must never be exposed to client code.
