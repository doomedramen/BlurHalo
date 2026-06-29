"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";

/* ------------------------------------------------------------------ */
/*  cn helper                                                          */
/* ------------------------------------------------------------------ */

function cn(...inputs: (string | undefined | null | false)[]) {
  return inputs.filter(Boolean).join(" ");
}

/* ------------------------------------------------------------------ */
/*  Context                                                            */
/* ------------------------------------------------------------------ */

interface BlurHaloContextValue {
  open: boolean;
  setOpen: (v: boolean) => void;
}

const BlurHaloCtx = createContext<BlurHaloContextValue | null>(null);

function useBlurHalo() {
  const ctx = useContext(BlurHaloCtx);
  if (!ctx) throw new Error("BlurHalo sub-components must be used within <BlurHalo>");
  return ctx;
}

/* ------------------------------------------------------------------ */
/*  Root                                                               */
/* ------------------------------------------------------------------ */

export interface BlurHaloProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  defaultOpen?: boolean;
  children: ReactNode;
}

export function BlurHalo({
  open: controlledOpen,
  onOpenChange,
  defaultOpen = false,
  children,
}: BlurHaloProps) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;

  const setOpen = useCallback(
    (v: boolean) => {
      if (!isControlled) setInternalOpen(v);
      onOpenChange?.(v);
    },
    [isControlled, onOpenChange],
  );

  return <BlurHaloCtx.Provider value={{ open, setOpen }}>{children}</BlurHaloCtx.Provider>;
}

/* ------------------------------------------------------------------ */
/*  Trigger                                                            */
/* ------------------------------------------------------------------ */

export function BlurHaloTrigger({
  children,
  className,
  onClick,
  onKeyDown,
  ...props
}: {
  children: ReactNode;
  className?: string;
} & React.HTMLAttributes<HTMLElement>) {
  const { setOpen } = useBlurHalo();

  return (
    <span
      role="button"
      tabIndex={0}
      onClick={(e) => {
        onClick?.(e);
        setOpen(true);
      }}
      onKeyDown={(e) => {
        onKeyDown?.(e);
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setOpen(true);
        }
      }}
      className={cn("cursor-pointer", className)}
      {...props}
    >
      {children}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Content                                                            */
/* ------------------------------------------------------------------ */

export interface BlurHaloContentProps {
  /** How far (in px) the blurred halo extends beyond the dialog edge. Default 80. */
  spread?: number;
  /** Blur intensity from 0 (none) to 1 (max). Multiplied against `maxBlur`. Default 0.5. */
  strength?: number;
  /** Maximum blur radius in px when `strength` is 1. Default 32. */
  maxBlur?: number;
  /** Show the built-in × close button. Default true. */
  showClose?: boolean;
  /** Optional subtle background color for the halo (e.g. "rgba(255,255,255,0.05)"). */
  tint?: string;
  /** Accessible name for the dialog. Ignored when `labelledBy` is set. Default "Dialog". */
  label?: string;
  /** id of the element (e.g. a heading) that labels the dialog. Takes precedence over `label`. */
  labelledBy?: string;
  /**
   * className applied to the dialog body (border, bg, radius, padding, etc.).
   * The halo is rendered as an independent sibling and is not affected by this.
   */
  className?: string;
  /**
   * DOM element to render the portal into. Defaults to `document.body`.
   */
  container?: HTMLElement | null;
  /** Inline styles applied to the dialog wrapper (e.g. maxWidth). */
  style?: React.CSSProperties;
  children: ReactNode;
}

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * The dialog content — renders an overlay, a feathered backdrop-blur halo
 * around the dialog body, and the body itself. The halo extends `spread`
 * pixels beyond the body and fades from full blur at the dialog edge to
 * zero blur at the outer rim via crossed linear-gradient masks.
 */
export function BlurHaloContent({
  spread = 80,
  strength = 0.5,
  maxBlur = 32,
  showClose = true,
  tint,
  label = "Dialog",
  labelledBy,
  className,
  container,
  style,
  children,
}: BlurHaloContentProps) {
  const { open, setOpen } = useBlurHalo();
  const overlayRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  /* Only portal after mount so static / server rendering never touches `document`. */
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  /* Escape to close + Tab focus trap */
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      if (e.key !== "Tab") return;

      const node = dialogRef.current;
      if (!node) return;
      const focusable = Array.from(node.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
        (el) => el.offsetParent !== null,
      );

      if (focusable.length === 0) {
        e.preventDefault();
        node.focus();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      if (e.shiftKey && (active === first || !node.contains(active))) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && (active === last || !node.contains(active))) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, setOpen]);

  /* Move focus into the dialog on open, restore it to the trigger on close */
  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const node = dialogRef.current;
    const first = node?.querySelector<HTMLElement>(FOCUSABLE_SELECTOR);
    (first ?? node)?.focus();
    return () => previouslyFocused?.focus?.();
  }, [open]);

  /* Lock body scroll, compensating for the scrollbar to avoid layout shift */
  useEffect(() => {
    if (!open) return;
    const { body, documentElement } = document;
    const prevOverflow = body.style.overflow;
    const prevPaddingRight = body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - documentElement.clientWidth;

    body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      const currentPad = parseFloat(getComputedStyle(body).paddingRight) || 0;
      body.style.paddingRight = `${currentPad + scrollbarWidth}px`;
    }
    return () => {
      body.style.overflow = prevOverflow;
      body.style.paddingRight = prevPaddingRight;
    };
  }, [open]);

  if (!open || !mounted) return null;

  const blurPx = strength * maxBlur;

  const maskH = `linear-gradient(to right, transparent 0%, #000 ${spread}px, #000 calc(100% - ${spread}px), transparent 100%)`;
  const maskV = `linear-gradient(to bottom, transparent 0%, #000 ${spread}px, #000 calc(100% - ${spread}px), transparent 100%)`;

  const haloStyle: React.CSSProperties = {
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
  };

  const content = (
    <>
      {/* Overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-50"
        onClick={(e) => {
          if (e.target === overlayRef.current) setOpen(false);
        }}
      />

      {/* Dialog wrapper */}
      <div
        className="fixed left-[50%] top-[50%] z-50 w-full max-w-lg translate-x-[-50%] translate-y-[-50%]"
        style={style}
      >
        {/* Halo */}
        <div
          aria-hidden
          style={haloStyle}
          className="z-0 motion-safe:animate-in motion-safe:fade-in-0"
        />

        {/* Dialog body */}
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={labelledBy ? undefined : label}
          aria-labelledby={labelledBy}
          tabIndex={-1}
          className={cn(
            "relative z-10 grid gap-4 border bg-background p-6 shadow-lg outline-none sm:rounded-lg motion-safe:animate-in motion-safe:fade-in-0 motion-safe:zoom-in-95",
            className,
          )}
        >
          {children}
          {showClose && (
            <button
              onClick={() => setOpen(false)}
              className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              aria-label="Close"
            >
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
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </>
  );

  return createPortal(content, container ?? document.body);
}
