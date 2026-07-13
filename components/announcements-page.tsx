import { ArrowRight, BellRing, CalendarDays, ExternalLink, Pin } from "lucide-react";
import Link from "next/link";
import { SiteShell } from "@/components/site-shell";
import type { Announcement } from "@/lib/managed-content";

const dateFormatter = new Intl.DateTimeFormat("ro-RO", { day: "numeric", month: "long", year: "numeric" });

export function formatAnnouncementDate(value: string) {
  return dateFormatter.format(new Date(value));
}

export function AnnouncementsPage({ announcements }: { announcements: readonly Announcement[] }) {
  return (
    <SiteShell navigationContext="general">
      <section className="announcements-hero" aria-labelledby="announcements-title" aria-describedby="announcements-description">
        <div className="section-container">
          <p className="eyebrow eyebrow-light"><BellRing aria-hidden="true" /> Actualizări Capital European</p>
          <h1 id="announcements-title">Anunțuri</h1>
          <p id="announcements-description">Informații despre oportunități urmărite, termene și actualizări relevante pentru proiecte și servicii administrative.</p>
        </div>
      </section>

      <section className="content-section announcements-section" aria-labelledby="announcement-list-title">
        <div className="section-container">
          <header className="announcements-heading">
            <div><p className="eyebrow"><BellRing aria-hidden="true" /> Informații publicate</p><h2 id="announcement-list-title">Ultimele anunțuri</h2></div>
            <p>Verifică întotdeauna sursa oficială indicată. Condițiile și termenele se pot modifica după publicare.</p>
          </header>

          {announcements.length ? (
            <div className="announcement-list">
              {announcements.map((announcement) => (
                <article className="announcement-card" key={announcement.id}>
                  <div className="announcement-meta">
                    <span>{announcement.category}</span>
                    <time dateTime={announcement.publishedAt}><CalendarDays aria-hidden="true" /> {formatAnnouncementDate(announcement.publishedAt)}</time>
                    {announcement.pinned && <small><Pin aria-hidden="true" /> Important</small>}
                  </div>
                  <h3><Link href={`/anunturi/${announcement.slug}`}>{announcement.title}</Link></h3>
                  <p>{announcement.excerpt}</p>
                  <div className="announcement-actions">
                    <Link href={`/anunturi/${announcement.slug}`}>Citește anunțul <ArrowRight aria-hidden="true" /></Link>
                    {announcement.sourceUrl && <a href={announcement.sourceUrl} target="_blank" rel="noopener noreferrer">Sursa indicată <ExternalLink aria-hidden="true" /></a>}
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="announcements-empty">
              <BellRing aria-hidden="true" />
              <h3>Nu sunt anunțuri publicate momentan</h3>
              <p>Pagina este pregătită pentru actualizările verificate care urmează.</p>
            </div>
          )}

          <section className="section-cta announcements-cta" aria-labelledby="announcements-cta-title">
            <div><p>Urmărești un program anume?</p><h2 id="announcements-cta-title">Trimite denumirea sau ghidul și verificăm sursa oficială.</h2></div>
            <Link className="primary-button yellow-button" href="/contact?service=fonduri-europene&program=program-nespecificat">Trimite programul <ArrowRight aria-hidden="true" /></Link>
          </section>
        </div>
      </section>
    </SiteShell>
  );
}
