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
- Local browser persistence for the active project DSL
- Project JSON export/import for moving edited DSL across devices

## Run Locally

```bash
git clone https://github.com/Used4Work/EasyFrontEnd.git
cd EasyFrontEnd
corepack enable
corepack prepare pnpm@10.33.2 --activate
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
pnpm handoff:check
```

The same validation chain runs in GitHub Actions through `.github/workflows/ci.yml`.

## Handoff

Use `HANDOFF.md` when switching devices, IDEs, or AI agents. It records the cold-start protocol, current state files, and what GitHub does not contain.

## Architecture Principle

The DSL is the source of truth. Preview, visual editing, quality scoring, persistence, and export must all read from and write to the EasyFrontEnd project DSL.

## Mocked in MVP

AI generation and copy improvement use `src/lib/ai/mockAiAdapter.ts`. The adapter boundary is ready for a real LLM later.

Project persistence is local to the current browser. Cloud accounts and shared workspaces are not implemented yet.

Use editor `Export JSON` and `Import JSON` when moving an edited project between browsers or devices.
