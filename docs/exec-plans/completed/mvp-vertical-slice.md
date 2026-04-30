# MVP Vertical Slice Execution Plan

## Current Status

Phases 0 through 6 are complete for the first MVP vertical slice. The current app runs locally, renders from DSL, supports visual section editing, displays quality scoring, and exports HTML or React/Tailwind snippets.

## Phase 0: Repository Harness

Tasks:

- [x] Initialize Next.js App Router project with TypeScript, Tailwind CSS, pnpm, ESLint, Prettier, and Vitest.
- [x] Create `AGENTS.md`, `README.md`, `ARCHITECTURE.md`.
- [x] Create docs structure and baseline product/design references.

Acceptance:

- Project installs with `pnpm install`.
- Required scripts exist in `package.json`.
- Agent workflow and prohibited patterns are documented.

## Phase 1: DSL Foundation

Tasks:

- [x] Define DSL types.
- [x] Create sample landing-page projects.
- [x] Create validator.
- [x] Create mutation helpers.
- [x] Add DSL tests.

Acceptance:

- Sample project validates.
- Content update and section reorder are tested.

## Phase 2: Renderer

Tasks:

- [x] Create `RenderPage` and `RenderSection`.
- [x] Create base landing-page sections.
- [x] Render sample project from DSL.

Acceptance:

- `/preview` renders a complete landing page from DSL.

## Phase 3: Editor Shell

Tasks:

- [x] Create `/editor`.
- [x] Build top bar, module tree, canvas preview, inspector, and device switcher.
- [x] Support section selection, Hero copy edits, and section up/down movement.

Acceptance:

- User can select a section, edit Hero content, and reorder sections with visible canvas updates.

## Phase 4: Quality Score

Tasks:

- [x] Create deterministic quality rules.
- [x] Create `scoreProject`.
- [x] Create `QualityPanel`.

Acceptance:

- Editor displays overall score, dimension scores, and suggestions from DSL.

## Phase 5: Export

Tasks:

- [x] Create HTML exporter.
- [x] Create React/Tailwind exporter.
- [x] Show export output in UI with copy support.

Acceptance:

- Exported snippets preserve DSL section order and include edited content.

## Phase 6: Documentation Sync

Tasks:

- [x] Update docs with implemented behavior.
- [x] Mark completed phases.
- [x] Update tech debt tracker.

Acceptance:

- Docs reflect the current MVP.
- Validation commands pass or failures are documented.

## Risks

- Tailwind and Next.js version compatibility may need config adjustment.
- Keeping inspector edits generic while preserving type safety requires careful helper design.
- Export can drift from renderer unless both stay DSL-based and tested.

## Follow-Up Tasks

- Add persistent project save/load.
- Add real LLM adapter behind the existing interface.
- Add Playwright coverage for editor flows.
- Add richer accessibility checks.

## Validation Results

- `pnpm lint` passed.
- `pnpm typecheck` passed.
- `pnpm test` passed.
- `pnpm build` passed.
