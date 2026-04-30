# MVP Spec

## Target Users

Beginner users who need a landing page but do not know frontend design, CSS, or code. Examples include course creators, SaaS founders, consultants, and personal service providers.

## Core Scenario

A user answers a few guided questions, receives a landing-page draft, edits sections visually, checks quality feedback, and exports HTML or React/Tailwind code.

## MVP Scope

- Landing-page projects only.
- Customer-first project start flow.
- AI course, SaaS product, and personal service starter scenarios.
- Chinese customer-facing labels and default generated content for the primary workflow.
- Mock AI adapter.
- DSL-driven preview.
- Section selection, content editing, style editing, ordering, hiding, duplication, deletion, and adding modules.
- Desktop and mobile canvas preview.
- Deterministic quality score.
- HTML and React/Tailwind snippet export.
- Local browser persistence for the active project DSL.
- Project JSON import/export for cross-device DSL transfer.

## Non-Goals

- Full website builder.
- Freeform Figma-style canvas.
- Raw CSS editor as the primary mode.
- Real LLM calls.
- Multi-user collaboration.
- Persistent cloud storage.

## Acceptance Criteria

- A user can generate a draft locally with mock AI.
- A Chinese-speaking user starts from `/`, chooses a scenario, and enters the editor with a generated DSL draft.
- The page renders from DSL.
- The user can select sections and edit key content.
- The user can reorder modules.
- Top-bar and module-tree actions provide visible UI feedback.
- The user can inspect quality score suggestions.
- The user can export HTML or React/Tailwind snippets from the same DSL.
- The user can refresh the editor and recover the last valid local project.
- The user can export and import the editable project DSL as JSON.
- Lint, typecheck, tests, and build pass.

## Current Implementation Status

Current implementation:

- `/` includes guided mock draft generation and restore-from-backup.
- `/editor` includes Chinese structure tree, canvas, inspector, quality score, preview modal, backup/restore, and export modal.
- `/preview` renders the sample project from DSL.
- Tests cover DSL validation, content mutation, section reorder, quality scoring, local persistence, project JSON import/export, HTML export order, and React/Tailwind content.

Known MVP simplifications:

- AI is mocked.
- Exported React/Tailwind is a stable simplified snippet rather than a full production Next.js page.
- Project persistence is local browser storage plus manual JSON transfer; there is no cloud account or collaboration yet.
