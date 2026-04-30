# EasyFrontEnd Handoff

This is the cold-start file for a new device, IDE, or AI agent. It exists so development can resume from GitHub without relying on chat history.

## Repository

- GitHub: `https://github.com/Used4Work/EasyFrontEnd`
- Default branch: `main`
- Package manager: `pnpm@10.33.2`
- Node target: Node 24
- Framework: Next.js App Router, TypeScript, React, Tailwind CSS

## Cold Start

```bash
git clone https://github.com/Used4Work/EasyFrontEnd.git
cd EasyFrontEnd
corepack enable
corepack prepare pnpm@10.33.2 --activate
pnpm install
pnpm handoff:check
pnpm dev
```

Open `http://localhost:3000`.

## Read These First

1. `AGENTS.md`
2. `ARCHITECTURE.md`
3. `docs/PROJECT_STATE.md`
4. `docs/PLANS.md`
5. Current active plan in `docs/exec-plans/active/`
6. Relevant product spec in `docs/product-specs/`

## Current Product State

EasyFrontEnd is a DSL-first AI visual frontend/UI designer. The current MVP supports:

- Mock AI guided draft generation.
- DSL-rendered landing page preview.
- Visual section selection and editing.
- Module ordering, hiding, duplication, deletion, and adding.
- Desktop and mobile preview.
- Deterministic quality score.
- HTML and React/Tailwind export.
- Local browser persistence for the active project DSL.

## Current Active Plan

The active execution plan is `docs/exec-plans/active/lossless-agent-handoff.md`.

Completed plans are archived in `docs/exec-plans/completed/`.

## Validation Contract

Before handing work to another device or agent, run:

```bash
pnpm handoff:check
```

This verifies required repo context and runs lint, typecheck, tests, and build.

## What GitHub Does Not Contain

- Local browser `localStorage` project state.
- Uncommitted local changes.
- `.env.local` or any secrets.
- Deployment provider configuration.
- Private GitHub repository settings that are only visible in the UI.

If any of those matter, record the decision in docs or move it into a versioned file before switching devices.

## Handoff Rule

A handoff is complete only when:

- Work is committed and pushed.
- GitHub Actions are green.
- Active plan and docs reflect the current state.
- `git status --short --branch` is clean locally.
