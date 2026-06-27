# BlurHalo

Feathered backdrop-blur for modals, dialogs, and focused surfaces. The content stays sharp while the area *around* it receives a rounded, feathered blur that fades back into the page — the rest of the page stays crisp.

[**Live demo →**](https://doomedramen.github.io/BlurHalo)

> ![screenshot](screenshot.png)

## Quick start

### React

Drop a single file — zero dependencies beyond React.

> [`standalone/BlurHalo.tsx`](standalone/BlurHalo.tsx)

```tsx
import { BlurHalo, BlurHaloContent, BlurHaloTrigger } from "./BlurHalo";

<BlurHalo>
  <BlurHaloTrigger>
    <button>Open dialog</button>
  </BlurHaloTrigger>
  <BlurHaloContent spread={60} strength={0.5}>
    <h2>Publish changes?</h2>
    <p>The surrounding interface blurs softly around this dialog.</p>
  </BlurHaloContent>
</BlurHalo>
```

### HTML + CSS

Drop a single CSS file — no JavaScript, no build step.

> [`standalone/blurhalo.css`](standalone/blurhalo.css)

```html
<div class="blurhalo">
  <div class="blurhalo__halo" aria-hidden="true"></div>
  <div class="blurhalo__content"><!-- your dialog --></div>
</div>
```

```css
.blurhalo {
  --blur: 16px;   /* blur radius */
  --fade: 60px;   /* halo spread distance */
  --radius: 24px; /* corner radius */
  --tint: rgba(255,255,255,0.075);

  position: relative;
  isolation: isolate;
}

.blurhalo__halo {
  position: absolute;
  inset: calc(-1 * var(--fade));
  z-index: 0;
  pointer-events: none;
  background: var(--tint);
  backdrop-filter: blur(var(--blur));

  mask-image:
    linear-gradient(to right, transparent 0, #000 var(--fade), #000 calc(100% - var(--fade)), transparent 100%),
    linear-gradient(to bottom, transparent 0, #000 var(--fade), #000 calc(100% - var(--fade)), transparent 100%);
  mask-composite: intersect;
}

.blurhalo__content {
  position: relative;
  z-index: 1;
  border-radius: var(--radius);
}
```

## Props

### `BlurHaloContent`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `spread` | `number` | `80` | How far (px) the blurred halo extends beyond the dialog edge |
| `strength` | `number` | `0.5` | Blur intensity, 0 (none) → 1 (max). Multiplied against `maxBlur` |
| `maxBlur` | `number` | `32` | Pixel blur radius when `strength` is 1 |
| `showClose` | `boolean` | `true` | Show the built-in × close button |
| `tint` | `string` | — | Optional background color for the halo (e.g. `rgba(255,255,255,0.05)`) |
| `className` | `string` | — | Applied to the dialog body (border, bg, radius, padding) |
| `container` | `HTMLElement \| null` | `document.body` | Portal container element |

## How it works

1. **Negative inset** — a sibling `<div>` extends beyond the dialog using `inset: calc(-1 * var(--fade))`
2. **Crossed masks** — two `linear-gradient` masks composited with `mask-composite: intersect` create a fade from opaque (dialog edge) → transparent (halo rim)
3. **Content stays sharp** — the dialog body sits at `z-index: 1` above the halo (`z-index: 0`), so text and controls are never sampled by the backdrop filter

```
┌─────────────────────────────────────┐
│  page content (unblurred)           │
│    ┌──────────────────────────┐     │
│    │  halo (blur fades → 0)   │     │  ← mask fades outward
│    │  ┌──────────────────┐    │     │
│    │  │  dialog (sharp)  │    │     │  ← z-10, above halo
│    │  └──────────────────┘    │     │
│    └──────────────────────────┘     │
│                           blur 0%   │
└─────────────────────────────────────┘
```

## License

MIT
