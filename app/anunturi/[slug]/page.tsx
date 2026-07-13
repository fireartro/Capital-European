import { ArrowLeft, ArrowRight, BellRing, CalendarDays, ExternalLink } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatAnnouncementDate } from "@/components/announcements-page";
import { SiteShell } from "@/components/site-shell";
import { getManagedContent } from "@/lib/content-store";
import { publishedAnnouncements } from "@/lib/managed-content";
import { createPageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site-config";
import { breadcrumbSchema, JsonLd } from "@/lib/structured-data";

export const dynamic = "force-dynamic";

async function getAnnouncement(slug: string) {
  return publishedAnnouncements(await getManagedContent()).find((announcement) => announcement.slug === slug);
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const announcement = await getAnnouncement(slug);
  if (!announcement) return createPageMetadata({ title: "Anunț indisponibil", path: `/anunturi/${slug}`, index: false });
  return createPageMetadata({ title: announcement.title, description: announcement.excerpt, path: `/anunturi/${announcement.slug}` });
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const announcement = await getAnnouncement(slug);
  if (!announcement) notFound();

  const paragraphs = announcement.body.split(/\n\s*\n/).map((paragraph) => paragraph.trim()).filter(Boolean);
  const articleUrl = `${siteConfig.url}/anunturi/${announcement.slug}`;
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: announcement.title,
    description: announcement.excerpt,
    datePublished: announcement.publishedAt,
    dateModified: announcement.updatedAt,
    mainEntityOfPage: articleUrl,
    author: { "@id": `${siteConfig.url}#organization` },
    publisher: { "@id": `${siteConfig.url}#organization` }
  };

  return (
    <>
      <JsonLd data={[
        breadcrumbSchema([{ name: "Acasă", path: "/" }, { name: "Anunțuri", path: "/anunturi" }, { name: announcement.title, path: `/anunturi/${announcement.slug}` }]),
        articleSchema
      ]} />
      <SiteShell navigationContext="general">
        <article className="announcement-detail">
          <header className="announcement-detail-header">
            <div className="section-container">
              <Link className="announcement-back" href="/anunturi"><ArrowLeft aria-hidden="true" /> Toate anunțurile</Link>
              <p className="eyebrow eyebrow-light"><BellRing aria-hidden="true" /> {announcement.category}</p>
              <h1>{announcement.title}</h1>
              <p>{announcement.excerpt}</p>
              <time dateTime={announcement.publishedAt}><CalendarDays aria-hidden="true" /> Publicat la {formatAnnouncementDate(announcement.publishedAt)}</time>
            </div>
          </header>
          <div className="section-container announcement-detail-body">
            <div className="announcement-prose">{paragraphs.map((paragraph, index) => <p key={`${announcement.id}-${index}`}>{paragraph}</p>)}</div>
            <aside className="announcement-detail-aside">
              <h2>Pasul următor</h2>
              <p>Ai nevoie de o verificare pentru situația ta? Trimite informațiile pe care le ai acum.</p>
              <Link className="primary-button blue-button" href="/contact?service=fonduri-europene">Solicită o discuție <ArrowRight aria-hidden="true" /></Link>
              {announcement.sourceUrl && <a href={announcement.sourceUrl} target="_blank" rel="noopener noreferrer">Deschide sursa indicată <ExternalLink aria-hidden="true" /></a>}
              {announcement.ctaLabel && announcement.ctaUrl && (
                announcement.ctaUrl.startsWith("http")
                  ? <a href={announcement.ctaUrl} target="_blank" rel="noopener noreferrer">{announcement.ctaLabel} <ExternalLink aria-hidden="true" /></a>
                  : <Link href={announcement.ctaUrl}>{announcement.ctaLabel} <ArrowRight aria-hidden="true" /></Link>
              )}
            </aside>
          </div>
        </article>
      </SiteShell>
    </>
  );
}
