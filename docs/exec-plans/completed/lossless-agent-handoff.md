# Lossless Agent Handoff Plan

## Current Status

This is the active harness plan. The product MVP, GitHub quality gate, and local browser persistence work are complete and archived in `docs/exec-plans/completed/`.

The goal of this plan is to make a fresh clone from GitHub enough for a new device, IDE, or AI agent to resume development without needing prior chat context.

## Definition of Lossless Handoff

Lossless handoff means a new contributor can recover:

- Product intent and non-goals.
- Architecture boundaries.
- Current implemented behavior.
- Active execution plan and next tasks.
- Validation commands and CI behavior.
- Manual operations that cannot be encoded in the repo.

It does not mean GitHub stores local browser state, uncommitted work, API keys, or private deployment settings.

## Phase 1: Repository Context Capsule

Tasks:

- [x] Add root-level `HANDOFF.md` for cold-start onboarding.
- [x] Add a context map that points agents to the right files in the right order.
- [x] Update `AGENTS.md` with a cold-start protocol.
- [x] Update `README.md` with clone and handoff verification commands.

Acceptance:

- A new agent can start from `AGENTS.md` and `HANDOFF.md`.
- The first files to read are explicit.
- Manual non-repo state is clearly called out.

## Phase 2: Reproducible Dev Harness

Tasks:

- [x] Pin Node expectation in repo metadata.
- [x] Add an environment example file.
- [x] Add `harness:check` and `handoff:check` scripts.
- [x] Add a handoff verification script that checks required docs, active plan count, and package scripts.

Acceptance:

- `pnpm handoff:check` proves the repo is ready for another agent.
- Missing context files fail fast.
- The command includes the same validation chain as CI.

## Phase 3: Documentation Sync

Tasks:

- [x] Update plans, reliability, security, and tech-debt docs.
- [x] Run full validation.
- [x] Commit and push the handoff harness.

Validation results:

- `node scripts/verify-handoff.mjs` passed.
- `pnpm handoff:check` passed.

Acceptance:

- GitHub contains all updated handoff context.
- Local and CI validation pass.

## Risks

- Next.js can rewrite `next-env.d.ts` depending on dev/build mode.
- Agents can still skip docs unless the cold-start protocol is explicit.
- Browser localStorage is local-only and cannot be recovered from GitHub.

## Manual Operations Needed

- Commit and push before switching devices.
- Confirm GitHub Actions pass after every push.
- Never rely on chat history as the only record of a decision.
- Store secrets in the deployment provider or local `.env.local`, not in GitHub.
