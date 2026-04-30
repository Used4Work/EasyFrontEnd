# Sketch to Component DSL Expansion Plan

## Current Status

This is the active plan. Human-simulated browser automation is complete and archived in `docs/exec-plans/completed/human-simulated-browser-automation.md`.

EasyFrontEnd can currently upload a hand-drawn sketch and map it to a landing-page DSL draft through a mock adapter. The next product step is to make sketch import feel more like a visual UI builder: identify page regions or component blocks, let the user confirm the interpretation, and convert those blocks into editable DSL sections or components.

## Product Intent

Make the sketch loop more controlled and beginner-friendly:

上传手绘稿 -> 识别页面/组件区域 -> 用户确认解析结果 -> 生成 DSL -> 进入可视化编辑器 -> 继续拖拽/点选/修改/导出.

The sketch remains an input signal. The editable DSL remains the source of truth.

## Phase 1: DSL and UX Decision

Tasks:

- [ ] Decide the MVP boundary between page sections and component blocks.
- [ ] Extend `docs/generated/project-dsl-schema.md` with component-level concepts only if needed.
- [ ] Update `docs/product-specs/sketch-import-spec.md` with the confirmation workflow.
- [ ] Add acceptance criteria for sketch-derived components in `docs/product-specs/visual-editor-spec.md`.

Acceptance:

- Future agents know whether the next implementation should add true component nodes or keep mapping sketches to section nodes.
- Beginner-facing language does not expose raw layout or CSS concepts.

## Phase 2: Mock Confirmable Sketch Regions

Tasks:

- [ ] Extend the mock sketch adapter to return detected regions or interpretation notes.
- [ ] Add a confirmation step before saving the parsed DSL.
- [ ] Let users rename detected regions with semantic names.
- [ ] Persist only confirmed DSL, never the uploaded image data.

Acceptance:

- Users can see what the system thinks the sketch contains before entering the editor.
- The generated project still validates through the DSL validator.

## Phase 3: Browser Workflow Coverage

Tasks:

- [ ] Add Playwright coverage for sketch upload -> confirm regions -> edit generated DSL -> export.
- [ ] Keep existing unit tests for sketch parser output.
- [ ] Run `pnpm test:e2e` and `pnpm handoff:check`.

Acceptance:

- The human-simulated browser workflow protects the new confirmation step.
- Export, preview, and canvas still read from the same DSL.

## Risks

- True arbitrary component reconstruction can become too broad. MVP should support high-confidence semantic blocks first.
- A future real vision model needs privacy, file-size, and prompt-injection rules before any external API call.
- Confirmation UI must not become a professional layer panel.
