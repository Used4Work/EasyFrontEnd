# Actionable Smart Suggestions Plan

## Current Status

This is the active plan. The editor-first drag flow is complete and archived in `docs/exec-plans/completed/visual-editor-primary-drag-flow.md`.

The next step is to make AI/assistant behavior feel useful without making prompt the main workflow. The right inspector already has a Smart Suggestions tab, but it mostly displays text. It should offer safe one-click improvements for the selected module.

## Product Intent

Make the loop:

点选模块 -> 查看智能建议 -> 一键应用局部优化 -> DSL 更新 -> 画布/评分/导出同步.

## Phase 1: Actionable Suggestions

Tasks:

- [x] Add deterministic quick actions inside the inspector Smart Suggestions tab.
- [x] Support Hero CTA/title improvement.
- [x] Support Pricing recommended plan and CTA improvement.
- [x] Support CTA button improvement.
- [x] Support Social Proof fallback quote improvement.
- [x] Keep all actions as DSL patches through existing mutation callbacks.

Acceptance:

- Smart Suggestions has buttons that visibly change the selected section.
- No prompt is required for routine improvements.
- The active DSL remains the only source of truth.

## Phase 2: Documentation and Validation

Tasks:

- [x] Update visual editor and frontend docs.
- [x] Run `pnpm handoff:check`.

Acceptance:

- Future agents understand that Smart Suggestions are deterministic assistant actions in MVP.
- Full validation passes.

## Validation Result

`pnpm handoff:check` passed on 2026-04-30.

## Risks

- One-click actions can feel destructive if they remove content. MVP actions should be conservative and additive where possible.
- These actions are deterministic for now; future LLM actions must still return inspectable DSL patches.
