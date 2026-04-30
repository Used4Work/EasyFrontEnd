# Project State

Last updated: 2026-04-30

## Summary

EasyFrontEnd has a working MVP and a public GitHub repository. The project is set up as an agent-native repo with versioned product intent, architecture, execution plans, quality gates, and tests.

## Implemented

- Next.js App Router app with TypeScript, React, Tailwind CSS, ESLint, Prettier, and Vitest.
- DSL-first project model for landing pages.
- Sample landing-page DSL project.
- DSL validation and mutation helpers.
- DSL-driven renderer and editor canvas.
- Visual editor shell with module tree, inspector, device switcher, quality panel, and export modal.
- Mock AI adapter behind a replaceable interface.
- Deterministic quality scoring.
- HTML and React/Tailwind exporters.
- Local browser persistence for the active project DSL.
- Portable project JSON import/export for transferring edited DSL across devices.
- Customer-first start screen for creating or restoring a project before entering the editor.
- Chinese customer-facing start flow, editor labels, sample content, quality feedback, and export modal.
- Visible button feedback for preview, AI optimization, module add/copy/move/hide/delete, backup, restore, reset, and export.
- Editor-first home route; `/start` is now the auxiliary AI draft generator.
- Section-level drag reorder from both the page structure tree and canvas, backed by the DSL mutation layer.
- Inspector Smart Suggestions can apply deterministic local DSL patches for the selected module.
- `/start` supports hand-drawn sketch image upload through a mock sketch-to-DSL adapter.
- Playwright E2E harness simulates a human sketch upload, editor edit, Smart Suggestion, and export flow.
- Full product Playwright simulation covers guarded mistakes, AI draft creation, accessibility scanning, content/style editing, module controls, drag reorder, preview, export, backup, restore, and reset.
- GitHub Actions CI, issue templates, PR template, and repository operations notes.

## Current Active Plan

`docs/exec-plans/active/sketch-to-component-dsl-expansion.md`

## Current Known Limits

- AI is mocked; there is no real LLM adapter yet.
- Sketch parsing is mocked; there is no real multimodal vision parser yet.
- Cloud project persistence is not implemented; cross-device transfer uses project JSON files.
- Exported React/Tailwind is a stable simplified snippet, not a full Next.js project export.
- There is no hosted preview deployment yet.

## Validation

The required local and CI quality gate is:

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm exec playwright install chromium
pnpm test:e2e
```

`pnpm handoff:check` runs the context checks plus the full quality gate.
`pnpm test:e2e` runs the browser-level human workflow simulation.
On Ubuntu/WSL, Playwright may require one manual system dependency install: `sudo pnpm exec playwright install-deps chromium`.
