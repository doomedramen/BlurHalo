"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

type Status = "idle" | "copied" | "error";

async function copyText(text: string) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }
  // Fallback for insecure contexts / older browsers.
  const ta = document.createElement("textarea");
  ta.value = text;
  ta.style.position = "fixed";
  ta.style.opacity = "0";
  document.body.appendChild(ta);
  ta.select();
  const ok = document.execCommand("copy");
  document.body.removeChild(ta);
  if (!ok) throw new Error("copy command rejected");
}

export function CopyButton({ code, className }: { code: string; className?: string }) {
  const [status, setStatus] = useState<Status>("idle");

  const handleCopy = async () => {
    try {
      await copyText(code);
      setStatus("copied");
    } catch {
      setStatus("error");
    }
    setTimeout(() => setStatus("idle"), 1800);
  };

  return (
    <button
      onClick={handleCopy}
      aria-label="Copy code"
      className={cn(
        "rounded-md border px-3 py-1 text-xs font-medium backdrop-blur-lg transition",
        status === "copied"
          ? "border-green-500/30 text-green-400"
          : status === "error"
            ? "border-red-500/30 text-red-400"
            : "border-black/10 dark:border-white/10 bg-black/5 dark:bg-black/60 text-black/55 dark:text-white/55 hover:bg-black/10 dark:hover:bg-white/10 hover:text-black dark:hover:text-white",
        className,
      )}
    >
      {status === "copied" ? "Copied!" : status === "error" ? "Failed" : "Copy"}
    </button>
  );
}
