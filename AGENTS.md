# Repository Guidelines

## Project Structure & Module Organization

This portfolio uses Next.js 13, React 18, TypeScript, Tailwind CSS, and Contentlayer.

- `app/` contains App Router pages, layouts, and project detail routes under `projects/[slug]/`.
- `app/components/` holds shared UI; `app/chat/` contains chat UI and Direct Line helpers.
- `pages/api/route.js` starts bot conversations through a server-side API endpoint.
- `content/projects/*.mdx` defines project entries; `content/experiences.tsx` stores experience content.
- `public/` holds images, stack icons, and fonts. `global.css` and `tailwind.config.js` define shared styling.
- `util/` and `types/` contain helpers and type declarations. Treat `.next/` and `.contentlayer/` as generated output.

## Build, Test, and Development Commands

Use pnpm consistently; the formatting script and dependency overrides explicitly use it.

- `pnpm install`: install dependencies.
- `pnpm dev`: start the local development server.
- `pnpm build`: generate Contentlayer content and compile the production application.
- `pnpm start`: serve the production build after building.
- `pnpm exec rome check .`: check lint and formatting issues without applying fixes.
- `pnpm fmt`: apply Rome fixes and formatting. This includes unsafe fixes; review the resulting diff.

## Coding Style & Naming Conventions

Prefer TypeScript for new components and helpers. Follow nearby formatting; Rome defaults to tab indentation, and existing files vary. Use PascalCase component names, camelCase functions and variables, and Next.js route filenames such as `page.tsx` and `layout.tsx`. Use the `@/` alias for imports from the repository root. Keep interactive components explicitly marked with `"use client"`.

Name project MDX files with lowercase, hyphenated slugs. Include the required `title` and `description` frontmatter; follow `contentlayer.config.js` for optional fields.

## Testing Guidelines

No automated test framework, test script, or coverage threshold is currently configured. Run `pnpm build` and Rome checks, then manually verify affected routes, project filtering, MDX rendering, and responsive layouts. Verify chat behavior when changing its integration. Document validation in the pull request.

## Commit & Pull Request Guidelines

Recent history includes `build:` and `fix:` prefixes alongside short unprefixed messages. Prefer concise, descriptive subjects such as `fix: correct project filtering`. Keep commits focused.

Pull requests should explain the change, link relevant issues, and list validation performed. Include screenshots for visual changes and describe any configuration requirements.

## Security & Configuration

Use `.env.example` as the configuration reference. Keep `BOT_SECRET` server-side in local or deployment environment variables; never commit credentials or expose them through client code.
