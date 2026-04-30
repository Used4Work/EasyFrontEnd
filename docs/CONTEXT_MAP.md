# Context Map

Use this map when a new person or agent needs to find the right context quickly.

## Start Here

- `HANDOFF.md`: cold-start instructions and handoff rules.
- `AGENTS.md`: agent workflow, prohibited patterns, and definition of done.
- `ARCHITECTURE.md`: system boundaries and data ownership.
- `docs/PROJECT_STATE.md`: current implementation state.
- `docs/PLANS.md`: where active and completed execution plans live.

## Product Intent

- `docs/PRODUCT_SENSE.md`
- `docs/product-specs/mvp-spec.md`
- `docs/product-specs/visual-editor-spec.md`
- `docs/product-specs/ai-wizard-spec.md`
- `docs/product-specs/export-spec.md`

## Design and Architecture Decisions

- `docs/design-docs/core-beliefs.md`
- `docs/design-docs/visual-editor-model.md`
- `docs/design-docs/dsl-first-rendering.md`
- `docs/design-docs/ai-assistant-boundaries.md`
- `docs/design-docs/quality-score-system.md`
- `docs/generated/project-dsl-schema.md`

## Engineering Harness

- `.github/workflows/ci.yml`
- `.github/pull_request_template.md`
- `.github/ISSUE_TEMPLATE/`
- `docs/RELIABILITY.md`
- `docs/SECURITY.md`
- `docs/references/github-repo-operations.md`
- `docs/references/competitor-product-patterns.md`
- `scripts/verify-handoff.mjs`

## Code Ownership

- `src/lib/dsl/`: project schema, samples, validation, and mutations.
- `src/lib/dsl/projectFiles.ts`: portable project JSON import/export.
- `src/components/rendered/`: DSL-to-UI rendering.
- `src/components/editor/`: visual editor UI.
- `src/components/onboarding/`: customer project start flow.
- `src/lib/onboarding/`: scenario defaults for draft generation.
- `src/lib/quality/`: quality score rules.
- `src/lib/export/`: HTML and React/Tailwind export.
- `src/lib/ai/`: AI adapter boundary.
- `src/lib/persistence/`: local project persistence.
- `tests/`: unit tests for DSL, quality, export, and persistence.
