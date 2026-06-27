"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";

const BlurHalo = DialogPrimitive.Root;
const BlurHaloTrigger = DialogPrimitive.Trigger;
const BlurHaloPortal = DialogPrimitive.Portal;
const BlurHaloClose = DialogPrimitive.Close;

const BlurHaloOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className,
    )}
    {...props}
  />
));
BlurHaloOverlay.displayName = "BlurHaloOverlay";

interface BlurHaloContentProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> {
  /** How far (in px) the blurred halo extends beyond the dialog edge. Default 80. */
  spread?: number;
  /** Blur intensity from 0 (none) to 1 (max). Multiplied against `maxBlur`. Default 0.5. */
  strength?: number;
  /** Maximum blur radius in px when `strength` is 1. Default 32. */
  maxBlur?: number;
  /** Show the built-in close button. Default true. */
  showClose?: boolean;
  /** Optional subtle background color for the halo (e.g. "rgba(255,255,255,0.05)"). Adds a tint/dim behind the blur. */
  tint?: string;
  /**
   * className applied to the dialog body (border, bg, radius, padding, etc.).
   * The halo is rendered as an independent sibling and is not affected by this.
   */
  className?: string;
  /**
   * DOM element to render the portal into. Useful for containing the dialog
   * within a specific parent (e.g. for a demo preview panel). Defaults to
   * `document.body`.
   */
  container?: HTMLElement | null;
}

const BlurHaloContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  BlurHaloContentProps
>(
  (
    {
      className,
      children,
      spread = 80,
      strength = 0.5,
      maxBlur = 32,
      showClose = true,
      tint,
      container,
      ...props
    },
    ref,
  ) => {
    const maskGradientH = `linear-gradient(to right, transparent 0%, #000 ${spread}px, #000 calc(100% - ${spread}px), transparent 100%)`;
    const maskGradientV = `linear-gradient(to bottom, transparent 0%, #000 ${spread}px, #000 calc(100% - ${spread}px), transparent 100%)`;

    const haloStyle: React.CSSProperties = {
      position: "absolute",
      inset: `-${spread}px`,
      pointerEvents: "none",
      background: tint,
      backdropFilter: `blur(${strength * maxBlur}px)`,
      WebkitBackdropFilter: `blur(${strength * maxBlur}px)`,
      maskImage: `${maskGradientH}, ${maskGradientV}`,
      WebkitMaskImage: `${maskGradientH}, ${maskGradientV}`,
      maskComposite: "intersect",
      WebkitMaskComposite: "source-in",
    };

    return (
      <BlurHaloPortal container={container}>
        <BlurHaloOverlay />
        <DialogPrimitive.Content
          ref={ref}
          className="fixed left-[50%] top-[50%] z-50 w-full max-w-lg translate-x-[-50%] translate-y-[-50%] duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
          {...props}
        >
          <div aria-hidden style={haloStyle} className="z-0" />
          <div
            className={cn(
              "relative z-10 grid gap-4 border bg-background p-6 shadow-lg sm:rounded-lg",
              className,
            )}
          >
            {children}
            {showClose && (
              <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </DialogPrimitive.Close>
            )}
          </div>
        </DialogPrimitive.Content>
      </BlurHaloPortal>
    );
  },
);
BlurHaloContent.displayName = "BlurHaloContent";

const BlurHaloHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("flex flex-col space-y-1.5 text-center sm:text-left", className)}
    {...props}
  />
);
BlurHaloHeader.displayName = "BlurHaloHeader";

const BlurHaloFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className,
    )}
    {...props}
  />
);
BlurHaloFooter.displayName = "BlurHaloFooter";

const BlurHaloTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn("text-lg font-semibold leading-none tracking-tight", className)}
    {...props}
  />
));
BlurHaloTitle.displayName = "BlurHaloTitle";

const BlurHaloDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
BlurHaloDescription.displayName = "BlurHaloDescription";

export {
  BlurHalo,
  BlurHaloPortal,
  BlurHaloOverlay,
  BlurHaloTrigger,
  BlurHaloClose,
  BlurHaloContent,
  BlurHaloHeader,
  BlurHaloFooter,
  BlurHaloTitle,
  BlurHaloDescription,
};
