# Frontend Guide

The frontend is a Next.js App Router application using TypeScript, React, Tailwind CSS, Vitest, ESLint, and Prettier.

## Routes

- `/` is the customer start screen for creating or restoring a project.
- `/editor` is the primary MVP workspace.
- `/preview` renders a DSL sample as a standalone preview.
- The editor top bar includes backup/restore actions for moving the active DSL between devices.
- The customer-facing create, edit, score, preview, backup, restore, and export flow is presented in Chinese.

## Component Boundaries

- Editor controls go in `src/components/editor/`.
- Rendered landing-page sections go in `src/components/rendered/`.
- Shared primitives go in `src/components/ui/`.
- DSL logic stays outside React components in `src/lib/dsl/`.
- Local project persistence lives in `src/lib/persistence/`.

## UI Rules

The editor defaults to beginner mode. Do not expose raw CSS classes, pixel values, or layout jargon in primary controls.

Primary buttons must produce visible feedback: open a panel, change the selected module, mutate the DSL, or update the save/status text.

## Current MVP Components

- `EditorShell` owns transient editor UI state.
- `NewProjectWizard` owns the customer-first project start flow.
- `ModuleTree` mutates DSL section order and visibility.
- `PreviewPanel` opens a modal preview from the same DSL as the canvas.
- `CanvasPreview` renders `RenderPage` from DSL.
- `InspectorPanel` mutates content, semantic styles, and theme tokens.
- `QualityPanel` displays deterministic scoring from DSL.
- `ExportPanel` calls the HTML and React/Tailwind exporters.
- `localProjectStorage` saves and restores the active DSL from browser localStorage.
- `projectFiles` exports and imports validated project JSON files.
