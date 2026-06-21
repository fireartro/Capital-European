import { AboutPage } from "@/components/about-page";
import { createPageMetadata } from "@/lib/metadata";
import { breadcrumbSchema, JsonLd } from "@/lib/structured-data";

export const metadata = createPageMetadata({
  title: "Despre noi",
  description: "Află cum abordăm proiectele de fonduri europene și serviciile administrative: cu rigoare, transparență și soluții personalizate.",
  path: "/despre"
});

export default function Page() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Acasa", path: "/" },
        { name: "Despre noi", path: "/despre" }
      ])} />
      <AboutPage />
    </>
  );
}
