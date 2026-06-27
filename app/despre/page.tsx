import { AboutPage } from "@/components/about-page";
import { createPageMetadata } from "@/lib/metadata";
import { breadcrumbSchema, JsonLd } from "@/lib/structured-data";

export const metadata = createPageMetadata({
  title: "Despre Capital European | Abordare și mod de lucru",
  description: "Află cum organizăm proiectele de fonduri europene și serviciile administrative: analiză inițială, responsabilități clare și documente verificabile.",
  path: "/despre"
});

export default function Page() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Acasă", path: "/" },
        { name: "Despre noi", path: "/despre" }
      ])} />
      <AboutPage />
    </>
  );
}
