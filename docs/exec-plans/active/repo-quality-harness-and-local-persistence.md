# Repo Quality Harness and Local Persistence Plan

## Current Status

This is the active post-MVP harness plan. The first MVP vertical slice is complete and archived in `docs/exec-plans/completed/mvp-vertical-slice.md`.

The next step is to make the project safer to evolve in public GitHub and make the editor retain user work across browser refreshes.

## Product Intent

EasyFrontEnd should feel reliable before it becomes larger. The product loop now exists, so the next investment is a feedback harness around it:

Code change -> CI validation -> local editing persistence -> documented manual release/repo steps.

## Phase 1: GitHub Collaboration Harness

Tasks:

- [x] Add GitHub Actions CI for install, lint, typecheck, test, and build.
- [x] Add PR template with DSL, docs, and validation checklist.
- [x] Add issue templates for bugs and feature requests.
- [x] Document recommended manual GitHub repository settings.

Acceptance:

- A pull request has a clear review checklist.
- CI runs the same validation commands used locally.
- Manual GitHub setup steps are written down.

## Phase 2: Local Project Persistence

Tasks:

- [x] Add a browser storage adapter for active project DSL.
- [x] Validate loaded DSL before using it.
- [x] Autosave project edits after DSL mutations.
- [x] Add reset-to-sample control for recovery.
- [x] Add unit tests for persistence behavior.

Acceptance:

- Refreshing `/editor` restores the last valid project DSL.
- Invalid saved data is ignored rather than rendered.
- Reset clears local saved DSL and returns to the sample project.
- Tests cover save, load, invalid JSON, invalid DSL, and clear.

## Phase 3: Documentation Sync

Tasks:

- [x] Update architecture, frontend, reliability, and product docs.
- [x] Update tech debt tracker.
- [x] Run full validation.

Validation results:

- `pnpm lint` passed.
- `pnpm typecheck` passed.
- `pnpm test` passed.
- `pnpm build` passed.

Acceptance:

- Docs match implemented behavior.
- `pnpm lint`, `pnpm typecheck`, `pnpm test`, and `pnpm build` pass.

## Risks

- Browser storage can silently fail in private browsing or restricted environments.
- Autosave must not become a second page model.
- CI can fail if GitHub Actions permissions or branch protection are misconfigured.

## Manual Operations Needed

The implementation can add files and push code, but the repository owner should manually configure GitHub repository settings:

- Add repository description and topics.
- Enable branch protection for `main`.
- Require the CI workflow before merging pull requests.
- Confirm GitHub Actions are enabled for the repository.
- Optionally connect Vercel or another hosting provider for preview deployments.
