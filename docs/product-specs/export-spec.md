# Export Spec

Export reads from the same DSL used by preview and editing.

## MVP Formats

- Project JSON export/import transfers the editable DSL itself.
- `exportHtml(project)` returns a stable HTML fragment.
- `exportReactTailwind(project)` returns a React/Tailwind component snippet.

## Requirements

- Keep section order identical to the DSL.
- Include key user-edited content.
- Do not maintain a separate export-only page model.
- Do not allow preview and exported code to diverge.
- Validate imported project JSON before replacing the active project.

## Current Implementation

- `src/lib/export/exportHtml.ts` outputs a semantic HTML fragment with `data-section-id` and `data-section-type`.
- `src/lib/export/exportReactTailwind.ts` outputs a simplified React component snippet preserving visible section order.
- `src/lib/dsl/projectFiles.ts` exports and imports wrapped project JSON with format and version metadata.
- The editor export modal reads from the active in-memory DSL project.
