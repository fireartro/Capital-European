"use client";

import type { AnchorHTMLAttributes } from "react";
import { trackAnalyticsEvent } from "@/lib/analytics";

type TrackedAnchorProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  eventName: string;
  eventParameters?: Record<string, string | number | boolean | null | undefined>;
};

export function TrackedAnchor({
  eventName,
  eventParameters,
  onClick,
  ...props
}: TrackedAnchorProps) {
  return (
    <a
      {...props}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) trackAnalyticsEvent(eventName, eventParameters);
      }}
    />
  );
}
