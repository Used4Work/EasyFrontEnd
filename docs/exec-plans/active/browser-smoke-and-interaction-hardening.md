# Browser Smoke and Interaction Hardening Plan

## Current Status

This is the active plan after completing Chinese customer UX and visible button feedback.

The product is usable locally, but the next Harness step is to make the browser interaction loop harder to regress. Unit tests cover DSL logic, quality scoring, persistence, project files, and exporters, but there is no browser smoke coverage for the customer path.

## Product Intent

Protect the core EasyFrontEnd loop:

中文新建项目 -> 生成页面草稿 -> 可视化编辑 -> 预览 -> 质量评分 -> 导出.

## Phase 1: Browser Smoke Harness

Tasks:

- [ ] Add Playwright configuration and a minimal smoke test.
- [ ] Cover `/` draft generation into `/editor`.
- [ ] Cover selecting a module and editing Hero text.
- [ ] Cover preview modal open/close.
- [ ] Cover export modal open and generated code visibility.

Acceptance:

- Browser smoke tests can run locally with a single documented command.
- Tests verify visible UI behavior, not only internal helpers.
- The tests do not require a real LLM or network service.

## Phase 2: Interaction Polish

Tasks:

- [ ] Add clearer labels or tooltips for module tree icon buttons.
- [ ] Make save/status messages less likely to be overwritten by auto-save.
- [ ] Add empty-state guidance when all modules are deleted.
- [ ] Add confirmation for destructive delete/reset actions if user data loss becomes likely.

Acceptance:

- Beginner users can understand what each module action does.
- Button feedback remains visible long enough to be noticed.
- The editor remains DSL-first.

## Phase 3: Documentation and Validation

Tasks:

- [ ] Update `docs/FRONTEND.md`, `docs/RELIABILITY.md`, and relevant product specs.
- [ ] Update `AGENTS.md` commands if a new browser test command is added.
- [ ] Run `pnpm handoff:check`.

Acceptance:

- Future agents can run the same checks from a fresh clone.
- Active plan and project state reflect the new browser smoke coverage.

## Risks

- Browser smoke tests can become flaky if they depend on timers instead of visible UI.
- Installing Playwright browser binaries may require extra setup on some machines.
- Interaction polish must not introduce a second source of page state outside the DSL.
