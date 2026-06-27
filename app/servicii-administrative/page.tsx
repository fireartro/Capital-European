import { AdminPage } from "@/components/admin-page";
import { createPageMetadata } from "@/lib/metadata";
import { administrativeFaq } from "@/lib/service-content";
import { breadcrumbSchema, faqSchema, JsonLd, serviceSchema } from "@/lib/structured-data";

export const metadata = createPageMetadata({
  title: "Servicii administrative externalizate",
  description: "Servicii administrative externalizate pentru firme din România: secretariat extern, procesare documente, back-office, organizare operațională și asistență pentru înființarea firmei.",
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
          description: "Servicii administrative pentru firme: procesare documente, secretariat, back-office, organizare operationala si asistenta pentru infiintarea firmei.",
          path: "/servicii-administrative",
          serviceType: ["Servicii administrative", "Secretariat", "Administrare documente", "Back-office", "Infiintare firma"]
        }),
        faqSchema(administrativeFaq)
      ]} />
      <AdminPage />
    </>
  );
}
