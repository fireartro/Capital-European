"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { trackAnalyticsEvent } from "@/lib/analytics";

type AnalyticsLinkProps = ComponentProps<typeof Link> & {
  eventName: string;
  eventParameters?: Record<string, string | number | boolean | null | undefined>;
};

export function AnalyticsLink({
  eventName,
  eventParameters,
  onClick,
  ...props
}: AnalyticsLinkProps) {
  return (
    <Link
      {...props}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) trackAnalyticsEvent(eventName, eventParameters);
      }}
    />
  );
}
