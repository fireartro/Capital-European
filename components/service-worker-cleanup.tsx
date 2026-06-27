"use client";

import { useEffect } from "react";

export function ServiceWorkerCleanup() {
  useEffect(() => {
    if (!("serviceWorker" in navigator) || !("caches" in window)) return;

    navigator.serviceWorker.getRegistrations()
      .then((registrations) => Promise.all(registrations.map((registration) => registration.unregister())))
      .catch(() => undefined);

    caches.keys()
      .then((keys) => Promise.all(
        keys
          .filter((key) => key.startsWith("capital-european-") || key.startsWith("probirou-"))
          .map((key) => caches.delete(key))
      ))
      .catch(() => undefined);
  }, []);

  return null;
}
