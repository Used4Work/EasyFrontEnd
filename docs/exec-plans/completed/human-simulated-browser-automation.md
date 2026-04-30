# Human-Simulated Browser Automation Plan

## Current Status

This is the active plan. Sketch Upload to DSL is complete and archived in `docs/exec-plans/completed/sketch-upload-to-dsl.md`.

The next harness step is to let the repository simulate core human workflows in a browser. This is not a replacement for product judgment, but it gives Codex and future agents a repeatable way to verify that the app can be operated like a user.

## Product Intent

Automate the editor-first loop:

打开 `/start` -> 上传草图 -> 进入编辑器 -> 编辑模块 -> 应用智能建议 -> 导出代码.

## Phase 1: Playwright Harness

Tasks:

- [x] Add Playwright test dependency and config.
- [x] Add a fixture sketch image.
- [x] Add a browser test that uploads a sketch and reaches the editor.
- [x] Add a browser test path for content editing, Smart Suggestions, and export.
- [x] Add `pnpm test:e2e`.

Acceptance:

- The test interacts with visible UI, not internal React state.
- The test uses the same browser localStorage and DSL flow as a user.
- The harness can run locally with one command after Playwright browsers are installed.

## Phase 2: Documentation and Validation

Tasks:

- [x] Update AGENTS, README, reliability docs, and CI config.
- [x] Run `pnpm test:e2e`.
- [x] Run `pnpm handoff:check`.

Acceptance:

- Future agents know when to run E2E versus the normal quality gate.
- CI can run E2E after installing Playwright browsers.

## Limits

- Automation can simulate clicks, typing, uploads, and assertions. It cannot make subjective design taste or business-strategy decisions.
- E2E should protect the core loop, not become brittle coverage for every CSS detail.
- Local WSL may need `sudo pnpm exec playwright install-deps chromium`; CI installs browser dependencies automatically.
