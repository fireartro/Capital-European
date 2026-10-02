export const DISPLAY_SIZE_KEY = "ce_display_size_v1";
export const displaySizes = ["default", "large", "xlarge"] as const;
export type DisplaySize = typeof displaySizes[number];

let currentSize: DisplaySize = "default";
let initialized = false;
const listeners = new Set<() => void>();

function isDisplaySize(value: unknown): value is DisplaySize {
  return displaySizes.some((size) => size === value);
}

export function getDisplaySize(): DisplaySize {
  if (typeof window === "undefined") return "default";
  if (!initialized) {
    initialized = true;
    try {
      const saved = window.localStorage.getItem(DISPLAY_SIZE_KEY);
      if (isDisplaySize(saved)) currentSize = saved;
    } catch {
      // The choice still works in memory when browser storage is unavailable.
    }
  }
  return currentSize;
}

export function getServerDisplaySize(): DisplaySize {
  return "default";
}

export function setDisplaySize(size: DisplaySize) {
  if (!isDisplaySize(size)) return;
  initialized = true;
  currentSize = size;
  try {
    if (size === "default") window.localStorage.removeItem(DISPLAY_SIZE_KEY);
    else window.localStorage.setItem(DISPLAY_SIZE_KEY, size);
  } catch {
    // Do not discard the current choice because persistence was denied.
  }
  listeners.forEach((listener) => listener());
}

export function subscribeDisplaySize(listener: () => void) {
  listeners.add(listener);
  const onStorage = (event: StorageEvent) => {
    try {
      if (event.storageArea !== window.localStorage) return;
    } catch {
      return;
    }
    if (event.key !== DISPLAY_SIZE_KEY && event.key !== null) return;
    currentSize = isDisplaySize(event.newValue) ? event.newValue : "default";
    initialized = true;
    listeners.forEach((subscriber) => subscriber());
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}
