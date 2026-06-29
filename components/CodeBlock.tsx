"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

export function CodeBlock({ code, lang }: { code: string; lang?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  };

  return (
    <div className="relative">
      {lang && (
        <span className="absolute left-4 top-3 z-10 rounded bg-black/[0.08] dark:bg-white/[0.06] px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-black/35 dark:text-white/35">
          {lang}
        </span>
      )}
      <button
        onClick={handleCopy}
        className={cn(
          "absolute right-3 top-3 z-10 rounded-md border px-3 py-1 text-xs font-medium backdrop-blur-lg transition",
          copied
            ? "border-green-500/30 text-green-400"
            : "border-black/10 dark:border-white/10 bg-black/5 dark:bg-black/60 text-black/55 dark:text-white/55 hover:bg-black/10 dark:hover:bg-white/10 hover:text-black dark:hover:text-white",
        )}
      >
        {copied ? "Copied!" : "Copy"}
      </button>
      <pre
        className={cn(
          "m-0 overflow-auto rounded-xl border p-5 text-[12.5px] leading-relaxed",
          "border-black/[0.08] dark:border-white/[0.06] bg-[#f5f5f8] dark:bg-[#040508]/80 text-black/75 dark:text-white/75",
          lang && "pt-10",
        )}
      >
        <code>{code}</code>
      </pre>
    </div>
  );
}
