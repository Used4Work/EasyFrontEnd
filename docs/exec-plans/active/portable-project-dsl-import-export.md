# Portable Project DSL Import/Export Plan

## Current Status

This is the active plan. The lossless agent handoff harness is complete and archived in `docs/exec-plans/completed/lossless-agent-handoff.md`.

The next product gap is cross-device transfer of the edited project itself. GitHub stores the app and docs, while browser localStorage stores the current editor project only on one browser. Users need a simple way to export and import the project DSL.

## Product Intent

Make the active EasyFrontEnd project portable without introducing accounts, cloud persistence, or a second project model.

The feature should support:

- Export current project DSL as a `.json` file.
- Import a valid EasyFrontEnd project JSON file.
- Validate imported DSL before replacing the active project.
- Continue using the same DSL for preview, edit, quality score, storage, and code export.

## Non-Goals

- Cloud sync.
- Multi-project dashboard.
- Collaboration.
- Importing arbitrary generated frontend code.
- Exposing raw schema complexity to beginner users.

## Phase 1: DSL Project File Contract

Tasks:

- [x] Add a project JSON file wrapper with format and version metadata.
- [x] Export current project into stable formatted JSON.
- [x] Import both wrapped project files and raw valid project DSL for recovery.
- [x] Validate imported project before accepting it.
- [x] Add unit tests for export, import, invalid JSON, invalid format, and raw DSL import.

Acceptance:

- Project files can be moved across devices.
- Invalid files fail with a clear reason.
- Tests protect the import/export contract.

## Phase 2: Editor UI

Tasks:

- [x] Add top-bar project JSON export action.
- [x] Add top-bar project JSON import action.
- [x] On valid import, replace the active DSL and select the Hero or first section.
- [x] On invalid import, keep the current project unchanged and show a status message.

Acceptance:

- User can export a `.json` project file from the editor.
- User can import the same file and recover the project.
- Preview, quality score, local persistence, and code export all reflect the imported DSL.

## Phase 3: Documentation Sync

Tasks:

- [x] Update handoff docs to mention project JSON transfer.
- [x] Update architecture, product spec, frontend guide, and project state.
- [x] Run full validation.

Validation results:

- `pnpm handoff:check` passed.

Acceptance:

- Docs describe what is now portable and what remains local.
- `pnpm handoff:check` passes.

## Risks

- Imported files may be from a future schema version.
- Browser file APIs can fail silently in some restricted environments.
- The UI must not imply this is cloud sync.

## Manual Operations Needed

- When switching devices and preserving an edited page, export the project JSON from the old browser and import it on the new browser.
- Commit the exported project JSON only if it is intended to become a shared sample or fixture.
