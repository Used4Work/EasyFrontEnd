# Chinese Customer UX and Button Feedback Plan

## Current Status

This is the active plan. The customer-first project start flow is complete and archived in `docs/exec-plans/completed/customer-first-project-start.md`.

Implementation status: complete. Code, docs, and tests have been updated for Chinese customer UX and visible button feedback.

## Product Intent

Make EasyFrontEnd feel like a Chinese customer-facing UI design product:

中文新建项目 -> 生成中文页面草稿 -> 可视化编辑 -> 明确预览/优化/备份/导出反馈.

## Phase 1: Chinese Primary UX

Tasks:

- [x] Translate the new project flow into Chinese.
- [x] Translate editor top bar, module tree, inspector tabs, quality panel, and export modal.
- [x] Generate Chinese sample landing-page content for the three starter scenarios.
- [x] Keep technical JSON wording out of the main customer workflow.

Acceptance:

- A Chinese-speaking customer can understand the core flow without reading English.
- Backup/restore is presented as project backup, not raw JSON.

## Phase 2: Button Feedback and Real Actions

Tasks:

- [x] Make Preview open an obvious preview modal instead of silently switching desktop mode.
- [x] Make AI Optimize apply a visible deterministic copy improvement when possible.
- [x] Add clear status messages for backup, restore, reset, export copy, and import failures.
- [x] Keep all actions DSL-based.

Acceptance:

- Top-bar buttons visibly change UI state or show a clear status.
- AI Optimize does not pretend to call a real LLM.
- Preview, editor, quality score, persistence, and export still read from the same DSL.

## Phase 3: Documentation and Validation

Tasks:

- [x] Update product specs, frontend guide, project state, and handoff docs.
- [x] Update tests for Chinese generated content and scenario defaults.
- [x] Run `pnpm handoff:check`.

Acceptance:

- Docs reflect Chinese customer UX.
- Full validation passes.

## Risks

- Translating labels without improving action feedback would still feel broken.
- Browser download and file picker actions can look quiet if status text is missed.
- Over-translating internal contracts could make code harder for future agents; code identifiers should stay English.

## Validation Result

`pnpm handoff:check` passed on 2026-04-30.
