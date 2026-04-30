# EasyFrontEnd

EasyFrontEnd is an AI visual frontend/UI design tool for non-professional users. It turns guided requirements into a structured page DSL, renders that DSL as a visual editor, lets users adjust sections with beginner-friendly controls, scores the result, and exports frontend code from the same source of truth.

The MVP focuses on landing pages for three starter scenarios:

- AI course landing page, shown to customers in Chinese
- SaaS product landing page, shown to customers in Chinese
- Personal service landing page, shown to customers in Chinese

## MVP Scope

The current vertical slice supports:

- Customer-first new project flow
- Mock AI guided draft generation
- Chinese customer-facing UI for the main create/edit/export flow
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

Open `http://localhost:3000` to create a new Chinese landing-page draft. `/editor` is the visual editing workspace. `/preview` renders the sample DSL project as a standalone preview.

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

Use editor `备份` and `恢复` when moving an edited project between browsers or devices.
