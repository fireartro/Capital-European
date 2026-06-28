import Link from "next/link";
import { ArrowRight, Calculator, ChevronRight } from "lucide-react";
import { SiteShell } from "@/components/site-shell";
import { UnifiedCalculator } from "@/components/unified-calculator";
import { createPageMetadata } from "@/lib/metadata";
import { breadcrumbSchema, JsonLd, serviceSchema } from "@/lib/structured-data";

const description = "Calculator orientativ pentru estimarea complexității serviciilor de consultanță pentru fonduri europene și a serviciilor administrative.";

export const metadata = createPageMetadata({
  title: "Calculator consultanță și servicii administrative",
  description,
  path: "/calculator-pret-consultanta"
});

export default function Page() {
  const consultingBasePriceRon = Number(process.env.NEXT_PUBLIC_ESTIMATOR_BASE_PRICE_RON || 0);
  const adminBasePriceRon = Number(process.env.NEXT_PUBLIC_ADMIN_ESTIMATOR_BASE_PRICE_RON || 0);

  return (
    <>
      <JsonLd data={[
        breadcrumbSchema([
          { name: "Acasă", path: "/" },
          { name: "Calculator consultanță", path: "/calculator-pret-consultanta" }
        ]),
        serviceSchema({
          name: "Calculator consultanță și servicii administrative",
          description,
          path: "/calculator-pret-consultanta",
          serviceType: ["Estimare orientativă consultanță", "Estimare orientativă servicii administrative"]
        })
      ]} />
      <SiteShell navigationContext="general">
        <section className="calculator-page" aria-labelledby="calculator-title">
          <div className="section-container">
            <nav className="service-breadcrumbs" aria-label="Navigare ierarhică">
              <Link href="/">Acasă</Link><ChevronRight aria-hidden="true" />
              <span aria-current="page">Calculator</span>
            </nav>
            <div className="calculator-heading">
              <p className="eyebrow eyebrow-light"><Calculator aria-hidden="true" /> Estimare orientativă</p>
              <h1 id="calculator-title">Calculator pentru consultanță și servicii administrative</h1>
              <p>Estimează complexitatea unui serviciu de consultanță pentru fonduri europene sau administrare. Rezultatul este orientativ și nu înlocuiește analiza situației.</p>
              <div className="calculator-signals" aria-label="Caracteristicile estimării">
                <span>Rezultat imediat</span>
                <span>Fără date personale</span>
                <span>Fără obligație contractuală</span>
              </div>
              <Link href="/consultanta-fonduri-europene">Vezi ce include consultanța <ArrowRight aria-hidden="true" /></Link>
            </div>
            <UnifiedCalculator
              consultingBasePriceRon={consultingBasePriceRon}
              adminBasePriceRon={adminBasePriceRon}
            />
          </div>
        </section>
      </SiteShell>
    </>
  );
}
