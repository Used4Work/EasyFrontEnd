# EasyFrontEnd

EasyFrontEnd is an AI visual frontend/UI design tool for non-professional users. It turns guided requirements into a structured page DSL, renders that DSL as a visual editor, lets users adjust sections with beginner-friendly controls, scores the result, and exports frontend code from the same source of truth.

The MVP focuses on landing pages for three starter scenarios:

- AI course landing page
- SaaS product landing page
- Personal service landing page

## MVP Scope

The current vertical slice supports:

- Mock AI guided draft generation
- DSL-driven landing page rendering
- Visual section selection and module ordering
- Beginner-friendly content and style editing
- Desktop and mobile preview modes
- Deterministic quality scoring
- HTML and React/Tailwind export from the same DSL

## Run Locally

```bash
pnpm install
pnpm dev
```

Open `http://localhost:3000`. The root route redirects to `/editor`, which is the primary MVP surface. `/preview` renders the sample DSL project as a standalone preview.

## Validation

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

## Architecture Principle

The DSL is the source of truth. Preview, visual editing, quality scoring, persistence, and export must all read from and write to the EasyFrontEnd project DSL.

## Mocked in MVP

AI generation and copy improvement use `src/lib/ai/mockAiAdapter.ts`. The adapter boundary is ready for a real LLM later.
