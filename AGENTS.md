# AGENTS.md

## Project Overview

EasyFrontEnd is an AI visual frontend/UI designer for beginner users. The core product flow is:

Requirements Q&A -> Page DSL -> Visual rendering -> Module editing -> Quality score -> Code export.

The DSL is the single source of truth. UI preview, save state, quality scoring, and export must all be generated from the DSL. AI can draft or suggest changes, but it must not create an uneditable black box.

## Build / Test / Validation Commands

```bash
pnpm install
pnpm dev
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

## Development Workflow

Before starting any feature, read:

- `ARCHITECTURE.md`
- `docs/PRODUCT_SENSE.md`
- `docs/FRONTEND.md`
- Relevant files in `docs/product-specs/`
- Current active plan in `docs/exec-plans/active/`

Large features must update or create an active execution plan before implementation. Every implementation must update related docs in the same change. Do not write code-only changes for product behavior.

Use existing project boundaries:

- DSL types, validation, samples, and mutations live in `src/lib/dsl/`.
- Canvas rendering lives in `src/components/rendered/`.
- Editor UI lives in `src/components/editor/`.
- Quality scoring lives in `src/lib/quality/`.
- Export logic lives in `src/lib/export/`.
- AI integration lives behind adapters in `src/lib/ai/`.
- Tests live in `tests/`.

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
