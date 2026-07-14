import { PhoneCall } from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { GoogleReviewsSection } from "@/components/google-reviews-section";
import { SiteHeader } from "@/components/site-header";
import { getWhatsAppUrl, siteConfig } from "@/lib/site-config";
import { WhatsAppIcon } from "@/components/whatsapp-icon";
import { TrackedAnchor } from "@/components/tracked-anchor";

export function SiteShell({
  children,
  showFooter = true,
  showReviews = true,
  showNavigation = true,
  showWhatsApp = true,
  navigationContext = "general"
}: Readonly<{
  children: React.ReactNode;
  showFooter?: boolean;
  showReviews?: boolean;
  showNavigation?: boolean;
  showWhatsApp?: boolean;
  navigationContext?: "funding" | "admin" | "general";
}>) {
  const showQuickContact = showWhatsApp && (siteConfig.phoneHref || siteConfig.whatsappNumber);

  return (
    <div className={`app-layout ${showNavigation ? "" : "no-navigation"}`}>
      <a className="skip-link" href="#continut" aria-label="Sari direct la conținutul paginii" title="Sari la conținut">Sari la conținut</a>
      {showNavigation && <SiteHeader navigationContext={navigationContext} />}
      <main className="site-content" id="continut">
        {children}
        {showFooter && showReviews && <GoogleReviewsSection variant="default" />}
        {showFooter && <SiteFooter />}
      </main>
      {showQuickContact && (
        <div className="quick-contact-float" aria-label="Contact rapid">
          {siteConfig.phoneHref && (
            <TrackedAnchor
              className="phone-float quick-contact-button"
              href={`tel:${siteConfig.phoneHref}`}
              eventName="click_phone"
              eventParameters={{ placement: "floating_contact" }}
              aria-label={`Sună ${siteConfig.name} la ${siteConfig.phoneDisplay}`}
              title={`Sună ${siteConfig.phoneDisplay}`}
            >
              <PhoneCall aria-hidden="true" />
            </TrackedAnchor>
          )}
          {siteConfig.whatsappNumber && (
            <TrackedAnchor
              className="whatsapp-float quick-contact-button"
              href={getWhatsAppUrl()}
              eventName="click_whatsapp"
              eventParameters={{ placement: "floating_contact" }}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Scrie către ${siteConfig.name} pe WhatsApp`}
              title="Scrie-ne pe WhatsApp"
            >
              <WhatsAppIcon />
            </TrackedAnchor>
          )}
        </div>
      )}
    </div>
  );
}
