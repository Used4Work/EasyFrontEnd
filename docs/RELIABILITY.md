# Reliability

EasyFrontEnd reliability depends on keeping preview, editing, scoring, and export aligned around the same DSL.

## Required Checks

- Verify handoff context with `node scripts/verify-handoff.mjs`.
- Validate sample DSL projects.
- Test mutation helpers.
- Test quality rules.
- Test exporter output ordering and key content.
- Test local persistence loading, saving, invalid data handling, and clearing.
- Test project JSON export/import, unsupported versions, and invalid imported DSL.
- Test sketch parser output validates as DSL and does not persist uploaded image data.
- Test the browser-level human workflow with Playwright when editor, onboarding, persistence, or export behavior changes.
- Run lint, typecheck, test, and build before marking work done.

## Continuous Integration

GitHub Actions runs the same quality gate on pushes and pull requests to `main`:

- `pnpm install --frozen-lockfile`
- `pnpm lint`
- `pnpm typecheck`
- `pnpm test`
- `pnpm build`
- `node scripts/verify-handoff.mjs`
- `pnpm exec playwright install --with-deps chromium`
- `pnpm test:e2e`

Run `pnpm handoff:check` before switching devices or handing off to another agent.

The repository owner should enable branch protection so `Quality Gate / Lint, Typecheck, Test, Build` and `Quality Gate / Browser E2E` are required before merging.
