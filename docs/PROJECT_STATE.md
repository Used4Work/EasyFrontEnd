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
- GitHub Actions CI, issue templates, PR template, and repository operations notes.

## Current Active Plan

`docs/exec-plans/active/lossless-agent-handoff.md`

## Current Known Limits

- AI is mocked; there is no real LLM adapter yet.
- Project persistence is local browser storage only.
- Exported React/Tailwind is a stable simplified snippet, not a full Next.js project export.
- There is no Playwright browser smoke test yet.
- There is no hosted preview deployment yet.

## Validation

The required local and CI quality gate is:

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

`pnpm handoff:check` runs the context checks plus the full quality gate.
