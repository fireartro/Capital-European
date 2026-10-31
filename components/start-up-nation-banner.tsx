"use client";

import { ArrowRight, GraduationCap } from "lucide-react";
import { AnalyticsLink } from "@/components/analytics-link";
import { startUpNationPackageEvent, startUpNationPackageHref, startUpNationPackagePrice, startUpNationPrices } from "@/lib/start-up-nation";
import { trackAnalyticsEvent } from "@/lib/analytics";

export function StartUpNationBanner() {
  return (
    <aside className="sun-offer" aria-label="Pachet Start-Up Nation">
      <div className="sun-offer-inner">
        <GraduationCap className="sun-offer-icon" aria-hidden="true" />
        <div className="sun-offer-copy">
          <p><strong>Pachet Start-Up Nation</strong><span>Înscriere curs antreprenoriat + înființare firmă</span></p>
          <p className="sun-offer-breakdown">Asistență înscriere la curs: {startUpNationPrices.courseRegistration} lei + înființare firmă SUN: {startUpNationPrices.companyFormation} lei</p>
        </div>
        <div className="sun-offer-actions">
          <div className="sun-offer-price"><span>Pachet complet</span><strong>{startUpNationPackagePrice} <small>lei</small></strong></div>
        <AnalyticsLink
          className="sun-offer-link"
          href={startUpNationPackageHref}
          eventName="select_service"
          eventParameters={{ service: "pachet-start-up-nation", placement: "sitewide_banner" }}
          onClick={(event) => {
            if (event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || window.location.pathname !== "/contact") return;
            if (document.querySelector('.contact-form[aria-busy="true"]')) {
              event.preventDefault();
              document.getElementById("formular-contact")?.scrollIntoView({ block: "start", behavior: "auto" });
              return;
            }
            if (window.dispatchEvent(new Event(startUpNationPackageEvent, { cancelable: true }))) return;
            event.preventDefault();
            window.history.replaceState(null, "", startUpNationPackageHref);
            document.getElementById("formular-contact")?.scrollIntoView({ block: "start", behavior: "auto" });
            trackAnalyticsEvent("select_service", { service: "pachet-start-up-nation", placement: "sitewide_banner" });
          }}
        >
          Solicită pachetul <ArrowRight aria-hidden="true" />
        </AnalyticsLink>
        </div>
      </div>
    </aside>
  );
}
