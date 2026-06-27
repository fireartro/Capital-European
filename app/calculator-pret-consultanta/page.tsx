import Link from "next/link";
import { ArrowRight, Calculator, ChevronRight } from "lucide-react";
import { ConsultingPriceCalculator } from "@/components/consulting-price-calculator";
import { SiteShell } from "@/components/site-shell";
import { createPageMetadata } from "@/lib/metadata";
import { breadcrumbSchema, JsonLd, serviceSchema } from "@/lib/structured-data";

const description = "Estimează orientativ complexitatea și intervalul de preț pentru consultanță în fonduri europene. Rezultatul nu înlocuiește analiza și oferta finală.";

export const metadata = createPageMetadata({
  title: "Calculator preț consultanță fonduri europene",
  description,
  path: "/calculator-pret-consultanta"
});

export default function Page() {
  const basePriceRon = Number(process.env.NEXT_PUBLIC_ESTIMATOR_BASE_PRICE_RON || 0);

  return (
    <>
      <JsonLd data={[
        breadcrumbSchema([
          { name: "Acasă", path: "/" },
          { name: "Fonduri europene", path: "/fonduri-europene" },
          { name: "Calculator preț consultanță", path: "/calculator-pret-consultanta" }
        ]),
        serviceSchema({
          name: "Estimare consultanță fonduri europene",
          description,
          path: "/calculator-pret-consultanta",
          serviceType: "Estimare orientativă consultanță"
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
              <h1 id="calculator-title">Calculator orientativ pentru prețul consultanței</h1>
              <p>Descrie proiectul în câteva selecții. Primești nivelul estimat de complexitate și, dacă baza comercială este configurată, un interval de preț. Oferta finală se stabilește după analiza apelului și a documentelor.</p>
              <div className="calculator-signals" aria-label="Caracteristicile estimării">
                <span>Rezultat imediat</span>
                <span>Fără date personale</span>
                <span>Fără obligație contractuală</span>
              </div>
              <Link href="/consultanta-fonduri-europene">Vezi ce include consultanța <ArrowRight aria-hidden="true" /></Link>
            </div>
            <ConsultingPriceCalculator basePriceRon={basePriceRon} />
          </div>
        </section>
      </SiteShell>
    </>
  );
}
