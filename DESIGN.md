---
name: "Adrián de los Reyes — portfolio"
description: "A dark engineering folio with an interactive backend, web and mobile system."
colors:
  ink: "#0b1016"
  raised: "#111923"
  bone: "#f2f1ea"
  muted: "#aeb9c6"
  cyan: "#8bd3df"
  copper: "#e7a77d"
  rule: "#293541"
typography:
  display:
    fontFamily: "Manrope, sans-serif"
    fontSize: "clamp(55px, 5.45vw, 82px)"
    fontWeight: 750
    lineHeight: 1.055
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Manrope, sans-serif"
    fontSize: "clamp(32px, 4vw, 52px)"
    fontWeight: 650
    lineHeight: 1.13
    letterSpacing: "-0.035em"
  identity:
    fontFamily: "Manrope, sans-serif"
    fontSize: "34px"
    fontWeight: 650
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Manrope, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.65
  technical:
    fontFamily: "IBM Plex Mono, monospace"
    fontSize: "12px"
    fontWeight: 400
rounded:
  control: "6px"
  filter: "5px"
  media: "12px"
spacing:
  small: "8px"
  group: "16px"
  content: "24px"
  columns: "48px"
  section: "105px"
  section-mobile: "65px"
components:
  button-primary:
    backgroundColor: "{colors.cyan}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "12px 21px"
    height: "50px"
  button-secondary:
    textColor: "{colors.bone}"
    rounded: "{rounded.control}"
    padding: "12px 21px"
    height: "50px"
  filter-selected:
    backgroundColor: "{colors.cyan}"
    textColor: "{colors.ink}"
    rounded: "{rounded.filter}"
    padding: "10px 18px"
---

# Design System: Adrián de los Reyes

## Overview

**Creative North Star: "Dark engineering folio"**

A dark engineering folio: a precise product system unfolds beside a clear personal introduction. The user selected the dark layered system, delegated the composition and approved implementation. Human-readable content remains the primary interface; the model makes backend, web and mobile relationships tangible.

Real work is presented through large screenshots, concise contribution statements and readable case studies. Identity is prominent and surfaces stay quiet. Motion now extends through the reading journey: experience rules, bounded heading reveals, unfolding shipped interfaces and illustrative gesture input. Silent project reels supply direct evidence of the experiments. The final build, rather than a generated screen or an earlier seed, defines the tokens below.

**Key Characteristics:**

- Dark ink, bone text, cyan actions and a restrained copper accent.
- Manrope for identity and reading; IBM Plex Mono only for technical data.
- Editorial screenshots, quiet dividers and a countable layered system.
- Responsive natural scrolling, bounded motion and accessible HTML controls.
- Manual silent demos with original LinkedIn posts beside the project context.

The retained concept evidence: Grounded sources considered: engineering folio, exploded assembly drawing, product specification, technical journal, deployment schematic, dark layered product system (user-pinned), annotated case-study archive. Concept seed c037114b completed; the user-pinned dark layered system overrides the roll. Challengers decline on identification and clarity: Saul Bass timed cards hide recruiter information (retain one focal move); fluorescent magazine duotone weakens screenshot truth (retain strong type hierarchy); cathode ghosts weaken readability (retain deliberate state contrast); seven-segment displays limit prose (retain stable control placement); layered papercut conflicts with material and content (retain layer legibility); accretion disk navigation obscures experience (retain spatial depth). No challenger motifs are imported.

## Colors

Ink is the page ground; raised separates the laboratory and intentional state surfaces. Bone carries primary text, muted carries supporting prose, cyan marks actions and selected layers, copper distinguishes small project metadata and assembly details. Rule draws restrained separators. The frontmatter values map directly to global.css custom properties with the same names.

## Typography

Manrope variable and IBM Plex Mono Regular are self-hosted with OFL licenses. Display headings use weight 750, while section headings use 650. At desktop the hero ends at 82px; other page titles end at 80px. The name is 34px desktop, 29px through 1100px and 26px mobile. The mobile hero uses clamp(43px, 9.2vw, 65px), reduced to 40px at widths up to 360px. Body is 16px; case prose is 17px desktop and 16px mobile with a 70ch measure. Technical text is 9–12px depending on annotation or data role. Tracking never goes below -0.04em.

## Layout

Desktop shell: min(1393px, 100% - 112px), with 56px side margins before the maximum. Through 1100px use 32px sides; through 767px use 20px, then 16px through 360px. Header height is 82px on desktop, with wrapped visible navigation on mobile. Hero columns are .95fr / 1.05fr with a 48px gap and 42px/38px vertical padding. The static/3D viewport is 460px high desktop, 400px tablet and 360px mobile. Experience begins after a compact proof strip and is visible in both desktop opening captures.

Sections generally use 105px vertical spacing desktop and 65px mobile. Editorial cases pair an image and prose; galleries use three columns, two through 1100px and one through 767px. Laboratory tiles use four/two/one columns. Keep natural scrolling and scroll anchors; prose remains readable independently of motion.

## Elevation & Depth

UI surfaces use tonal separation and 1px rules, with no CSS shadow vocabulary. Perspective, actual geometry and lighting carry depth in the system. Static SVG layers use explicit faces, edges and connections rather than a decorative picture. Real screenshots remain visually true to their sources. Their scroll unfolding uses shallow perspective rather than a new surface treatment; desktop mouse movement adds bounded depth, while mobile retains a smaller vertical unfold without sideways copy movement.

## Shapes

Controls have 6px corners, project filters 5px, and screenshot/portrait containers 12px. The small circular image action uses a 40px footprint. Use thin separators and clear foreground/background state changes. The retained portrait's silhouette belongs to its source image; no geometric CSS mask is applied.

## Components

Primary buttons use cyan on ink, 12px 21px padding and a 50px minimum height; hover lightens cyan. Secondary buttons use a restrained outline and a raised hover surface. Focus is a 2px cyan outline with 6px offset. Selection uses cyan on ink; scrollbar thumbs use the supporting palette. Text-link arrows shift 3px over 180ms.

Project previews lead with real screenshot, diagram or playable demo, title and summary; category/code visibility follows. Tile media retains the screenshot ratio (1.44); case-study video uses a wider ratio (1.65). Experience details use native disclosure controls. Contact is direct email/LinkedIn/GitHub, with a clipboard feedback state; mobile places the email username and whole domain on separate lines. The footer switches locale while preserving the route, query and fragment.

The opening system retains its assembly interaction and three HTML layer controls. Its static alternative remains independent of WebGL. Image hover lasts 500ms and SVG assembly 600ms with cubic-bezier(.16,1,.3,1).

Reading motion follows natural scrolling: a fixed cyan rail (2px) tracks page progress; the current experience row draws its cyan rule (600ms) and highlights its title. Headings reveal once with a bounded mask and 14px rise (650ms); work images reveal once from a 22% right mask (750ms). Editorial screenshots unfold through a shallow perspective (1100px), up to 3 degrees on X, -7 degrees on Y and 22px of vertical offset. Desktop mouse depth adds at most 2.5 degrees on Y and 1.5 degrees on X; mobile reduces unfolding to 2 degrees and 12px, with stationary copy. These enhancements start from readable HTML, never a hidden resting state. Scroll updates are scheduled on demand and restricted to nearby reading stages.

The laboratory gesture explorer depicts an illustrative hand with 21 landmarks, cyan joints/connections and copper fingertips. Three native HTML pose buttons expose their selection through aria-pressed and work by keyboard. This illustration does not claim live hand tracking. Its Three.js module loads only near the desktop laboratory (180px approach margin), or after mobile opt-in; rendering caps pixel ratio at 1.5 and requests frames only while a visible pose or pointer transition is settling. Hidden/offscreen scenes stop scheduling. Initialization failure or context loss retains the static SVG and HTML controls. A live reduced-motion change removes the gesture canvas and clears reading transforms and animations; static poses remain usable.

Experiment reels use real silent recordings and their poster images. Playback starts only through an explicit play button, stays muted and inline, exposes native controls, and pauses when offscreen or the document is hidden. Returning to the page does not resume playback automatically. Keep the original LinkedIn post beside the case link, with adjacent text explaining the recorded interaction. Reduced motion suppresses decorative movement while preserving user-requested video playback. With no JavaScript, project text, case links and original post links remain available.

## Do's and Don'ts

### Do:

- Do use real screenshots and verified professional claims.
- Do preserve equivalent Spanish and English content and working localized routes.
- Do keep text and controls usable with reduced motion, no JavaScript or unavailable WebGL.
- Do place project category and code visibility after the heading and summary.
- Do start silent demos manually and retain native playback controls and original post links.

### Don't:

- Don’t add eyebrows, decorative particles, gradient text or glass panels.
- Don’t use fictional screens, invented metrics or inaccessible private repository links.
- Don’t make navigation depend on the 3D scene.
- Don’t record the 70.3% image comparison as an automatic fidelity pass.

Evidence policy: Moka's metrics describe its pre-acquisition state; ongoing migrations are labeled as ongoing. Source images carry embedded provenance. The final independent reviewer scored all eight material corrections resolved. Automatic hero/responsive image gates remain recorded as forced closures under the user's composition delegation; overlapping segmentation and factual adaptations are documented in .impeccable/review/region-corrections.md.
