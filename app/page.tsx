"use client";

import { useState } from "react";
import { Nav } from "@/components/Nav";
import { Preview } from "@/components/Preview";
import { CodeBlock } from "@/components/CodeBlock";
import { RevealSection } from "@/components/RevealSection";
import { BlurHaloSurface } from "@/components/BlurHaloSurface";
import {
  BlurHalo,
  BlurHaloContent,
} from "@/components/BlurHalo";

const htmlSnippet = `<div class="blurhalo">
  <div class="blurhalo__halo" aria-hidden="true"></div>
  <div class="blurhalo__content">
    <h2>Dialog title</h2>
    <p>The content stays sharp.</p>
  </div>
</div>`;

const cssSnippet = `.blurhalo {
  --blurhalo-blur: 16px;
  --blurhalo-fade: 60px;
  --blurhalo-radius: 24px;
  --blurhalo-tint: rgba(255,255,255,0.075);

  position: relative;
  isolation: isolate;
}

.blurhalo__halo {
  position: absolute;
  inset: calc(-1 * var(--blurhalo-fade));
  z-index: 0;
  pointer-events: none;
  background: var(--blurhalo-tint);
  backdrop-filter: blur(var(--blurhalo-blur));
  -webkit-backdrop-filter: blur(var(--blurhalo-blur));

  mask-image:
    linear-gradient(to right,
      transparent 0,
      #000 var(--blurhalo-fade),
      #000 calc(100% - var(--blurhalo-fade)),
      transparent 100%),
    linear-gradient(to bottom,
      transparent 0,
      #000 var(--blurhalo-fade),
      #000 calc(100% - var(--blurhalo-fade)),
      transparent 100%);
  mask-composite: intersect;
  -webkit-mask-image:
    linear-gradient(to right,
      transparent 0,
      #000 var(--blurhalo-fade),
      #000 calc(100% - var(--blurhalo-fade)),
      transparent 100%),
    linear-gradient(to bottom,
      transparent 0,
      #000 var(--blurhalo-fade),
      #000 calc(100% - var(--blurhalo-fade)),
      transparent 100%);
  -webkit-mask-composite: source-in;
}

.blurhalo__content {
  position: relative;
  z-index: 1;
  border-radius: var(--blurhalo-radius);
}`;

const jsxSnippet = `import { BlurHalo, BlurHaloContent, BlurHaloTrigger } from "@/components/BlurHalo"

export function Demo() {
  return (
    <BlurHalo>
      <BlurHaloTrigger>
        <button>Open dialog</button>
      </BlurHaloTrigger>
      <BlurHaloContent spread={60} strength={0.5}>
        <h2>Dialog title</h2>
        <p>The content stays sharp while the surroundings blur.</p>
        <div className="flex justify-end gap-2">
          <button>Cancel</button>
          <button>Confirm</button>
        </div>
      </BlurHaloContent>
    </BlurHalo>
  );
}`;

export default function Page() {
  const [liveOpen, setLiveOpen] = useState(false);

  return (
    <>
      {/* Full-page interactive BlurHalo triggered by the CTA */}
      <BlurHalo open={liveOpen} onOpenChange={setLiveOpen}>
        <BlurHaloContent spread={60} strength={0.5}>
          <h2 className="text-lg font-semibold leading-none tracking-tight">Try BlurHalo</h2>
          <p className="text-sm text-muted-foreground">
            This dialog uses the BlurHalo component. The halo fades out around the edge — the rest of the page stays sharp.
          </p>
          <p className="text-sm text-muted-foreground">
            The dialog body has <code className="rounded bg-black/[0.06] dark:bg-white/[0.06] px-1">bg-background</code> so it sits above the blurred layer.
            Tweak <code className="rounded bg-black/[0.06] dark:bg-white/[0.06] px-1">spread</code> and{" "}
            <code className="rounded bg-black/[0.06] dark:bg-white/[0.06] px-1">strength</code> via props to control the halo size and intensity.
          </p>
          <div className="flex justify-end">
            <button
              onClick={() => setLiveOpen(false)}
              className="inline-flex min-h-9 items-center rounded-lg border border-black/[0.08] dark:border-white/[0.08] bg-black/[0.04] dark:bg-white/[0.04] px-4 text-sm font-medium text-black dark:text-white transition hover:bg-black/[0.08] dark:hover:bg-white/[0.08]"
            >
              Close
            </button>
          </div>
        </BlurHaloContent>
      </BlurHalo>

      <main className="relative z-[1] mx-auto w-full max-w-[1200px] px-6 pb-24 pt-8">
        <BlurHaloSurface spread={40} strength={0.25} borderRadius="9999px" className="sticky top-4 z-50 mb-[72px]">
          <Nav />
        </BlurHaloSurface>

        {/* ── Hero ─────────────────────────────────── */}
        <section id="demo" className="mb-0 grid grid-cols-1 items-start gap-16 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-black/[0.10] dark:border-white/[0.10] bg-black/[0.03] dark:bg-white/[0.03] px-3 py-1.5 text-[13px] font-medium tracking-tight text-black/70 dark:text-white/70">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500 shadow-[0_0_14px_rgba(34,197,94,0.7)] animate-pulse" />
              Feathered backdrop blur for focused surfaces
            </p>
            <h1 className="max-w-[640px] text-[clamp(44px,6.5vw,76px)] font-bold leading-[0.94] -tracking-[0.065em]">
              <span className="gradient-text">Blur the edge,</span>
              <br />
              not the page.
            </h1>
            <p className="mt-5 max-w-[560px] text-[17px] leading-relaxed tracking-tight text-black/60 dark:text-white/55">
              BlurHalo is a single React component for modals, popovers, command menus, and dialogs. The
              content stays sharp while the area <em>around</em> it receives a rounded, feathered backdrop blur
              that fades naturally back into the page.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <button
                onClick={() => setLiveOpen(true)}
                className="inline-flex min-h-10 items-center gap-1.5 rounded-xl border bg-black dark:bg-white px-5 text-sm font-semibold text-white dark:text-black transition hover:-translate-y-px hover:bg-black/85 dark:hover:bg-[#f0f0f5] border-black/20 dark:border-white/[0.18] shadow-[0_12px_32px_rgba(0,0,0,0.15)] dark:shadow-[inset_0_0_0_1px_rgba(0,0,0,0.05),inset_0_1px_0_rgba(255,255,255,0.5),0_12px_32px_rgba(255,255,255,0.08)]"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
                Try it live
              </button>
              <a
                href="#code"
                className="inline-flex min-h-10 items-center gap-1.5 rounded-xl border border-black/[0.10] dark:border-white/[0.10] bg-black/[0.03] dark:bg-white/[0.03] px-5 text-sm font-medium text-black/90 dark:text-white/90 transition hover:bg-black/[0.06] dark:hover:bg-white/[0.06] hover:border-black/[0.14] dark:hover:border-white/[0.14]"
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
                className="inline-flex min-h-10 items-center gap-1.5 rounded-xl border border-black/[0.10] dark:border-white/[0.10] bg-black/[0.03] dark:bg-white/[0.03] px-5 text-sm font-medium text-black/90 dark:text-white/90 transition hover:bg-black/[0.06] dark:hover:bg-white/[0.06] hover:border-black/[0.14] dark:hover:border-white/[0.14]"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                GitHub
              </a>
            </div>
          </div>

          <Preview />
        </section>

        {/* ── API section ──────────────────────────── */}
        <RevealSection>
          <section id="api" className="mt-24">
            <h2 className="mb-2.5 text-[30px] font-semibold -tracking-[0.05em]">How it works</h2>
            <p className="mb-7 max-w-[680px] text-[15px] leading-relaxed text-black/60 dark:text-white/55">
              BlurHalo renders an independently-sized halo layer behind the dialog using negative inset.
              The halo extends beyond the content and uses a feathered mask so the blur fades outward.
              The dialog body sits above the halo so its content stays sharp.
            </p>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {[
                {
                  title: "1. The halo extends outward",
                  desc: "Using negative inset, a sibling div reaches beyond the dialog's edges to create the blur zone.",
                },
                {
                  title: "2. The mask feathers the blur",
                  desc: "Two crossed linear-gradient masks create a rectangular fade from opaque at the dialog edge to transparent at the halo rim.",
                },
                {
                  title: "3. The content stays sharp",
                  desc: "Stacked at a higher z-index, the dialog body sits above the halo so text and controls are never blurred.",
                },
              ].map((card) => (
                <div
                  key={card.title}
                  className="cursor-default rounded-[20px] border border-black/[0.06] dark:border-white/[0.06] bg-black/[0.03] dark:bg-white/[0.03] p-5 transition hover:-translate-y-0.5 hover:border-black/[0.10] dark:hover:border-white/[0.10] hover:bg-black/[0.05] dark:hover:bg-white/[0.05] hover:shadow-[0_12px_40px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_12px_40px_rgba(0,0,0,0.3)]"
                >
                  <strong className="mb-2 block text-[15px] -tracking-[0.02em]">{card.title}</strong>
                  <p className="text-[13px] leading-relaxed text-black/60 dark:text-white/55">{card.desc}</p>
                </div>
              ))}
            </div>
          </section>
        </RevealSection>

        {/* ── Code section ─────────────────────────── */}
        <RevealSection>
          <section id="code" className="mt-24">
            <h2 className="mb-2.5 text-[30px] font-semibold -tracking-[0.05em]">Get it</h2>
            <p className="mb-7 max-w-[680px] text-[15px] leading-relaxed text-black/60 dark:text-white/55">
              Two ways to use BlurHalo — the React component (one file, full interactivity) or plain HTML
              and CSS (zero dependencies, copy and paste).
            </p>

            <h3 className="mb-4 text-lg font-semibold -tracking-[0.03em]">React</h3>
            <p className="mb-3 text-[14px] leading-relaxed text-black/55 dark:text-white/50">
              <strong>1.</strong> Download{" "}
              <a
                href="https://github.com/doomedramen/blurhalo/blob/main/standalone/BlurHalo.tsx"
                target="_blank"
                rel="noopener"
                className="underline hover:text-black dark:hover:text-white"
              >
                standalone/BlurHalo.tsx
              </a>{" "}
              — a single file, no other dependencies.
            </p>
            <p className="mb-3 text-[14px] leading-relaxed text-black/55 dark:text-white/50">
              <strong>2.</strong> Use it:
            </p>
            <div className="mb-8">
              <CodeBlock code={jsxSnippet} lang="tsx" />
            </div>

            <h3 className="mb-4 text-lg font-semibold -tracking-[0.03em]">HTML + CSS</h3>
            <p className="mb-3 text-[14px] leading-relaxed text-black/55 dark:text-white/50">
              Zero build step — just copy and paste:
            </p>
            <div className="grid grid-cols-1 gap-3 lg:grid-cols-[0.75fr_1.25fr]">
              <CodeBlock code={htmlSnippet} lang="html" />
              <CodeBlock code={cssSnippet} lang="css" />
            </div>
            <p className="mt-3 text-[13px] leading-relaxed text-black/50 dark:text-white/35">
              Or grab the CSS file directly:{" "}
              <a
                href="https://github.com/doomedramen/blurhalo/blob/main/standalone/blurhalo.css"
                target="_blank"
                rel="noopener"
                className="underline hover:text-black dark:hover:text-white"
              >
                standalone/blurhalo.css
              </a>
            </p>
          </section>
        </RevealSection>

        {/* ── Footer ───────────────────────────────── */}
        <footer className="mt-[72px] flex items-center justify-between border-t border-black/[0.06] dark:border-white/[0.06] pt-7 text-[13px] text-black/35 dark:text-white/35">
          <span>BlurHalo — open-source UI pattern</span>
          <a href="https://github.com/doomedramen/blurhalo" target="_blank" rel="noopener" className="hover:text-black dark:hover:text-white">
            GitHub.com/doomedramen/blurhalo
          </a>
        </footer>
      </main>
    </>
  );
}
