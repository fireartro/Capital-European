import { AdminPage } from "@/components/admin-page";
import { createPageMetadata } from "@/lib/metadata";
import { administrativeFaq } from "@/lib/service-content";
import { breadcrumbSchema, faqSchema, JsonLd, serviceSchema } from "@/lib/structured-data";

export const metadata = createPageMetadata({
  title: "Servicii administrative, înființare PFA și SRL",
  description: "Servicii administrative pentru firme și activități independente: înființare PFA, înființare SRL, documente, secretariat și back-office.",
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
          description: "Servicii administrative pentru firme: înființare PFA, înființare SRL, documente, secretariat și activități de back-office.",
          path: "/servicii-administrative",
          serviceType: ["Servicii administrative", "Înființare PFA", "Înființare SRL", "Secretariat", "Administrare documente", "Back-office"]
        }),
        faqSchema(administrativeFaq)
      ]} />
      <AdminPage />
    </>
  );
}
