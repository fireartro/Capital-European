import { AnnouncementsPage } from "@/components/announcements-page";
import { getManagedContent } from "@/lib/content-store";
import { publishedAnnouncements } from "@/lib/managed-content";
import { createPageMetadata } from "@/lib/metadata";
import { breadcrumbSchema, JsonLd } from "@/lib/structured-data";

export const dynamic = "force-dynamic";

export const metadata = createPageMetadata({
  title: "Anunțuri și actualizări despre fonduri europene",
  description: "Anunțuri Capital European despre oportunități de finanțare urmărite, termene, surse oficiale și actualizări relevante pentru solicitanți.",
  path: "/anunturi"
});

export default async function Page() {
  const announcements = publishedAnnouncements(await getManagedContent());
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Acasă", path: "/" }, { name: "Anunțuri", path: "/anunturi" }])} />
      <AnnouncementsPage announcements={announcements} />
    </>
  );
}
