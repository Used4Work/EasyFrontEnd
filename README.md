# EasyFrontEnd

EasyFrontEnd is a visual frontend/UI editor for non-professional users. The editor is the product center: users directly select, drag, edit, preview, score, and export a structured page DSL. AI is an assistant for creating a first draft or improving a selected module, not the main interface.

The MVP focuses on landing pages for three starter scenarios:

- AI course landing page, shown to customers in Chinese
- SaaS product landing page, shown to customers in Chinese
- Personal service landing page, shown to customers in Chinese

## MVP Scope

The current vertical slice supports:

- Customer-first new project flow
- Mock AI guided draft generation
- Chinese customer-facing UI for the main create/edit/export flow
- Editor-first home route with AI draft generation moved to `/start`
- Hand-drawn sketch upload on `/start`, currently parsed by a mock adapter into editable DSL
- DSL-driven landing page rendering
- Visual section selection and drag-based module ordering
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

Open `http://localhost:3000` to start in the visual editing workspace. `/start` opens the AI-assisted draft generator, `/editor` remains a compatibility editor route, and `/preview` renders the sample DSL project as a standalone preview.

## Validation

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm handoff:check
```

For browser-level workflow simulation, install the Playwright browser once and run:

```bash
pnpm exec playwright install chromium
pnpm test:e2e
```

On Ubuntu/WSL, if Chromium reports missing system libraries such as `libnspr4.so`, run:

```bash
sudo pnpm exec playwright install-deps chromium
```

The same quality gate and browser E2E flow run in GitHub Actions through `.github/workflows/ci.yml`.

## Handoff

Use `HANDOFF.md` when switching devices, IDEs, or AI agents. It records the cold-start protocol, current state files, and what GitHub does not contain.

## Architecture Principle

The DSL is the source of truth. Preview, visual editing, quality scoring, persistence, and export must all read from and write to the EasyFrontEnd project DSL.

## Mocked in MVP

AI generation and copy improvement use `src/lib/ai/mockAiAdapter.ts`. The adapter boundary is ready for a real LLM later.

Sketch upload uses `src/lib/sketch/mockSketchAdapter.ts`. It does not yet call a real multimodal vision model.

Project persistence is local to the current browser. Cloud accounts and shared workspaces are not implemented yet.

Use editor `备份` and `恢复` when moving an edited project between browsers or devices.
