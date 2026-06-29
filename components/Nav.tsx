"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

const links = [
  { href: "#demo", label: "Demo" },
  { href: "#api", label: "API" },
  { href: "#code", label: "Code" },
];

export function Nav() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <nav className="flex w-full items-center justify-between gap-5 rounded-full border border-black/[0.08] dark:border-white/[0.06] bg-white/70 dark:bg-[#030303]/70 px-5 py-3 backdrop-blur-2xl backdrop-saturate-200">
      <a
        href="#demo"
        className="inline-flex items-center gap-2.5 text-[15px] font-semibold tracking-tight text-foreground"
      >
        <span className="h-[26px] w-[26px] rounded-lg bg-gradient-to-br from-blue-500 to-violet-500 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.15),0_8px_24px_rgba(94,106,210,0.25)] [background-image:linear-gradient(135deg,#fff,rgba(255,255,255,0.4)),linear-gradient(180deg,#5e6ad2,#8b5cf6)]" />
        BlurHalo
      </a>
      <div className="flex items-center gap-1">
        {links.map(({ href, label }) => (
          <a
            key={href}
            href={href}
            className="rounded-full px-3.5 py-1.5 text-[13px] font-medium text-black/50 dark:text-white/55 transition hover:bg-black/5 dark:hover:bg-white/[0.06] hover:text-black dark:hover:text-white"
          >
            {label}
          </a>
        ))}
        {mounted && (
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="ml-1 rounded-full p-1.5 text-black/40 dark:text-white/40 transition hover:bg-black/5 dark:hover:bg-white/[0.06] hover:text-black dark:hover:text-white"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
              </svg>
            ) : (
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
              </svg>
            )}
          </button>
        )}
      </div>
    </nav>
  );
}
