# Visual Editor Primary Drag Flow Plan

## Current Status

This is the active plan. It supersedes the browser-smoke plan because the product direction is clearer now: EasyFrontEnd must open as a visual frontend/UI editor first. AI is an assistant for draft generation and local optimization, not the main interface.

## Product Intent

Make the primary loop:

打开编辑器 -> 点选或拖拽模块 -> 修改内容/样式 -> AI 辅助优化局部 -> 预览 -> 质量评分 -> 导出.

AI can help create a starting draft, but the user should not feel forced into prompt-first design.

## Phase 1: Editor-First Entry

Tasks:

- [x] Make `/` open the visual editor directly.
- [x] Move guided AI draft generation to `/start`.
- [x] Rename top-bar entry points so AI reads as auxiliary, not the product center.
- [x] Keep `/editor` as a stable compatibility route.

Acceptance:

- A customer opening the app lands in the visual editing workspace.
- AI generation remains available but secondary.
- The editor still loads the last valid local DSL or the Chinese sample project.

## Phase 2: Drag-Based Visual Ordering

Tasks:

- [x] Add DSL mutation helper for moving a section relative to another section.
- [x] Support drag-to-reorder from the left page structure tree.
- [x] Support drag-to-reorder directly from the canvas.
- [x] Keep up/down buttons as accessible fallback controls.
- [x] Select the moved module after drag reorder.

Acceptance:

- Dragging modules changes the same DSL used by preview, quality score, persistence, and export.
- No separate UI-only ordering model is introduced.
- Unit tests cover the new mutation helper.

## Phase 3: Documentation and Validation

Tasks:

- [x] Update product specs, frontend guide, README, handoff, and project state.
- [x] Move browser smoke testing back into tech debt / next work.
- [x] Run `pnpm handoff:check`.

Acceptance:

- Future agents know the product is editor-first and AI-assisted.
- Full validation passes before commit.

## Validation Result

`pnpm handoff:check` passed on 2026-04-30.

## Risks

- Drag interactions can be hard to discover without clear labels.
- Canvas drag must not break simple click-to-select editing.
- The UI should not become a Figma-style freeform layer editor; drag reorder is section-level only in this MVP.
