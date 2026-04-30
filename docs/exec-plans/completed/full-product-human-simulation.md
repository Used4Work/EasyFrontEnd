# Full Product Human Simulation Plan

## Current Status

This plan is complete. The sketch-to-component DSL expansion plan is active again at `docs/exec-plans/active/sketch-to-component-dsl-expansion.md`.

EasyFrontEnd already has a browser smoke test for sketch upload, editing, Smart Suggestions, and export. The next harness step is a fuller human simulation suite that exercises every current visible product capability, not just the happy path.

## Product Intent

Let a future agent or developer run a realistic browser simulation and answer:

- Can a beginner create a project?
- Can they upload a sketch and turn it into editable DSL?
- Can they edit content, style, order, visibility, duplicated modules, added modules, preview, quality score, backup, restore, reset, and export?
- Can the UI survive common mistakes such as invalid imports or missing sketch uploads?

Automation is not product judgment, but it should catch broken customer workflows before a human notices them.

## Phase 1: E2E Test Matrix

Tasks:

- [x] Cover AI draft creation from `/start`.
- [x] Cover sketch upload to editable DSL.
- [x] Cover content editing and style editing.
- [x] Cover module add, move, drag reorder, hide/show, duplicate, delete.
- [x] Cover desktop/mobile switching and preview modal.
- [x] Cover quality panel visibility.
- [x] Cover HTML and React export plus clipboard copy.
- [x] Cover backup download and restore upload.
- [x] Cover reset.
- [x] Cover invalid restore and missing sketch upload guardrails.

Acceptance:

- Tests interact with visible UI or rendered DOM, not internal React state.
- Tests verify output through visible preview/export changes whenever possible.
- Each test starts with clean browser storage.

## Phase 2: External Debugging Tooling

Tasks:

- [x] Add an external browser quality/debugging tool for accessibility checks.
- [x] Keep Playwright trace and screenshot capture for failed browser runs.
- [x] Record that network request mocking should wait until a real LLM or vision adapter exists.

Acceptance:

- The added tool improves feedback without becoming a brittle visual snapshot test.
- CI can run the suite without secrets.

## Phase 3: Validation and Handoff

Tasks:

- [x] Run `pnpm test:e2e`.
- [x] Run `pnpm handoff:check`.
- [x] Update docs with the simulation coverage and manual setup notes.

Acceptance:

- Future agents can understand the E2E suite from docs and run it after checkout.
- Active plan and project state describe the new automation boundary.

## Limits

- Browser automation cannot judge whether the generated design is strategically good.
- Current sketch parsing and AI generation are still mocked.
- Real external model calls must not be added to E2E until there is a safe mock or test adapter.
