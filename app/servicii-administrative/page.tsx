import { AdminPage } from "@/components/admin-page";
import { createPageMetadata } from "@/lib/metadata";
import { administrativeFaq } from "@/lib/service-content";
import { breadcrumbSchema, faqSchema, JsonLd, serviceSchema } from "@/lib/structured-data";

export const metadata = createPageMetadata({
  title: "Servicii administrative și PFA / SRL",
  description: "Servicii administrative externalizate și sprijin pentru înființare PFA sau SRL: documente, secretariat, back-office și fluxuri operaționale clare.",
  path: "/servicii-administrative"
});

export default function Page() {
  return (
    <>
      <JsonLd data={[
        breadcrumbSchema([
          { name: "Acasă", path: "/" },
          { name: "Servicii administrative", path: "/servicii-administrative" }
        ]),
        serviceSchema({
          name: "Servicii administrative externalizate",
          description: "Servicii administrative pentru firme: înființare PFA sau SRL, documente, secretariat, back-office și organizare operațională.",
          path: "/servicii-administrative",
          serviceType: ["Servicii administrative", "Înființare PFA", "Înființare SRL", "Secretariat", "Administrare documente", "Back-office"]
        }),
        faqSchema(administrativeFaq)
      ]} />
      <AdminPage />
    </>
  );
}
