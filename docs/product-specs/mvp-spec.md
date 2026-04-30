# MVP Spec

## Target Users

Beginner users who need a landing page but do not know frontend design, CSS, or code. Examples include course creators, SaaS founders, consultants, and personal service providers.

## Core Scenario

A user opens the visual editor, edits sections by selecting or dragging modules, optionally asks AI to generate a draft or improve a selected module, checks quality feedback, and exports HTML or React/Tailwind code.

## MVP Scope

- Landing-page projects only.
- Editor-first home route.
- Auxiliary AI-assisted project start flow at `/start`.
- Auxiliary hand-drawn sketch upload at `/start`, currently parsed by a mock adapter.
- AI course, SaaS product, and personal service starter scenarios.
- Chinese customer-facing labels and default generated content for the primary workflow.
- Mock AI adapter.
- DSL-driven preview.
- Section selection, content editing, style editing, drag ordering, hiding, duplication, deletion, and adding modules.
- Desktop and mobile canvas preview.
- Deterministic quality score.
- HTML and React/Tailwind snippet export.
- Local browser persistence for the active project DSL.
- Project JSON import/export for cross-device DSL transfer.
- Sketch image import into editable DSL draft.

## Non-Goals

- Full website builder.
- Freeform Figma-style canvas.
- Raw CSS editor as the primary mode.
- Real LLM calls.
- Multi-user collaboration.
- Persistent cloud storage.

## Acceptance Criteria

- A user can generate a draft locally with mock AI.
- A Chinese-speaking user starts from `/` in the visual editor.
- A user can open `/start`, choose a scenario, and return to the editor with a generated DSL draft.
- A user can open `/start`, upload a sketch image, and return to the editor with a parsed DSL draft.
- The page renders from DSL.
- The user can select sections and edit key content.
- The user can reorder modules by dragging in the structure tree or directly on the canvas.
- Top-bar and module-tree actions provide visible UI feedback.
- The user can inspect quality score suggestions.
- The user can export HTML or React/Tailwind snippets from the same DSL.
- The user can refresh the editor and recover the last valid local project.
- The user can export and import the editable project DSL as JSON.
- Lint, typecheck, tests, and build pass.

## Current Implementation Status

Current implementation:

- `/` includes the Chinese visual editor.
- `/start` includes guided mock draft generation and restore-from-backup.
- `/start` includes mock sketch upload and parsing into DSL.
- `/editor` remains a compatibility route for the same editor.
- `/preview` renders the sample project from DSL.
- Tests cover DSL validation, content mutation, section reorder, quality scoring, local persistence, project JSON import/export, HTML export order, and React/Tailwind content.

Known MVP simplifications:

- AI is mocked.
- Sketch parsing is mocked.
- Exported React/Tailwind is a stable simplified snippet rather than a full production Next.js page.
- Project persistence is local browser storage plus manual JSON transfer; there is no cloud account or collaboration yet.
