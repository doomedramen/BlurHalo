"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

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

export function RevealSection({ children }: { children: React.ReactNode }) {
  const { ref, visible } = useReveal();
  return (
    <div
      ref={ref}
      className={cn(
        "opacity-0 translate-y-6 transition-[opacity,transform] duration-600 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)]",
        visible && "opacity-100 translate-y-0",
      )}
    >
      {children}
    </div>
  );
}
