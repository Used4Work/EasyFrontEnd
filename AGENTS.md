# AGENTS.md

## Project Overview

EasyFrontEnd is a visual frontend/UI editor for beginner users. The editor is the product center and AI is auxiliary. The core product flow is:

Visual editor -> Page DSL -> Drag/select module editing -> AI-assisted local optimization -> Quality score -> Code export.

The DSL is the single source of truth. UI preview, save state, quality scoring, and export must all be generated from the DSL. AI can draft or suggest changes, but it must not create an uneditable black box.

## Build / Test / Validation Commands

```bash
pnpm install
pnpm dev
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm harness:check
pnpm handoff:check
```

## Cold-Start Protocol

When taking over from a new device, IDE, or agent, do not rely on chat context. Start from the repository:

1. Read `HANDOFF.md`.
2. Read this file, `ARCHITECTURE.md`, `docs/PROJECT_STATE.md`, `docs/PLANS.md`, and the single active plan in `docs/exec-plans/active/`.
3. Read the relevant product spec before editing behavior.
4. Run `pnpm install` if dependencies are missing.
5. Run `pnpm handoff:check` before making a large change.

If the active plan does not match the requested work, update or replace the active plan first. Completed plans must move to `docs/exec-plans/completed/`.

## Development Workflow

Before starting any feature, read:

- `HANDOFF.md`
- `ARCHITECTURE.md`
- `docs/PROJECT_STATE.md`
- `docs/PRODUCT_SENSE.md`
- `docs/FRONTEND.md`
- Relevant files in `docs/product-specs/`
- Current active plan in `docs/exec-plans/active/`

Large features must update or create an active execution plan before implementation. Every implementation must update related docs in the same change. Do not write code-only changes for product behavior.

Use existing project boundaries:

- DSL types, validation, samples, and mutations live in `src/lib/dsl/`.
- Portable project JSON import/export lives in `src/lib/dsl/projectFiles.ts`.
- Canvas rendering lives in `src/components/rendered/`.
- Editor UI lives in `src/components/editor/`.
- Quality scoring lives in `src/lib/quality/`.
- Export logic lives in `src/lib/export/`.
- AI integration lives behind adapters in `src/lib/ai/`.
- Tests live in `tests/`.
- Handoff and cold-start context lives in `HANDOFF.md`, `docs/PROJECT_STATE.md`, and `docs/CONTEXT_MAP.md`.

Do not introduce complex dependencies unless their role can be explained in one short paragraph and documented in the active plan.

## Prohibited Patterns

- Do not turn the beginner editor into a Figma-style layer editor.
- Do not expose raw CSS, Flex, Grid, z-index, px, or rem as default controls.
- Do not require prompt-only editing for normal page changes.
- Do not let AI rewrite the whole page in a way that removes user control.
- Do not bypass the DSL with hardcoded page state.
- Do not let export logic and canvas rendering use different page models.
- Do not allow preview and exported code to drift.
- Do not modify DSL schema, exporters, or quality scoring without tests.
- Do not hardcode API keys, model keys, or user content into source code.

## Definition of Done

- Feature runs in the browser.
- TypeScript has no errors.
- `pnpm lint` passes.
- `pnpm test` passes.
- `pnpm build` passes.
- Related docs are updated.
- At least one demonstrable DSL sample project exists.
- Visual editor, DSL, preview, and export share one consistent data flow.
