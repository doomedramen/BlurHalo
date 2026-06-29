"use client";

import { useState } from "react";

const presets = {
  subtle: { blur: 0.12, spread: 20 },
  default: { blur: 0.5, spread: 60 },
  heavy: { blur: 0.75, spread: 80 },
};

type PresetKey = keyof typeof presets;

export function Preview() {
  const [blur, setBlur] = useState(0.5);
  const [spread, setSpread] = useState(60);

  const applyPreset = (key: PresetKey) => {
    const p = presets[key];
    setBlur(p.blur);
    setSpread(p.spread);
  };

  interface SliderCtl {
    label: string;
    value: number;
    suffix: string;
    min: number;
    max: number;
    step?: number;
    set: (v: number) => void;
  }

  const sliders: SliderCtl[] = [
    { label: "Strength", value: blur, suffix: "", min: 0, max: 1, step: 0.01, set: setBlur },
    { label: "Spread", value: spread, suffix: "px", min: 0, max: 80, set: setSpread },
  ];

  return (
    <div>
      <div
        className="relative min-h-[620px] overflow-hidden rounded-[28px] border shadow-[inset_0_0_0_1px_rgba(0,0,0,0.03)] bg-white/60 dark:bg-[#08080c]/60 border-black/[0.06] dark:border-white/[0.06] dark:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.03)]"
        style={{ transform: "translateZ(0)" }}
      >
        <div className="absolute inset-0 bg-grid-sm-light dark:bg-grid-sm [mask-image:radial-gradient(circle_at_50%_50%,black,transparent_80%)]" />

        {/* macOS-style topbar */}
        <div className="relative flex items-center border-b border-black/[0.06] dark:border-white/[0.06] bg-black/[0.02] dark:bg-white/[0.015] px-4 py-2.5">
          <div className="flex gap-2">
            {["#ff5f56", "#ffbd2e", "#27ca40"].map((color) => (
              <span
                key={color}
                className="h-3 w-3 rounded-full"
                style={{ background: color, opacity: 0.85 }}
              />
            ))}
          </div>
        </div>

        {/* Background image */}
        <div
          className="absolute inset-0 top-[33px]"
          style={{
            backgroundImage: "url(bg.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        {/* Static demo dialog — visual only, no open/close logic */}
        <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
          <div className="relative pointer-events-auto" style={{ maxWidth: 280 }}>
            <div
              aria-hidden
              style={{
                position: "absolute",
                inset: `-${spread}px`,
                pointerEvents: "none" as const,
                backdropFilter: `blur(${blur * 32}px)`,
                WebkitBackdropFilter: `blur(${blur * 32}px)`,
                maskImage: `linear-gradient(to right, transparent 0%, #000 ${spread}px, #000 calc(100% - ${spread}px), transparent 100%), linear-gradient(to bottom, transparent 0%, #000 ${spread}px, #000 calc(100% - ${spread}px), transparent 100%)`,
                WebkitMaskImage: `linear-gradient(to right, transparent 0%, #000 ${spread}px, #000 calc(100% - ${spread}px), transparent 100%), linear-gradient(to bottom, transparent 0%, #000 ${spread}px, #000 calc(100% - ${spread}px), transparent 100%)`,
                maskComposite: "intersect" as const,
                WebkitMaskComposite: "source-in" as const,
              }}
              className="z-0"
            />
            <div className="relative z-10 rounded-lg border border-black/[0.12] dark:border-white/[0.12] bg-white dark:bg-[#0e0f16] shadow-[0_32px_100px_rgba(0,0,0,0.25)] dark:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05),inset_0_1px_0_rgba(255,255,255,0.06),0_32px_100px_rgba(0,0,0,0.5)] overflow-hidden">
              <div className="px-4 pb-3 pt-3">
                <button
                  className="absolute right-3 top-3 rounded-sm opacity-60 hover:opacity-100 transition-opacity text-black dark:text-white"
                  aria-label="Close"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
                <p className="mb-1.5 inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.06em] text-black/45 dark:text-white/45">
                  <span className="h-[4px] w-[4px] rounded-full bg-[#5e6ad2] shadow-[0_0_10px_rgba(94,106,210,0.7)]" />
                  Deploy
                </p>
                <h2 className="text-[15px] font-semibold leading-[1.2] -tracking-[0.03em] text-black dark:text-white pr-2">
                  Publish to production?
                </h2>
                <div className="mt-3 flex justify-end gap-2">
                  <button className="h-[30px] rounded-md border border-black/[0.08] dark:border-white/[0.08] bg-black/[0.04] dark:bg-white/[0.04] px-3 text-[12px] font-medium text-black dark:text-white transition hover:bg-black/[0.08] dark:hover:bg-white/[0.08]">
                    Cancel
                  </button>
                  <button className="h-[30px] rounded-md bg-black dark:bg-white px-3 text-[12px] font-semibold text-white dark:text-black transition hover:bg-black/80 dark:hover:bg-[#f0f0f5]">
                    Publish
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Image attribution */}
      <p className="mt-1.5 text-right text-[10px] text-black/25 dark:text-white/20">
        Photo by{" "}
        <a
          href="https://www.pexels.com/@peter-dyllong-2158803154/"
          target="_blank"
          rel="noopener"
          className="underline hover:text-black/40 dark:hover:text-white/35"
        >
          Peter Dyllong
        </a>{" "}
        on Pexels
      </p>

      {/* Controls */}
      <div className="mt-4 flex flex-wrap items-end gap-5 rounded-[20px] border border-black/[0.06] dark:border-white/[0.06] bg-black/[0.02] dark:bg-white/[0.02] px-5 py-4">
        {sliders.map((ctl) => (
          <div key={ctl.label} className="flex min-w-[100px] flex-1 flex-col gap-2">
            <label className="flex items-center justify-between text-[11px] font-medium uppercase tracking-[0.03em] text-black/55 dark:text-white/55">
              {ctl.label}
              <span className="rounded bg-black/[0.06] dark:bg-white/[0.06] px-2 py-0.5 text-xs font-semibold tracking-tight text-black dark:text-white tabular-nums">
                {ctl.suffix ? ctl.value + ctl.suffix : Math.round(ctl.value * 100) + "%"}
              </span>
            </label>
            <input
              type="range"
              min={ctl.min}
              max={ctl.max}
              step={ctl.step}
              value={ctl.value}
              onChange={(e) => ctl.set(Number(e.target.value))}
              className="range-slider h-[6px] w-full cursor-pointer appearance-none rounded-full bg-black/[0.08] dark:bg-white/[0.08]"
              style={{
                background: `linear-gradient(to right, #5e6ad2 ${((ctl.value - ctl.min) / (ctl.max - ctl.min)) * 100}%, rgba(0,0,0,0.08) 0%)`,
              }}
            />
          </div>
        ))}
        <div className="mx-1 w-px self-stretch bg-black/[0.06] dark:bg-white/[0.06]" />
        <div className="flex gap-1.5 pb-px">
          {(Object.keys(presets) as PresetKey[]).map((key) => (
            <button
              key={key}
              onClick={() => applyPreset(key)}
              className="h-[30px] rounded-full border border-black/[0.06] dark:border-white/[0.06] bg-transparent px-3.5 text-xs font-medium text-black/55 dark:text-white/55 transition hover:text-black dark:hover:text-white hover:border-black/[0.10] dark:hover:border-white/[0.10] hover:bg-black/[0.04] dark:hover:bg-white/[0.04] active:scale-[0.97]"
            >
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
