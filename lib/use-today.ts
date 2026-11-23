"use client";

import { useSyncExternalStore } from "react";

const noop = () => () => {};

/**
 * Today's date (YYYY-MM-DD) in the visitor's browser, or null while prerendering.
 * Pages are built ahead of time, so anything date-based (Upcoming / Now badges)
 * is decided in the browser instead of freezing at build time.
 */
export function useToday(): string | null {
  return useSyncExternalStore(
    noop,
    () => new Date().toLocaleDateString("en-CA"),
    () => null,
  );
}
