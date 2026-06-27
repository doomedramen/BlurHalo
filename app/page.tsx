"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { BlurHalo, BlurHaloContent } from "@/components/BlurHalo";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Slider presets                                                     */
/* ------------------------------------------------------------------ */

const presets = {
  subtle: { blur: 6, spread: 20, radius: 16 },
  default: { blur: 16, spread: 60, radius: 24 },
  heavy: { blur: 24, spread: 80, radius: 32 },
};

type PresetKey = keyof typeof presets;

/* ------------------------------------------------------------------ */
/*  Helper: scroll-reveal hook                                         */
/* ------------------------------------------------------------------ */

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

/* ------------------------------------------------------------------ */
/*  Code-block with copy button                                        */
/* ------------------------------------------------------------------ */

function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  };

  return (
    <div className="relative">
      <button
        onClick={handleCopy}
        className={cn(
          "absolute right-3 top-3 z-10 rounded-md border px-3 py-1 text-xs font-medium backdrop-blur-lg transition",
          copied
            ? "border-green-500/30 text-green-400"
            : "border-white/10 bg-black/60 text-white/55 hover:bg-white/10 hover:text-white",
        )}
      >
        {copied ? "Copied!" : "Copy"}
      </button>
      <pre className="m-0 overflow-auto rounded-xl border border-white/[0.06] bg-[#040508]/80 p-5 text-[12.5px] leading-relaxed text-white/75">
        <code>{code}</code>
      </pre>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main page                                                          */
/* ------------------------------------------------------------------ */

export default function Page() {
  const [blur, setBlur] = useState(16);
  const [spread, setSpread] = useState(60);
  const [radius, setRadius] = useState(24);
  const [container, setContainer] = useState<HTMLElement | null>(null);
  const previewRef = useCallback((node: HTMLDivElement | null) => {
    if (node) setContainer(node);
  }, []);

  const applyPreset = (key: PresetKey) => {
    const p = presets[key];
    setBlur(p.blur);
    setSpread(p.spread);
    setRadius(p.radius);
  };

  /* Code snippets (kept in sync with sliders via static values) */
  const snippetSize = spread * 2 + 10;
  const snippetFade = spread;

  const htmlSnippet = `<div class="blurhalo">
  <div class="blurhalo__content dialog">
    <h2>Dialog title</h2>
    <p>The content stays sharp.</p>
  </div>
</div>`;

  const cssSnippet = `.blurhalo {
  --blurhalo-size:  ${snippetSize}px;
  --blurhalo-fade:  ${snippetFade}px;
  --blurhalo-blur:  ${blur}px;
  --blurhalo-radius: ${radius}px;
  --blurhalo-tint: rgba(255,255,255,0.075);

  position: relative;
  display: grid;
  place-items: center;
  padding: var(--blurhalo-size);
  isolation: isolate;
}

.blurhalo::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  border-radius: calc(var(--blurhalo-radius) + var(--blurhalo-size));
  background: var(--blurhalo-tint);
  backdrop-filter: blur(var(--blurhalo-blur)) saturate(1.35);

  mask-image:
    linear-gradient(to right,
      transparent 0,
      black var(--blurhalo-fade),
      black calc(100% - var(--blurhalo-fade)),
      transparent 100%),
    linear-gradient(to bottom,
      transparent 0,
      black var(--blurhalo-fade),
      black calc(100% - var(--blurhalo-fade)),
      transparent 100%);
  mask-composite: intersect;
}

.blurhalo__content {
  position: relative;
  z-index: 1;
  border-radius: var(--blurhalo-radius);
}`;

  return (
    <main className="relative z-[1] mx-auto w-full max-w-[1200px] px-6 pb-24 pt-8">
      {/* ── Nav ─────────────────────────────────── */}
      <nav className="sticky top-4 z-50 mb-[72px] flex items-center justify-between gap-5 rounded-full border border-white/[0.06] bg-[#030303]/70 px-5 py-3 backdrop-blur-2xl backdrop-saturate-200 shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_8px_32px_rgba(0,0,0,0.3)]">
        <a href="#" className="inline-flex items-center gap-2.5 text-[15px] font-semibold tracking-tight text-white/90">
          <span className="h-[26px] w-[26px] rounded-lg bg-gradient-to-br from-blue-500 to-violet-500 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.15),0_8px_24px_rgba(94,106,210,0.25)] [background-image:linear-gradient(135deg,#fff,rgba(255,255,255,0.4)),linear-gradient(180deg,#5e6ad2,#8b5cf6)]" />
          BlurHalo
        </a>
        <div className="flex items-center gap-1">
          {["#demo", "#api", "#code"].map((href) => (
            <a
              key={href}
              href={href}
              className="rounded-full px-3.5 py-1.5 text-[13px] font-medium text-white/55 transition hover:bg-white/[0.06] hover:text-white"
            >
              {href.slice(1).charAt(0).toUpperCase() + href.slice(2)}
            </a>
          ))}
        </div>
      </nav>

      {/* ── Hero ─────────────────────────────────── */}
      <section id="demo" className="mb-0 grid grid-cols-1 items-start gap-16 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/[0.10] bg-white/[0.03] px-3 py-1.5 text-[13px] font-medium tracking-tight text-white/[0.68]">
            <span className="h-1.5 w-1.5 rounded-full bg-green-500 shadow-[0_0_14px_rgba(34,197,94,0.7)] animate-pulse" />
            Feathered backdrop blur for focused surfaces
          </p>
          <h1 className="max-w-[640px] text-[clamp(44px,6.5vw,76px)] font-bold leading-[0.94] -tracking-[0.065em]">
            <span className="gradient-text">Blur the edge,</span>
            <br />
            not the page.
          </h1>
          <p className="mt-5 max-w-[560px] text-[17px] leading-relaxed tracking-tight text-white/55">
            BlurHalo is a single React component for modals, popovers, command menus, and dialogs. The
            content stays sharp while the area <em>around</em> it receives a rounded, feathered backdrop blur
            that fades naturally back into the page.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href="#code"
              className="inline-flex min-h-10 items-center gap-1.5 rounded-xl border border-white/[0.18] bg-white px-5 text-sm font-semibold text-black shadow-[inset_0_0_0_1px_rgba(0,0,0,0.05),inset_0_1px_0_rgba(255,255,255,0.5),0_12px_32px_rgba(255,255,255,0.08)] transition hover:-translate-y-px hover:bg-[#f0f0f5] hover:shadow-[inset_0_0_0_1px_rgba(0,0,0,0.05),inset_0_1px_0_rgba(255,255,255,0.5),0_18px_40px_rgba(255,255,255,0.12)]"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <rect x="9" y="9" width="13" height="13" rx="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
              Copy the snippet
            </a>
            <a
              href="https://github.com/doomedramen/blurhalo"
              target="_blank"
              rel="noopener"
              className="inline-flex min-h-10 items-center gap-1.5 rounded-xl border border-white/[0.10] bg-white/[0.03] px-5 text-sm font-medium text-white/90 transition hover:bg-white/[0.06] hover:border-white/[0.14]"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              GitHub
            </a>
          </div>
        </div>

        {/* Preview panel */}
        <div>
          <div
            ref={previewRef}
            className="relative min-h-[580px] overflow-hidden rounded-[28px] border border-white/[0.06] bg-[#08080c]/60 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.03)]"
            style={{ transform: "translateZ(0)" }}
          >
            {/* Grid pattern */}
            <div className="absolute inset-0 bg-grid-sm [mask-image:radial-gradient(circle_at_50%_50%,black,transparent_80%)]" />

            {/* Fake topbar */}
            <div className="relative flex items-center justify-between gap-4 border-b border-white/[0.06] bg-white/[0.015] px-[18px] py-3">
              <div className="flex gap-1.5">
                {["#ff5f56", "#ffbd2e", "#27ca40"].map((color) => (
                  <span key={color} className="h-[9px] w-[9px] rounded-full opacity-40" style={{ background: color }} />
                ))}
              </div>
              <div className="h-6 flex-1 max-w-[200px] rounded-md border border-white/[0.05] bg-white/[0.04]" />
              <div className="flex gap-0.5 rounded-full bg-white/[0.04] p-[3px]">
                {["Issues", "Board", "Backlog"].map((tab, i) => (
                  <span
                    key={tab}
                    className={cn(
                      "rounded-full px-3 py-[5px] text-[11px] font-medium",
                      i === 1 ? "bg-white/[0.08] text-white/75" : "text-white/35",
                    )}
                  >
                    {tab}
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <span className="h-4 w-4 rounded bg-white/[0.08]" />
                <span className="h-4 w-4 rounded bg-white/[0.08]" />
                <span className="h-[22px] w-[22px] rounded-full bg-gradient-to-br from-[#5e6ad2] to-[#8b5cf6] opacity-70" />
              </div>
            </div>

            {/* Fake body */}
            <div className="relative grid grid-cols-[150px_1fr] gap-4 px-[18px] py-4 h-[calc(100%-46px)] overflow-hidden max-[640px]:grid-cols-1">
              <div className="flex flex-col gap-0.5 max-[640px]:hidden">
                <span className="px-1 pb-1.5 pt-2.5 text-[9px] font-semibold uppercase tracking-[0.08em] text-white/20">Teams</span>
                {["#5e6ad2", "#8b5cf6", "#f59e0b"].map((color, i) => (
                  <div key={color} className={cn("flex h-7 items-center gap-2 rounded-md px-1.5", i === 0 && "bg-white/[0.05]")}>
                    <span className="h-3.5 w-3.5 shrink-0 rounded" style={{ background: color, opacity: 0.5 }} />
                    <span className="h-2 rounded-[3px] bg-white/[0.06]" style={{ width: 68 - i * 8 }} />
                  </div>
                ))}
                <span className="px-1 pb-1.5 pt-2.5 text-[9px] font-semibold uppercase tracking-[0.08em] text-white/20">Views</span>
                {["#22c55e", "#ef4444", "#14b8a6"].map((color, i) => (
                  <div key={color} className="flex h-7 items-center gap-2 rounded-md px-1.5">
                    <span className="h-3.5 w-3.5 shrink-0 rounded" style={{ background: color, opacity: 0.5 }} />
                    <span className="h-2 rounded-[3px] bg-white/[0.06]" style={{ width: 56 - i * 6 }} />
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-2 overflow-y-hidden">
                {[
                  { priority: "urgent", c: "#f59e0b", titleW: "72%", labels: ["l1", "l2"], id: "142", avatars: ["a1", "a3"] },
                  { priority: "high", c: "#ef4444", titleW: "58%", labels: ["l3"], id: "141", avatars: ["a2"] },
                  { priority: "medium", c: "#5e6ad2", titleW: "85%", labels: ["l4", "l1"], id: "140", avatars: ["a4", "a1"] },
                  { priority: "low", c: "rgba(255,255,255,0.3)", titleW: "65%", labels: ["l2"], id: "139", avatars: ["a3"] },
                  { priority: "medium", c: "#5e6ad2", titleW: "78%", labels: ["l1", "l4", "l3"], id: "138", avatars: [] },
                ].map((row, i) => (
                  <div key={i} className="flex items-start gap-3 rounded-xl border border-white/[0.05] bg-white/[0.02] px-3.5 py-3">
                    <span
                      className="mt-[3px] h-2 w-2 shrink-0 rounded-full"
                      style={{ background: row.c, boxShadow: `0 0 8px ${row.c}` }}
                    />
                    <div className="min-w-0 flex-1">
                      <div className="mb-2 h-[9px] rounded" style={{ width: row.titleW, background: "rgba(255,255,255,0.10)" }} />
                      <div className="flex items-center gap-2">
                        {row.labels.map((l, j) => {
                          const lmap: Record<string, { bg: string; w: number }> = {
                            l1: { bg: "rgba(94,106,210,0.15)", w: 42 },
                            l2: { bg: "rgba(34,197,94,0.15)", w: 38 },
                            l3: { bg: "rgba(245,158,11,0.15)", w: 48 },
                            l4: { bg: "rgba(139,92,246,0.15)", w: 34 },
                          };
                          const li = lmap[l];
                          return (
                            <span
                              key={j}
                              className="inline-flex h-4 items-center rounded px-2 text-[9px] font-medium text-white/60"
                              style={{ background: li.bg, width: li.w }}
                            />
                          );
                        })}
                        {row.avatars.map((a, j) => {
                          const amap: Record<string, string> = {
                            a1: "linear-gradient(135deg,#5e6ad2,#8b5cf6)",
                            a2: "linear-gradient(135deg,#f59e0b,#ef4444)",
                            a3: "linear-gradient(135deg,#22c55e,#14b8a6)",
                            a4: "linear-gradient(135deg,#ec4899,#8b5cf6)",
                          };
                          return (
                            <span
                              key={j}
                              className="h-4 w-4 shrink-0 rounded-full"
                              style={{ background: amap[a] }}
                            />
                          );
                        })}
                      </div>
                    </div>
                    <span className="mt-px shrink-0 text-[10px] font-medium text-white/15">#{row.id}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* BlurHalo dialog (always open inside the preview) */}
            {container && (
              <BlurHalo open modal={false}>
                <BlurHaloContent
                  spread={spread}
                  strength={blur}
                  showClose={false}
                  container={container}
                  className="rounded-[24px] border-white/[0.12] bg-[#0e0f16] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05),inset_0_1px_0_rgba(255,255,255,0.06),0_32px_100px_rgba(0,0,0,0.5)] overflow-hidden"
                  style={{ borderRadius: radius }}
                >
                  <div className="border-b border-white/[0.07]">
                    <div className="px-5 pb-4 pt-5">
                      <p className="mb-2.5 inline-flex items-center gap-[7px] text-[11px] font-semibold uppercase tracking-[0.06em] text-white/50">
                        <span className="h-[5px] w-[5px] rounded-full bg-[#5e6ad2] shadow-[0_0_14px_rgba(94,106,210,0.7)]" />
                        System dialog
                      </p>
                      <h2 className="text-xl font-semibold leading-[1.15] -tracking-[0.04em]">Publish deployment?</h2>
                      <p className="mt-2 text-[13px] leading-relaxed text-white/55">
                        The surrounding interface is softly defocused around the dialog,
                        but the rest of the page remains readable and undimmed.
                      </p>
                    </div>
                  </div>
                  <div className="px-5 pb-5 pt-4">
                    <p className="text-[13px] leading-relaxed text-white/55">
                      This action will deploy the current build to production. Make sure
                      all tests have passed and the changes have been reviewed.
                    </p>
                    <div className="mt-4 flex justify-end gap-2">
                      <button className="h-[34px] rounded-lg border border-white/[0.08] bg-white/[0.04] px-3.5 text-[13px] font-medium text-white transition hover:bg-white/[0.08] hover:border-white/[0.14]">
                        Cancel
                      </button>
                      <button className="h-[34px] rounded-lg bg-white px-3.5 text-[13px] font-semibold text-black shadow-[0_4px_16px_rgba(255,255,255,0.08)] transition hover:bg-[#f0f0f5]">
                        Publish
                      </button>
                    </div>
                  </div>
                </BlurHaloContent>
              </BlurHalo>
            )}
          </div>

          {/* Controls */}
          <div className="mt-4 flex flex-wrap items-end gap-5 rounded-[20px] border border-white/[0.06] bg-white/[0.02] px-5 py-4">
            {[
              { label: "Strength", value: blur, suffix: "px", min: 0, max: 48, set: setBlur },
              { label: "Spread", value: spread, suffix: "px", min: 0, max: 80, set: setSpread },
              { label: "Radius", value: radius, suffix: "px", min: 4, max: 48, set: setRadius },
            ].map((ctl) => (
              <div key={ctl.label} className="flex min-w-[100px] flex-1 flex-col gap-2">
                <label className="flex items-center justify-between text-[11px] font-medium uppercase tracking-[0.03em] text-white/55">
                  {ctl.label}
                  <span className="rounded bg-white/[0.06] px-2 py-0.5 text-xs font-semibold tracking-tight text-white tabular-nums">
                    {ctl.value}
                    {ctl.suffix}
                  </span>
                </label>
                <input
                  type="range"
                  min={ctl.min}
                  max={ctl.max}
                  value={ctl.value}
                  onChange={(e) => ctl.set(Number(e.target.value))}
                  className="h-[6px] w-full cursor-pointer appearance-none rounded-full bg-white/[0.08] [&::-webkit-slider-thumb]:h-[18px] [&::-webkit-slider-thumb]:w-[18px] [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-[0_2px_8px_rgba(0,0,0,0.3)]"
                  style={{
                    background: `linear-gradient(to right, #5e6ad2 ${((ctl.value - ctl.min) / (ctl.max - ctl.min)) * 100}%, rgba(255,255,255,0.08) 0%)`,
                  }}
                />
              </div>
            ))}
            <div className="mx-1 w-px self-stretch bg-white/[0.06]" />
            <div className="flex gap-1.5 pb-px">
              {(Object.keys(presets) as PresetKey[]).map((key) => (
                <button
                  key={key}
                  onClick={() => applyPreset(key)}
                  className="h-[30px] rounded-full border border-white/[0.06] bg-transparent px-3.5 text-xs font-medium text-white/55 transition hover:text-white hover:border-white/[0.10] hover:bg-white/[0.04] active:scale-[0.97]"
                >
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── API section ──────────────────────────── */}
      <RevealSection>
        <section id="api" className="mt-24">
          <h2 className="mb-2.5 text-[30px] font-semibold -tracking-[0.05em]">Recommended structure</h2>
          <p className="mb-7 max-w-[680px] text-[15px] leading-relaxed text-white/55">
            Use a padded wrapper for the halo and a separate child for the content.
            The wrapper owns the backdrop blur. The content is positioned above it.
            This avoids the fragile 8-piece border approach while still supporting
            rounded corners through one shared radius variable.
          </p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {[
              { title: "1. The wrapper creates space", desc: ".blurhalo uses padding to reserve the feathered blur area around the dialog." },
              { title: "2. The pseudo-element blurs", desc: ".blurhalo::before applies backdrop-filter, tint, radius, and feathered masking." },
              { title: "3. The content stays sharp", desc: ".blurhalo__content sits above the blur layer, so text, controls, and icons are not blurred." },
            ].map((card) => (
              <div
                key={card.title}
                className="cursor-default rounded-[20px] border border-white/[0.06] bg-white/[0.03] p-5 transition hover:-translate-y-0.5 hover:border-white/[0.10] hover:bg-white/[0.05] hover:shadow-[0_12px_40px_rgba(0,0,0,0.3)]"
              >
                <strong className="mb-2 block text-[15px] -tracking-[0.02em]">{card.title}</strong>
                <p className="text-[13px] leading-relaxed text-white/55">{card.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </RevealSection>

      {/* ── Code section ─────────────────────────── */}
      <RevealSection>
        <section id="code" className="mt-24">
          <h2 className="mb-2.5 text-[30px] font-semibold -tracking-[0.05em]">Copy/paste implementation</h2>
          <p className="mb-7 max-w-[680px] text-[15px] leading-relaxed text-white/55">
            This is the minimal version of the pattern. The component is just HTML and CSS.
            Tune the custom properties to change halo size, blur strength, radius, and tint.
          </p>
          <div className="grid grid-cols-1 gap-3 lg:grid-cols-[0.75fr_1.25fr]">
            <CodeBlock code={htmlSnippet} />
            <CodeBlock code={cssSnippet} />
          </div>
        </section>
      </RevealSection>

      {/* ── Footer ───────────────────────────────── */}
      <footer className="mt-[72px] flex items-center justify-between border-t border-white/[0.06] pt-7 text-[13px] text-white/35">
        <span>BlurHalo — open-source UI pattern</span>
        <a href="https://github.com/doomedramen/blurhalo" target="_blank" rel="noopener" className="hover:text-white">
          GitHub.com/doomedramen/blurhalo
        </a>
      </footer>
    </main>
  );
}

/* ------------------------------------------------------------------ */
/*  Scroll-reveal wrapper                                              */
/* ------------------------------------------------------------------ */

function RevealSection({ children }: { children: React.ReactNode }) {
  const { ref, visible } = useReveal();
  return (
    <div
      ref={ref}
      className={cn(
        "opacity-0 translate-y-6 transition-[opacity,transform] duration-600 ease-[cubic-bezier(0.16,1,0.3,1)]",
        visible && "opacity-100 translate-y-0",
      )}
    >
      {children}
    </div>
  );
}
