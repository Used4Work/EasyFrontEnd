# EasyFrontEnd Architecture

EasyFrontEnd uses a DSL-first architecture. The application never treats AI output, canvas state, or exported code as separate sources of truth.

## System Flow

1. The AI wizard collects beginner-friendly requirements.
2. An AI adapter returns an `EasyFrontendProject` DSL draft.
3. The visual editor renders the DSL into a live page canvas.
4. The module tree and inspector mutate the DSL with controlled helpers.
5. The quality scorer reads the DSL and produces deterministic feedback.
6. Exporters read the DSL and generate HTML or React/Tailwind snippets.

## Runtime Boundaries

- `src/lib/dsl/` owns the schema, validation, sample projects, and mutations.
- `src/components/rendered/` owns DSL-to-UI rendering.
- `src/components/editor/` owns visual editing controls.
- `src/lib/quality/` owns scoring rules and suggestions.
- `src/lib/export/` owns generated code outputs.
- `src/lib/ai/` owns replaceable AI adapters. MVP uses mock AI only.
- `src/lib/persistence/` owns local browser persistence for serialized DSL projects.
- `src/lib/dsl/projectFiles.ts` owns portable project JSON import/export for the DSL.

## Data Ownership

The active editor state is an `EasyFrontendProject` object plus transient UI-only state such as selected section id, active inspector tab, device mode, and export modal state. Transient state must never become a second page model.

Browser persistence stores the same `EasyFrontendProject` DSL in localStorage through `src/lib/persistence/localProjectStorage.ts`. Loaded projects are validated before use. Persistence is a storage mechanism only; it does not define a separate editor or export model.

Portable project JSON uses a small wrapper around `EasyFrontendProject` with format and version metadata. Imports are validated before replacing the active DSL.

## MVP Rendering Strategy

The renderer supports landing-page sections:

- Header / Navigation
- Hero
- Pain Points
- Feature Grid
- Social Proof
- Pricing
- FAQ
- Final CTA
- Footer

Each section has typed content guards in renderer/exporter code and remains serializable as DSL.

## Future Expansion

Future versions can add persistence, real LLM adapters, richer component-level editing, design token libraries, and Next.js page export. Those additions must keep the DSL as the shared contract.
