import { PhoneCall } from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getWhatsAppUrl, siteConfig } from "@/lib/site-config";
import { WhatsAppIcon } from "@/components/whatsapp-icon";

const interactionStyles = `
.quick-contact-float{position:fixed;z-index:1200;right:max(18px,env(safe-area-inset-right));bottom:max(142px,calc(env(safe-area-inset-bottom) + 132px));display:grid;gap:10px;pointer-events:none}.quick-contact-float a{pointer-events:auto}.phone-float,.whatsapp-float{position:static!important;width:54px;height:54px;min-height:54px;display:grid!important;place-items:center;padding:0!important;border:1px solid rgba(255,255,255,.34);border-radius:999px;box-shadow:0 16px 38px rgba(2,16,45,.24);transition:transform .2s ease,box-shadow .2s ease,filter .2s ease}.phone-float{background:#003399;color:#fff}.whatsapp-float{background:#25d366;color:#fff}.phone-float:hover,.whatsapp-float:hover{transform:translateY(-3px);box-shadow:0 20px 46px rgba(2,16,45,.3)}.phone-float>svg{width:27px;height:27px;padding:0;background:transparent}.whatsapp-float>svg{width:34px;height:34px;padding:0;background:transparent}.phone-label,.whatsapp-label,.whatsapp-pulse{display:none!important}body:has(.cookie-banner) .quick-contact-float,body:has(.cookie-preferences-backdrop) .quick-contact-float{display:none}.contact-layout-simplified{align-items:center}.contact-layout-simplified .contact-copy{max-width:560px}.contact-layout-simplified .contact-primary-link{margin-bottom:18px}.contact-layout-simplified .contact-steps{margin-top:8px}.content-section{padding-block:84px}.section-title-row{margin-bottom:42px}.section-title-row>p,.visual-story-copy>p:not(.eyebrow),.inner-hero-content>p:not(.eyebrow),.seo-service-hero .section-container>p:not(.eyebrow),.calculator-heading>p:not(.eyebrow){line-height:1.72}.funding-service-card,.admin-service-card,.seo-benefit-grid article,.seo-process-grid article,.fit-grid article,.conversion-steps article,.operations-lanes article{padding:26px}.calculator-mode-switch{max-width:920px}.calculator-heading{margin-bottom:32px}.calculator-entry{margin-top:28px}.price-calculator{border-radius:12px}.form-wrap{max-width:640px;justify-self:end}.contact-form{padding:26px}.form-trust-list li{min-height:auto}.site-footer{padding-bottom:42px}@media(max-width:820px){.content-section,.faq{padding-block:66px}.inner-hero h1,.contact-copy h1,.seo-service-hero h1,.calculator-heading h1{letter-spacing:-.02em}.section-title-row{margin-bottom:30px}.funding-service-card,.admin-service-card,.seo-benefit-grid article,.seo-process-grid article,.fit-grid article,.conversion-steps article,.operations-lanes article{padding:22px}.form-wrap{max-width:100%;justify-self:stretch}}@media(max-width:640px){.quick-contact-float{right:14px;bottom:max(116px,calc(env(safe-area-inset-bottom) + 106px));gap:8px}.phone-float,.whatsapp-float{width:50px;height:50px;min-height:50px}.phone-float>svg{width:25px;height:25px}.whatsapp-float>svg{width:32px;height:32px}.contact-layout-simplified .contact-copy{max-width:none}.contact-layout-simplified .contact-steps{margin-top:4px}.content-section,.faq{padding-block:52px}.section-title-row>p,.visual-story-copy>p:not(.eyebrow),.inner-hero-content>p:not(.eyebrow),.seo-service-hero .section-container>p:not(.eyebrow),.calculator-heading>p:not(.eyebrow){line-height:1.62}.calculator-entry{margin-top:20px}.site-footer{padding-bottom:86px}}
`;

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
  const showQuickContact = showWhatsApp && (siteConfig.phoneHref || siteConfig.whatsappNumber);

  return (
    <div className={`app-layout ${showNavigation ? "" : "no-navigation"}`}>
      <style>{interactionStyles}</style>
      <a className="skip-link" href="#continut" aria-label="Sari direct la conținutul paginii" title="Sari la conținut">Sari la conținut</a>
      {showNavigation && <SiteHeader navigationContext={navigationContext} />}
      <main className="site-content" id="continut">
        {children}
        {showFooter && <SiteFooter />}
      </main>
      {showQuickContact && (
        <div className="quick-contact-float" aria-label="Contact rapid">
          {siteConfig.phoneHref && (
            <a
              className="phone-float quick-contact-button"
              href={`tel:${siteConfig.phoneHref}`}
              aria-label={`Sună ${siteConfig.name} la ${siteConfig.phoneDisplay}`}
              title={`Sună ${siteConfig.phoneDisplay}`}
            >
              <PhoneCall aria-hidden="true" />
            </a>
          )}
          {siteConfig.whatsappNumber && (
            <a
              className="whatsapp-float quick-contact-button"
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Scrie către ${siteConfig.name} pe WhatsApp`}
              title="Scrie-ne pe WhatsApp"
            >
              <WhatsAppIcon />
            </a>
          )}
        </div>
      )}
    </div>
  );
}
