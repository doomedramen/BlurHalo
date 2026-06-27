"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface BlurHaloSurfaceProps {
  spread?: number;
  strength?: number;
  /** CSS border-radius applied to the halo mask. Default "0". Use "9999px" for pill shapes. */
  borderRadius?: string;
  children: ReactNode;
  className?: string;
}

export function BlurHaloSurface({
  spread = 40,
  strength = 0.25,
  borderRadius = "0",
  children,
  className,
}: BlurHaloSurfaceProps) {
  const blurPx = Math.round(strength * 32);

  const maskH = `linear-gradient(to right, transparent 0%, #000 ${spread}px, #000 calc(100% - ${spread}px), transparent 100%)`;
  const maskV = `linear-gradient(to bottom, transparent 0%, #000 ${spread}px, #000 calc(100% - ${spread}px), transparent 100%)`;

  return (
    <div className={cn("relative", className)}>
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: `-${spread}px`,
          pointerEvents: "none",
          borderRadius,
          backdropFilter: `blur(${blurPx}px)`,
          WebkitBackdropFilter: `blur(${blurPx}px)`,
          maskImage: `${maskH}, ${maskV}`,
          WebkitMaskImage: `${maskH}, ${maskV}`,
          maskComposite: "intersect",
          WebkitMaskComposite: "source-in",
        } as React.CSSProperties}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
