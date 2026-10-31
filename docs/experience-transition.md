# Hero → Experience: the software journey

One decorative section connects the homepage introduction with the existing
experience timeline. It follows product thinking, source code and real delivered
interfaces. English and Spanish copy lives in `util/i18n.ts`.

- `experience-transition.tsx` renders the artwork and the server-rendered heading.
  The code excerpt uses the same profile data as the timeline. The screenshots
  are the existing Nacho González PF and La Misión Race assets.
- `experience-journey.ts` owns one on-demand animation loop. A 2200 × 2500 logical
  canvas follows a reversible path in two axes, with secondary photo parallax.
- `util/experience-motion.ts` samples quadratic corners trimmed by 13% of the
  shorter adjacent segment, then maps progress to cumulative path distance.
  Smoothing uses `1 - exp(-dt / 0.16)` and settles exactly within `0.00001`.
- The runway is 400svh on desktop/tablet and 370svh on phones. The path completes
  at 90% progress; the existing Experience heading reveals from 84% to 99%.
  The navigation anchor lands at the timeline with its heading still visible.

Fonts and images are decoded near the viewport. Rendering stops when settled,
offscreen or the document is hidden. Cleanup removes observers, listeners and
pending frames. The effect uses DOM transforms and needs no WebGL. Reduced motion,
JavaScript failure and disabled JavaScript retain a compact static transition
and the complete accessible portfolio content. No wheel or touch input is intercepted.

## Validation

- Chrome: 1440 × 900, 820 × 1180 and 390 × 844; phone viewport also used a mobile
  user agent and touch emulation. No horizontal overflow.
- English and Spanish pages, source artwork, real screenshots and heading handoff
  inspected visually. Screenshot proportions preserved.
- Forward/backward travel to 45% produced identical settled transform strings.
  No canvas style updates occurred during the idle observation window.
- Live reduced-motion change removed the pinned runway, kept the heading visible
  and showed the static composition.
- Server HTML contains the Hero, Experience and all three Lab pose controls, with
  no animation runway attribute. Contact and Moka case routes returned HTTP 200 in
  both languages. The Lab project filter returned four projects.
- 1000 mathematical path samples passed continuity, distance-based speed, bounded
  coordinates, endpoints, reversal and exact progress settlement checks.
- `pnpm exec tsc --noEmit` and Rome checks on all six changed TypeScript files pass.
  Repository-wide Rome still reports 10 existing errors in chat, API and MDX code.
- The initial sandbox build was blocked by EPERM. A subsequent authorized
  production build passed during the SEO work, including all localized routes.

The Lab's Three.js experiment and its dependencies remain in place.
