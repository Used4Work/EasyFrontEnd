# Export Spec

Export reads from the same DSL used by preview and editing.

## MVP Formats

- `exportHtml(project)` returns a stable HTML fragment.
- `exportReactTailwind(project)` returns a React/Tailwind component snippet.

## Requirements

- Keep section order identical to the DSL.
- Include key user-edited content.
- Do not maintain a separate export-only page model.
- Do not allow preview and exported code to diverge.

## Current Implementation

- `src/lib/export/exportHtml.ts` outputs a semantic HTML fragment with `data-section-id` and `data-section-type`.
- `src/lib/export/exportReactTailwind.ts` outputs a simplified React component snippet preserving visible section order.
- The editor export modal reads from the active in-memory DSL project.
