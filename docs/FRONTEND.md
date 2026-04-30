# Frontend Guide

The frontend is a Next.js App Router application using TypeScript, React, Tailwind CSS, Vitest, ESLint, and Prettier.

## Routes

- `/` redirects to the editor so the product opens on the usable workspace.
- `/editor` is the primary MVP workspace.
- `/preview` renders a DSL sample as a standalone preview.

## Component Boundaries

- Editor controls go in `src/components/editor/`.
- Rendered landing-page sections go in `src/components/rendered/`.
- Shared primitives go in `src/components/ui/`.
- DSL logic stays outside React components in `src/lib/dsl/`.

## UI Rules

The editor defaults to beginner mode. Do not expose raw CSS classes, pixel values, or layout jargon in primary controls.

## Current MVP Components

- `EditorShell` owns transient editor UI state.
- `ModuleTree` mutates DSL section order and visibility.
- `CanvasPreview` renders `RenderPage` from DSL.
- `InspectorPanel` mutates content, semantic styles, and theme tokens.
- `QualityPanel` displays deterministic scoring from DSL.
- `ExportPanel` calls the HTML and React/Tailwind exporters.
