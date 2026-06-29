# Changelog

All notable changes to this project are documented here. The format is based on
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

### Added

- `label` and `labelledBy` props on `BlurHaloContent` for an accessible dialog name.
- Keyboard support on `BlurHaloTrigger` (`Enter` / `Space`) and a focus trap that
  restores focus to the trigger on close.
- `oxlint` + `oxfmt` (oxc) tooling with `lint`, `format`, `format:check`, and
  `typecheck` scripts; CI now runs lint and typecheck before building.
- `CONTRIBUTING.md`.

### Changed

- `components/BlurHalo.tsx` now re-exports `standalone/BlurHalo.tsx` so the demo
  site and the distributed file can no longer drift out of sync.
- The dialog is now announced as `role="dialog"` / `aria-modal="true"`, moves
  focus inside on open, and respects `prefers-reduced-motion`.
- Body scroll lock now compensates for scrollbar width to avoid layout shift.

### Fixed

- `BlurHaloTrigger` no longer drops its open handler when a consumer passes their
  own `onClick`.
- Dialog content is only portalled after mount, avoiding `document` access during
  static/server rendering.
- Removed a broken screenshot reference in the README and corrected an
  inconsistent GitHub URL in the demo.
