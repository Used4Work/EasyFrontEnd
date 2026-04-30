# Sketch Upload to DSL Plan

## Current Status

This is the active plan. Actionable Smart Suggestions are complete and archived in `docs/exec-plans/completed/actionable-smart-suggestions.md`.

The next product capability is sketch ingestion: a user can upload a hand-drawn frontend/UI/component sketch, let EasyFrontEnd parse it into a structured DSL draft, and continue building in the visual editor.

## Product Intent

Make the loop:

上传手绘草图 -> 解析为页面 DSL -> 进入可视化编辑器 -> 拖拽/点选/修改 -> 质量评分 -> 导出.

The uploaded sketch is an input signal, not the final artifact. The editable DSL remains the source of truth.

## Phase 1: Mock Sketch Import MVP

Tasks:

- [x] Add a sketch parsing adapter boundary.
- [x] Add a deterministic mock sketch adapter.
- [x] Add upload UI on `/start`.
- [x] Save parsed DSL to local storage and open the visual editor.
- [x] Validate the parsed project before saving.
- [x] Add unit tests for sketch-to-DSL output.

Acceptance:

- Users can upload an image file and generate a sketch-derived editable project.
- MVP does not require a real vision model.
- No uploaded image data is persisted in the project DSL.

## Phase 2: Documentation and Validation

Tasks:

- [x] Add sketch import product spec.
- [x] Update README, handoff, project state, and frontend docs.
- [x] Run `pnpm handoff:check`.

Acceptance:

- Future agents know sketch parsing is adapter-based and currently mocked.
- Full validation passes.

## Validation Result

`pnpm handoff:check` passed on 2026-04-30.

## Risks

- Users may expect arbitrary component reconstruction. MVP maps sketches into the current landing-page DSL until component-level DSL is expanded.
- Real image parsing will need privacy and file-size rules before external model calls.
- The upload flow must not make screenshots or images a second source of truth.
