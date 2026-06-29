# Contributing to BlurHalo

Thanks for your interest! BlurHalo is a small, single-component project. A few notes to keep changes consistent.

## Setup

```bash
pnpm install
pnpm dev        # run the demo site at http://localhost:3000
```

## Single source of truth

The component implementation lives in **`standalone/BlurHalo.tsx`** — the zero-dependency file consumers copy into their own projects. The demo site imports it via `components/BlurHalo.tsx`, which is just a re-export. **Make component changes in `standalone/BlurHalo.tsx`**, never in `components/`, so the two never drift apart.

Keep `standalone/BlurHalo.tsx` dependency-free (only `react`/`react-dom`) so a single copy-paste keeps working. The same applies to the no-build `standalone/blurhalo.css` variant.

## Checks

Run these before opening a PR — they also run in CI:

```bash
pnpm lint         # oxlint
pnpm typecheck    # tsc --noEmit
pnpm format       # oxfmt (write); use `pnpm format:check` to verify only
pnpm build        # static export
```

This project uses the [oxc](https://oxc.rs) toolchain (`oxlint` + `oxfmt`) rather than ESLint/Prettier.

## Accessibility

BlurHalo ships an accessible dialog (focus trap, focus restore, `Escape` to close, `role="dialog"`, scroll lock). Please keep these intact and run through a keyboard pass when touching the dialog behaviour.
