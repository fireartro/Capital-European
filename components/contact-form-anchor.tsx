"use client";

import { ArrowRight } from "lucide-react";
import type { MouseEvent } from "react";

export function ContactFormAnchor() {
  const scrollToForm = (event: MouseEvent<HTMLAnchorElement>) => {
    const form = document.getElementById("formular-contact");
    if (!form) return;

    event.preventDefault();
    form.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.replaceState(null, "", "#formular-contact");
  };

  return (
    <a
      className="contact-primary-link"
      href="#formular-contact"
      onClick={scrollToForm}
      title="Completează formularul"
    >
      Completează formularul <ArrowRight aria-hidden="true" />
    </a>
  );
}
