"use client";

import { BlurHalo, BlurHaloContent, BlurHaloTrigger } from "@/components/BlurHalo";

/**
 * The hero "Try it live" button and the dialog it opens. Kept as its own client
 * component so the landing page itself can stay a server component (which lets it
 * syntax-highlight code at build time).
 */
export function TryItLive() {
  return (
    <BlurHalo>
      <BlurHaloTrigger className="inline-flex min-h-10 items-center gap-1.5 rounded-xl border bg-black dark:bg-white px-5 text-sm font-semibold text-white dark:text-black transition hover:-translate-y-px hover:bg-black/85 dark:hover:bg-[#f0f0f5] border-black/20 dark:border-white/[0.18] shadow-[0_12px_32px_rgba(0,0,0,0.15)] dark:shadow-[inset_0_0_0_1px_rgba(0,0,0,0.05),inset_0_1px_0_rgba(255,255,255,0.5),0_12px_32px_rgba(255,255,255,0.08)]">
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        >
          <polygon points="5 3 19 12 5 21 5 3" />
        </svg>
        Try it live
      </BlurHaloTrigger>

      <BlurHaloContent spread={60} strength={0.5} labelledBy="blurhalo-demo-title">
        <h2 id="blurhalo-demo-title" className="text-lg font-semibold leading-none tracking-tight">
          Try BlurHalo
        </h2>
        <p className="text-sm text-muted-foreground">
          This dialog uses the BlurHalo component. The halo fades out around the edge — the rest of
          the page stays sharp.
        </p>
        <p className="text-sm text-muted-foreground">
          The dialog body has{" "}
          <code className="rounded bg-black/[0.06] dark:bg-white/[0.06] px-1">bg-background</code>{" "}
          so it sits above the blurred layer. Tweak{" "}
          <code className="rounded bg-black/[0.06] dark:bg-white/[0.06] px-1">spread</code> and{" "}
          <code className="rounded bg-black/[0.06] dark:bg-white/[0.06] px-1">strength</code> via
          props to control the halo size and intensity.
        </p>
      </BlurHaloContent>
    </BlurHalo>
  );
}
