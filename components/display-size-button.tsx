"use client";

import { ALargeSmall, RotateCcw, X } from "lucide-react";
import { useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import { displaySizes, getDisplaySize, getServerDisplaySize, setDisplaySize, subscribeDisplaySize } from "@/lib/display-size";

const labels = { default: "Confort", large: "Mare", xlarge: "Foarte mare" } as const;

function useDisplaySize() {
  return useSyncExternalStore(subscribeDisplaySize, getDisplaySize, getServerDisplaySize);
}

export function DisplaySizePreference() {
  const size = useDisplaySize();
  useEffect(() => {
    document.documentElement.dataset.displaySize = size;
  }, [size]);
  return null;
}

export function DisplaySizeButton({ className = "" }: { className?: string }) {
  const size = useDisplaySize();
  const id = useId();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className={`display-size-button ${className}`}
        title="Dimensiunea afișării"
        aria-label="Dimensiunea afișării"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => { dialogRef.current?.showModal(); setOpen(true); }}
      >
        <ALargeSmall aria-hidden="true" />
      </button>
      <dialog
        ref={dialogRef}
        id={id}
        className="display-size-dialog"
        aria-labelledby={`${id}-title`}
        onClose={() => { setOpen(false); triggerRef.current?.focus({ preventScroll: true }); }}
        onClick={(event) => {
          if (event.target !== event.currentTarget) return;
          const bounds = event.currentTarget.getBoundingClientRect();
          if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialogRef.current?.close();
        }}
      >
        <header>
          <h2 id={`${id}-title`}>Dimensiunea afișării</h2>
          <button type="button" className="display-size-button" aria-label="Închide dimensiunea afișării" title="Închide" onClick={() => dialogRef.current?.close()}><X aria-hidden="true" /></button>
        </header>
        <fieldset>
          <legend className="visually-hidden">Alege dimensiunea afișării</legend>
          {displaySizes.map((option) => (
            <label key={option}>
              <ALargeSmall aria-hidden="true" />
              <span>{labels[option]}</span>
              <input type="radio" name={`${id}-size`} value={option} checked={size === option} onChange={() => setDisplaySize(option)} />
            </label>
          ))}
        </fieldset>
        <button type="button" className="display-size-reset" title="Restabilește dimensiunea implicită" onClick={() => setDisplaySize("default")}><RotateCcw aria-hidden="true" /> Restabilește</button>
      </dialog>
    </>
  );
}
