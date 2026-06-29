"use client";

/*
 * The implementation lives in `standalone/BlurHalo.tsx` — the single, zero-dependency
 * file consumers copy into their own projects. This module just re-exports it so the
 * demo site and the distributed file never drift out of sync.
 */
export {
  BlurHalo,
  BlurHaloTrigger,
  BlurHaloContent,
  type BlurHaloProps,
  type BlurHaloContentProps,
} from "@/standalone/BlurHalo";
