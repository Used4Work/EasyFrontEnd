# Sketch Import Spec

## Purpose

Sketch import lets a user upload a hand-drawn frontend/UI/component sketch and turn it into an editable EasyFrontEnd DSL draft.

The sketch is an input signal. The output must be structured DSL that can be edited visually, scored, previewed, saved, and exported.

## MVP Scope

- Accept common image files from `/start`.
- Show the uploaded sketch preview before parsing.
- Use `src/lib/sketch/mockSketchAdapter.ts` to create a deterministic DSL project.
- Save the parsed project to local browser storage.
- Open the editor-first `/` route after parsing.

## Non-Goals

- Real multimodal model calls.
- Pixel-perfect reconstruction.
- Arbitrary component DSL beyond the current landing-page schema.
- Persisting uploaded image data inside the project DSL.

## Future Real Parser

A real parser should:

- Extract likely layout regions such as nav, hero, cards, proof, pricing, FAQ, and CTA.
- Convert detected regions into DSL sections and semantic content placeholders.
- Return confidence, unresolved areas, and user-facing clarification questions.
- Avoid executing or trusting uploaded content.
- Respect file-size, privacy, and retention policies before external model calls.

## Acceptance Criteria

- Uploading a sketch image creates an editable DSL project.
- The generated project validates with `validateProject`.
- The editor, preview, quality score, persistence, and export all use the generated DSL.
- The UI clearly says MVP parsing is mocked.
