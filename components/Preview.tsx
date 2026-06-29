"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

const tintSwatches = [
  { label: "White",  value: "rgba(255,255,255,0.10)", swatch: "#ffffff" },
  { label: "Violet", value: "rgba(139,92,246,0.15)",  swatch: "#8b5cf6" },
  { label: "Amber",  value: "rgba(251,191,36,0.12)",  swatch: "#fbbf24" },
  { label: "Blue",   value: "rgba(59,130,246,0.12)",  swatch: "#3b82f6" },
  { label: "Rose",   value: "rgba(244,63,94,0.12)",   swatch: "#f43f5e" },
];

const presets = {
  subtle: { blur: 0.12, spread: 20 },
  default: { blur: 0.5, spread: 60 },
  heavy: { blur: 0.75, spread: 80 },
};

type PresetKey = keyof typeof presets;
type Mode = "halo" | "full";

/* A faux product UI that sits behind the dialog so the blur acts on real-looking
   page content — you can watch text near the dialog soften while the rest stays sharp. */
function DemoApp() {
  const navItems = ["Overview", "Projects", "Deployments", "Analytics", "Settings"];
  const rows = [
    { name: "marketing-site", env: "Production", status: "Ready", time: "2m ago" },
    { name: "api-gateway", env: "Production", status: "Ready", time: "14m ago" },
    { name: "docs", env: "Preview", status: "Building", time: "now" },
    { name: "design-system", env: "Preview", status: "Ready", time: "1h ago" },
    { name: "billing-worker", env: "Production", status: "Ready", time: "3h ago" },
    { name: "auth-service", env: "Production", status: "Ready", time: "5h ago" },
    { name: "image-proxy", env: "Preview", status: "Building", time: "6h ago" },
    { name: "search-indexer", env: "Production", status: "Ready", time: "8h ago" },
    { name: "webhooks", env: "Production", status: "Ready", time: "12h ago" },
    { name: "analytics-edge", env: "Preview", status: "Ready", time: "1d ago" },
    { name: "cron-runner", env: "Production", status: "Ready", time: "1d ago" },
    { name: "email-worker", env: "Production", status: "Ready", time: "2d ago" },
    { name: "cdn-purge", env: "Preview", status: "Ready", time: "2d ago" },
    { name: "log-shipper", env: "Production", status: "Ready", time: "3d ago" },
  ];

  return (
    <div className="flex h-full w-full select-none text-black/80 dark:text-white/75">
      {/* Sidebar */}
      <aside className="hidden w-[136px] shrink-0 flex-col gap-4 border-r border-black/[0.06] bg-black/[0.015] p-3 dark:border-white/[0.06] dark:bg-white/[0.015] sm:flex">
        <div className="flex items-center gap-1.5">
          <span className="h-4 w-4 rounded-md bg-gradient-to-br from-blue-500 to-violet-500" />
          <span className="text-[11px] font-semibold">Acme</span>
        </div>
        <nav className="flex flex-col gap-0.5">
          {navItems.map((item, i) => (
            <span
              key={item}
              className={cn(
                "rounded-md px-2 py-1 text-[10.5px]",
                i === 1
                  ? "bg-black/[0.06] font-medium text-black dark:bg-white/[0.08] dark:text-white"
                  : "text-black/45 dark:text-white/40",
              )}
            >
              {item}
            </span>
          ))}
        </nav>
        <div className="mt-auto flex items-center gap-2 rounded-md bg-black/[0.03] p-1.5 dark:bg-white/[0.03]">
          <span className="h-5 w-5 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500" />
          <span className="text-[10px] text-black/50 dark:text-white/45">Jane Doe</span>
        </div>
      </aside>

      {/* Main */}
      <div className="flex min-w-0 flex-1 flex-col gap-3 p-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-[15px] font-semibold tracking-tight">Projects</h3>
            <p className="text-[10.5px] text-black/45 dark:text-white/40">
              Manage and deploy your applications
            </p>
          </div>
          <span className="rounded-md bg-black px-2.5 py-1 text-[10.5px] font-medium text-white dark:bg-white dark:text-black">
            New project
          </span>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: "Deployments", value: "1,284", delta: "+12%" },
            { label: "Avg. build", value: "38s", delta: "-4%" },
            { label: "Bandwidth", value: "92 GB", delta: "+8%" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-lg border border-black/[0.06] bg-black/[0.02] p-2.5 dark:border-white/[0.06] dark:bg-white/[0.02]"
            >
              <p className="text-[9.5px] uppercase tracking-wide text-black/40 dark:text-white/35">
                {stat.label}
              </p>
              <p className="mt-0.5 text-[16px] font-semibold tracking-tight">{stat.value}</p>
              <p className="text-[9.5px] text-emerald-500">{stat.delta}</p>
            </div>
          ))}
        </div>

        {/* Table — stretches to fill the window so content always sits behind the dialog */}
        <div className="min-h-0 flex-1 overflow-hidden rounded-lg border border-black/[0.06] dark:border-white/[0.06]">
          <div className="flex items-center gap-3 border-b border-black/[0.06] bg-black/[0.02] px-3 py-1.5 text-[9.5px] font-medium uppercase tracking-wide text-black/40 dark:border-white/[0.06] dark:bg-white/[0.02] dark:text-white/35">
            <span className="truncate">Project</span>
            <span className="flex-1" />
            <span className="w-20">Environment</span>
            <span className="w-16">Status</span>
            <span className="w-12 text-right">Updated</span>
          </div>
          {rows.map((row) => (
            <div
              key={row.name}
              className="flex items-center gap-3 border-b border-black/[0.04] px-3 py-2 text-[10.5px] last:border-0 dark:border-white/[0.04]"
            >
              <span className="truncate font-medium">{row.name}</span>
              <span className="flex-1" />
              <span className="w-20 text-black/45 dark:text-white/40">{row.env}</span>
              <span className="w-16">
                <span
                  className={cn(
                    "inline-flex items-center gap-1",
                    row.status === "Ready" ? "text-emerald-500" : "text-amber-500",
                  )}
                >
                  <span
                    className={cn(
                      "h-1.5 w-1.5 rounded-full",
                      row.status === "Ready" ? "bg-emerald-500" : "bg-amber-500",
                    )}
                  />
                  {row.status}
                </span>
              </span>
              <span className="w-12 text-right text-black/40 dark:text-white/35">{row.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Preview() {
  const [blur, setBlur] = useState(0.5);
  const [spread, setSpread] = useState(60);
  const [mode, setMode] = useState<Mode>("halo");
  const [tint, setTint] = useState<string | undefined>(undefined);

  const applyPreset = (key: PresetKey) => {
    const p = presets[key];
    setBlur(p.blur);
    setSpread(p.spread);
  };

  const blurPx = blur * 32;
  const maskH = `linear-gradient(to right, transparent 0%, #000 ${spread}px, #000 calc(100% - ${spread}px), transparent 100%)`;
  const maskV = `linear-gradient(to bottom, transparent 0%, #000 ${spread}px, #000 calc(100% - ${spread}px), transparent 100%)`;

  interface SliderCtl {
    label: string;
    value: number;
    suffix: string;
    min: number;
    max: number;
    step?: number;
    set: (v: number) => void;
    disabled?: boolean;
  }

  const sliders: SliderCtl[] = [
    { label: "Strength", value: blur, suffix: "", min: 0, max: 1, step: 0.01, set: setBlur },
    {
      label: "Spread",
      value: spread,
      suffix: "px",
      min: 0,
      max: 80,
      set: setSpread,
      disabled: mode === "full",
    },
  ];

  return (
    <div>
      <div
        className="relative min-h-[620px] overflow-hidden rounded-[28px] border shadow-[inset_0_0_0_1px_rgba(0,0,0,0.03)] bg-white/60 dark:bg-[#08080c]/60 border-black/[0.06] dark:border-white/[0.06] dark:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.03)]"
        style={{ transform: "translateZ(0)" }}
      >
        {/* macOS-style topbar */}
        <div className="relative z-20 flex items-center border-b border-black/[0.06] dark:border-white/[0.06] bg-black/[0.02] dark:bg-white/[0.015] px-4 py-2.5">
          <div className="flex gap-2">
            {["#ff5f56", "#ffbd2e", "#27ca40"].map((color) => (
              <span
                key={color}
                className="h-3 w-3 rounded-full"
                style={{ background: color, opacity: 0.85 }}
              />
            ))}
          </div>
          <span className="mx-auto rounded-md bg-black/[0.03] px-3 py-0.5 text-[10px] text-black/35 dark:bg-white/[0.04] dark:text-white/30">
            app.acme.com
          </span>
        </div>

        {/* Faux page content (gets blurred) */}
        <div className="absolute inset-0 top-[41px] overflow-hidden">
          <DemoApp />
        </div>

        {/* Full-page blur layer (the "before") */}
        {mode === "full" && (
          <div
            aria-hidden
            className="absolute inset-0 top-[41px] z-[5]"
            style={{
              backdropFilter: `blur(${blurPx}px)`,
              WebkitBackdropFilter: `blur(${blurPx}px)`,
              background: "rgba(0,0,0,0.04)",
            }}
          />
        )}

        {/* Dialog + halo */}
        <div className="absolute inset-0 top-[41px] z-10 flex items-center justify-center pointer-events-none">
          <div className="relative pointer-events-auto" style={{ maxWidth: 280 }}>
            {mode === "halo" && (
              <div
                aria-hidden
                className="z-0"
                style={{
                  position: "absolute",
                  inset: `-${spread}px`,
                  pointerEvents: "none",
                  background: tint,
                  backdropFilter: `blur(${blurPx}px)`,
                  WebkitBackdropFilter: `blur(${blurPx}px)`,
                  maskImage: `${maskH}, ${maskV}`,
                  WebkitMaskImage: `${maskH}, ${maskV}`,
                  maskComposite: "intersect",
                  WebkitMaskComposite: "source-in",
                }}
              />
            )}
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

      {/* Controls */}
      <div className="mt-4 flex flex-col gap-4 rounded-[20px] border border-black/[0.06] dark:border-white/[0.06] bg-black/[0.02] dark:bg-white/[0.02] px-5 py-4">
        {/* Before / after toggle */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="text-[11px] font-medium uppercase tracking-[0.03em] text-black/55 dark:text-white/55">
            Compare
          </span>
          <div className="inline-flex rounded-full border border-black/[0.06] bg-black/[0.03] p-0.5 dark:border-white/[0.06] dark:bg-white/[0.03]">
            {(
              [
                ["halo", "BlurHalo"],
                ["full", "Full-page blur"],
              ] as [Mode, string][]
            ).map(([key, labelText]) => (
              <button
                key={key}
                onClick={() => setMode(key)}
                aria-pressed={mode === key}
                className={cn(
                  "rounded-full px-3.5 py-1 text-xs font-medium transition",
                  mode === key
                    ? "bg-white text-black shadow-sm dark:bg-white/90 dark:text-black"
                    : "text-black/50 hover:text-black dark:text-white/50 dark:hover:text-white",
                )}
              >
                {labelText}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-end gap-5">
          {sliders.map((ctl) => (
            <div
              key={ctl.label}
              className={cn(
                "flex min-w-[100px] flex-1 flex-col gap-2 transition-opacity",
                ctl.disabled && "pointer-events-none opacity-40",
              )}
            >
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
                disabled={ctl.disabled}
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

          {/* Tint */}
          <div
            className={cn(
              "flex flex-wrap items-center gap-3 transition-opacity",
              mode === "full" && "pointer-events-none opacity-40",
            )}
          >
            <span className="text-[11px] font-medium uppercase tracking-[0.03em] text-black/55 dark:text-white/55">
              Tint
            </span>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setTint(undefined)}
                className={cn(
                  "h-[22px] rounded-full border px-2.5 text-[10px] font-medium transition",
                  tint === undefined
                    ? "border-black/25 dark:border-white/25 text-black dark:text-white bg-black/[0.06] dark:bg-white/[0.06]"
                    : "border-black/[0.08] dark:border-white/[0.08] text-black/40 dark:text-white/40 hover:text-black dark:hover:text-white",
                )}
              >
                None
              </button>
              {tintSwatches.map((t) => (
                <button
                  key={t.label}
                  title={t.label}
                  onClick={() => setTint(t.value)}
                  className={cn(
                    "h-[22px] w-[22px] rounded-full transition",
                    tint === t.value
                      ? "ring-2 ring-black/50 dark:ring-white/50 ring-offset-1 scale-110"
                      : "opacity-70 hover:opacity-100 hover:scale-105",
                  )}
                  style={{ background: t.swatch }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
