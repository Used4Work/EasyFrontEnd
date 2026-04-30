# Customer-First Project Start Plan

## Current Status

This is the active plan. Portable project DSL import/export is complete and archived in `docs/exec-plans/completed/portable-project-dsl-import-export.md`.

The next product gap is that the root route still behaves like a developer shortcut. Customers should start by creating a useful page draft, not by landing inside an already-open editor with technical backup controls competing for attention.

## Product Intent

Make the first screen feel like EasyFrontEnd is a product for non-technical customers designing frontend UI:

Select scenario -> answer simple business questions -> generate DSL draft -> edit visually -> export.

## Non-Goals

- Marketing homepage.
- Multi-project dashboard.
- Authenticated workspace.
- Real LLM integration.
- Template marketplace.

## Phase 1: Customer New Project Flow

Tasks:

- [x] Replace `/` redirect with a new project start screen.
- [x] Support the three MVP scenarios: AI course, SaaS product, personal service.
- [x] Ask for audience, offer name, primary action, and tone.
- [x] Use the mock AI adapter to generate a DSL draft.
- [x] Save the generated DSL into local project storage and route to `/editor`.
- [x] Allow restoring a previously exported project file from the start screen.

Acceptance:

- A customer can start from `/`, generate a draft, and arrive in the visual editor.
- The generated draft is the same DSL used by preview, editing, quality score, local persistence, and export.
- A customer can restore a project JSON backup without opening the editor first.

## Phase 2: Editor Focus

Tasks:

- [x] Remove the full wizard strip from the editor workspace.
- [x] Add a simple new-project action that returns to `/`.
- [x] Rename technical project JSON actions into customer-friendly backup/restore actions.

Acceptance:

- The editor opens as the visual editing surface.
- Technical JSON wording is not part of the primary customer workflow.
- Backup/restore remains available for portability.

## Phase 3: Documentation Sync

Tasks:

- [x] Update product, frontend, handoff, and project-state docs.
- [x] Run full validation.

Validation results:

- `pnpm handoff:check` passed.

Acceptance:

- Docs describe the customer-first start flow.
- `pnpm handoff:check` passes.

## Risks

- Root route must remain useful for returning users with local saved work.
- New project generation must not bypass the DSL adapter.
- Backup/restore should be available but not look like the main product promise.

## Manual Operations Needed

- None for local development.
- Product screenshots/docs should be refreshed after the UI stabilizes.
