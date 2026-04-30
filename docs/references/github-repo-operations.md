# GitHub Repository Operations

This file records manual GitHub setup that cannot be reliably enforced from local code.

## Recommended Repository Metadata

- Description: `AI visual frontend/UI designer with DSL-first rendering, beginner-friendly editing, quality scoring, and export.`
- Website: add deployment URL once preview hosting exists.
- Topics: `nextjs`, `typescript`, `tailwindcss`, `dsl`, `visual-editor`, `ai-tools`, `frontend`

## Branch Protection for `main`

Recommended settings:

- Require a pull request before merging.
- Require status checks to pass before merging.
- Select the `Quality Gate / Lint, Typecheck, Test, Build` check.
- Require branches to be up to date before merging.
- Block force pushes.
- Block deletions.

## Actions

Confirm GitHub Actions are enabled for the repository. The workflow in `.github/workflows/ci.yml` runs:

- `pnpm install --frozen-lockfile`
- `pnpm lint`
- `pnpm typecheck`
- `pnpm test`
- `pnpm build`

## Deployment

Preview deployment is not configured yet. When ready, connect the repository to Vercel or another hosting provider and keep environment variables out of source control.
