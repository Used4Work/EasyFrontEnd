# Reliability

EasyFrontEnd reliability depends on keeping preview, editing, scoring, and export aligned around the same DSL.

## Required Checks

- Validate sample DSL projects.
- Test mutation helpers.
- Test quality rules.
- Test exporter output ordering and key content.
- Test local persistence loading, saving, invalid data handling, and clearing.
- Run lint, typecheck, test, and build before marking work done.

## Continuous Integration

GitHub Actions runs the same quality gate on pushes and pull requests to `main`:

- `pnpm install --frozen-lockfile`
- `pnpm lint`
- `pnpm typecheck`
- `pnpm test`
- `pnpm build`

The repository owner should enable branch protection so the `Quality Gate / Lint, Typecheck, Test, Build` check is required before merging.
