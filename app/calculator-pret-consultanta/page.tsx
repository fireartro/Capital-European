import Link from "next/link";
import { ArrowRight, Calculator, ChevronRight } from "lucide-react";
import { SiteShell } from "@/components/site-shell";
import { type CalculatorMode, UnifiedCalculator } from "@/components/unified-calculator";
import { createPageMetadata } from "@/lib/metadata";
import { breadcrumbSchema, JsonLd, serviceSchema } from "@/lib/structured-data";

const description = "Calculator unic pentru verificarea preliminară a eligibilității la fonduri europene și estimarea complexității serviciilor de consultanță sau administrare.";

export const metadata = createPageMetadata({
  title: "Calculator fonduri europene și servicii administrative",
  description,
  path: "/calculator-pret-consultanta"
});

export default async function Page({ searchParams }: { searchParams: Promise<{ mode?: string }> }) {
  const { mode } = await searchParams;
  const initialMode: CalculatorMode = mode === "eligibilitate" ? "eligibilitate" : "estimare";
  const consultingBasePriceRon = Number(process.env.NEXT_PUBLIC_ESTIMATOR_BASE_PRICE_RON || 0);
  const adminBasePriceRon = Number(process.env.NEXT_PUBLIC_ADMIN_ESTIMATOR_BASE_PRICE_RON || 0);

  return (
    <>
      <JsonLd data={[
        breadcrumbSchema([
          { name: "Acasă", path: "/" },
          { name: "Fonduri europene", path: "/fonduri-europene" },
          { name: "Calculator fonduri și servicii", path: "/calculator-pret-consultanta" }
        ]),
        serviceSchema({
          name: "Calculator fonduri europene și servicii administrative",
          description,
          path: "/calculator-pret-consultanta",
          serviceType: ["Verificare preliminară eligibilitate", "Estimare orientativă servicii"]
        })
      ]} />
      <SiteShell navigationContext="funding">
        <section className="calculator-page" aria-labelledby="calculator-title">
          <div className="section-container">
            <nav className="service-breadcrumbs" aria-label="Navigare ierarhică">
              <Link href="/">Acasă</Link><ChevronRight aria-hidden="true" />
              <Link href="/fonduri-europene">Fonduri europene</Link><ChevronRight aria-hidden="true" />
              <span aria-current="page">Calculator</span>
            </nav>
            <div className="calculator-heading">
              <p className="eyebrow eyebrow-light"><Calculator aria-hidden="true" /> Estimare orientativă</p>
              <h1 id="calculator-title">Calculator pentru fonduri și servicii administrative</h1>
              <p>Alege verificarea preliminară de eligibilitate sau estimează complexitatea unui serviciu de consultanță ori administrare. Rezultatele sunt orientative și nu înlocuiesc analiza situației.</p>
              <div className="calculator-signals" aria-label="Caracteristicile estimării">
                <span>Rezultat imediat</span>
                <span>Fără date personale</span>
                <span>Fără obligație contractuală</span>
              </div>
              <Link href="/consultanta-fonduri-europene">Vezi ce include consultanța <ArrowRight aria-hidden="true" /></Link>
            </div>
            <UnifiedCalculator
              initialMode={initialMode}
              consultingBasePriceRon={consultingBasePriceRon}
              adminBasePriceRon={adminBasePriceRon}
            />
          </div>
        </section>
      </SiteShell>
    </>
  );
}
