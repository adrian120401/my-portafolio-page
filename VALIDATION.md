# Validation — 2026-09-30

- `pnpm build`: passed. Generated 34 bilingual project pages plus the localized home, contact and gallery routes. TypeScript validation passed as part of the build. Next.js's local IPC listener requires execution outside this environment's network sandbox.
- Rome: all 27 changed/new TypeScript and configuration targets passed. `pnpm exec rome check .` still reports 10 existing diagnostics in untouched `app/chat/action.js`, `app/chat/index.jsx`, `mdx-components.tsx` and `pages/api/route.js`. Generated Contentlayer/Impeccable output is excluded from source checks.
- `git diff --check`: passed.
- Browser integration: 20/20 checks passed against the production server. Covers browser locale negotiation and quality weights, unsupported-language fallback, saved preference, explicit locale precedence, query preservation, 308 project aliases, all 34 case routes, canonical metadata, hidden-case noindex and sitemap exclusion, correct EN/ES CV destinations, filtering and footer language changes preserving route/query/fragment, public repository URLs, keyboard controls, no-JavaScript rendering, reduced motion and WebGL fallback.
- Responsive overflow: checked Spanish and English home pages, gallery, detailing case and contact at 320, 390, 768 and 1505 px; none found.
- Accessibility: axe-core 4.10.3 found no WCAG 2A/2AA/2.1AA violations on `/en`, `/es`, `/en/projects`, `/es/projects/detailing` and `/es/contact`. This records automated checks, not a claim of exhaustive accessibility certification.
- Real 3D: Windows Chrome 154, using a separate temporary profile, successfully rendered WebGL2; assembling changed the rendered pixels; layer controls, mobile opt-in and context-loss fallback passed. Linux Chromium's WebGL2 context is unavailable in this environment and its tests deliberately cover the static alternative.
- Media: public-page captures and the retained portrait/history image carry source provenance; 14/14 checked rasters have embedded origin metadata. Google Fonts OFL licenses are included.

Evidence is under `.impeccable/review/`: integration and WebGL JSON results, accessibility results, full-page and viewport captures, before/after assembly captures and design comparison reports. The reference-image comparison improved from 60.4% to 70.3%; its automatic hero/responsive gates are explicitly overridden under the user's delegated composition decision, with failed scores preserved. `region-corrections.md` explains erroneous overlapping segmentation, bilingual content and factual/semantic adaptations. This is not represented as an automatic pixel-match pass.

The existing bot API remains unchanged; no bot conversation, client booking, email delivery or external write was submitted during verification. Changes are local and have not been deployed.

## Follow-up: real demos and journey motion

- Corrected Numisoft to `https://numisoft.dev/` in both localized home pages. Detailing replaces CrazyGrow in Selected Work; CrazyGrow remains listed in the gallery.
- Added a palette-matched SVG favicon, explicitly referenced by locale metadata; `/favicon.svg` resolves with its SVG content type and bypasses locale negotiation.
- Added the owner's original Game Hands, PowerSigns and SIGNAL videos and thumbnails from the supplied public LinkedIn posts. MP4 total is approximately 4.54 MiB. No MP4 request occurs before Play; all three decode successfully, start muted, retain native inline controls and pause offscreen. Original post links appear on previews and both localized case pages. The owner confirmed no relevant audio or speech; no narration or audio was added.
- `pnpm build`: final build passed with 44 generated pages; home initial JS is 106 kB. Three.js scene modules remain deferred.
- Changed-source Rome: 11 TypeScript/configuration targets passed; full-repository Rome still reports the same 10 unrelated legacy diagnostics described above. `git diff --check` passed.
- Follow-up browser verification: 14/14 checks passed. Covers both locale destinations, selected work, favicon, deferred/manual video requests, native decoding/control/muting, offscreen pausing, case/post links, scroll depth and reading rail, keyboard pose changes, mobile opt-in, no overflow at 320/390/768/1505 px, initial and live reduced-motion preferences, no-JavaScript content/post access, zero runtime errors and axe WCAG AA checks on four changed surfaces plus playing state. No automated accessibility violations were reported.
- The first preference-change test asserted before the browser delivered its `matchMedia` event. It now waits for that event; final checks also confirm zero active document animations. Initial failed evidence is preserved as `motion-verification-initial.json`; passing evidence is `motion-verification.json`.
- Actual Windows Chrome WebGL verification passed: laboratory 3D remains unloaded before approaching it, pose changes alter rendered pixels, mobile requires opt-in, context loss restores the SVG, and live reduced motion removes canvases. Evidence: `motion-webgl-verification.json` and desktop/mobile WebGL captures.
- All three new poster rasters carry embedded source provenance; the new-media scan reports 3 rasters and 0 missing origins. `public/demos/SOURCES.md` records source posts and verified descriptions.
- Independent Impeccable finish review scored all three requested corrections resolved (`disposition: ship` at that fix-list scope). The independent documenter updated `DESIGN.md` and `.impeccable/design.json` from actual code, preserving the incumbent palette, typography, layout and original approval evidence.

Final evidence uses the `motion-*` captures and JSON files under `.impeccable/review/`. These changes are local; no deployment was performed.
