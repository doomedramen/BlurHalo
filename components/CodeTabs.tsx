"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { CopyButton } from "./CopyButton";

export interface CodeTab {
  label: string;
  lang: string;
  /** Pre-highlighted HTML, generated at build time by `highlightToHtml`. */
  html: string;
  /** Raw source, used for the copy button. */
  raw: string;
  /** Optional note rendered under the code (e.g. a download link). */
  note?: React.ReactNode;
}

export function CodeTabs({ tabs }: { tabs: CodeTab[] }) {
  const [active, setActive] = useState(0);
  const tab = tabs[active];

  return (
    <div className="overflow-hidden rounded-xl border border-black/[0.08] dark:border-white/[0.06] bg-[#f5f5f8] dark:bg-[#040508]/80">
      <div
        role="tablist"
        aria-label="Code examples"
        className="flex items-center gap-1 border-b border-black/[0.06] dark:border-white/[0.06] px-2 py-1.5"
      >
        {tabs.map((t, i) => (
          <button
            key={t.label}
            role="tab"
            aria-selected={i === active}
            onClick={() => setActive(i)}
            className={cn(
              "rounded-md px-3 py-1 text-xs font-medium transition",
              i === active
                ? "bg-black/[0.06] dark:bg-white/[0.08] text-black dark:text-white"
                : "text-black/45 dark:text-white/45 hover:text-black dark:hover:text-white",
            )}
          >
            {t.label}
          </button>
        ))}
        <CopyButton code={tab.raw} className="ml-auto" />
      </div>

      <div role="tabpanel">
        <div
          className="max-h-[440px] overflow-auto p-5 text-[12.5px] leading-relaxed [&_.shiki]:!bg-transparent [&_pre]:m-0"
          dangerouslySetInnerHTML={{ __html: tab.html }}
        />
        {tab.note && (
          <p className="border-t border-black/[0.06] dark:border-white/[0.06] px-5 py-3 text-[13px] leading-relaxed text-black/55 dark:text-white/45">
            {tab.note}
          </p>
        )}
      </div>
    </div>
  );
}
