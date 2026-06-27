import { SeoServicePage } from "@/components/seo-service-page";
import { createPageMetadata } from "@/lib/metadata";
import { seoServicePages } from "@/lib/seo-service-pages";
import { breadcrumbSchema, faqSchema, JsonLd, serviceSchema } from "@/lib/structured-data";

const page = seoServicePages.companies;

export const metadata = createPageMetadata({
  title: page.title,
  description: page.metaDescription,
  path: page.path
});

export default function Page() {
  return (
    <>
      <JsonLd data={[
        breadcrumbSchema([
          { name: "Acasă", path: "/" },
          { name: page.parent.label, path: page.parent.href },
          { name: page.title, path: page.path }
        ]),
        serviceSchema({ name: page.title, description: page.metaDescription, path: page.path, serviceType: page.serviceType }),
        faqSchema(page.faq)
      ]} />
      <SeoServicePage page={page} />
    </>
  );
}
