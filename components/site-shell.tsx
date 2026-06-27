import { MessageCircle, Phone } from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getWhatsAppUrl, siteConfig } from "@/lib/site-config";

export function SiteShell({
  children,
  showFooter = true,
  showNavigation = true,
  showWhatsApp = true,
  navigationContext = "general"
}: Readonly<{
  children: React.ReactNode;
  showFooter?: boolean;
  showNavigation?: boolean;
  showWhatsApp?: boolean;
  navigationContext?: "funding" | "admin" | "general";
}>) {
  return (
    <div className={`app-layout ${showNavigation ? "" : "no-navigation"}`}>
      <a className="skip-link" href="#continut" aria-label="Sari direct la conținutul paginii" title="Sari la conținut">Sari la conținut</a>
      {showNavigation && <SiteHeader navigationContext={navigationContext} />}
      <main className="site-content" id="continut">
        {children}
        {showFooter && <SiteFooter />}
      </main>
      {showWhatsApp && siteConfig.phoneHref && (
        <a
          className="phone-float"
          href={`tel:${siteConfig.phoneHref}`}
          aria-label={`Sună ${siteConfig.name}`}
          title={`Sună ${siteConfig.name}`}
        >
          <Phone />
          <span className="phone-label"><small>Telefon</small><b>{siteConfig.phoneDisplay || "Contact"}</b></span>
        </a>
      )}
      {showWhatsApp && siteConfig.whatsappNumber && (
        <a
          className="whatsapp-float"
          href={getWhatsAppUrl()}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Discută cu ${siteConfig.name} pe WhatsApp`}
          title={`Discută cu ${siteConfig.name} pe WhatsApp`}
        >
          <span className="whatsapp-pulse" aria-hidden="true" />
          <MessageCircle />
          <span className="whatsapp-label"><small>Contact direct</small><b>Scrie-ne pe WhatsApp</b></span>
        </a>
      )}
    </div>
  );
}
