import Link from "next/link";
import { ArrowLeft, Landmark, Files } from "lucide-react";
import type { Metadata } from "next";
import { Brand } from "@/components/brand";

export const metadata: Metadata = {
  title: "Pagina nu a fost găsită",
  robots: { index: false, follow: true }
};

export default function NotFound() {
  return (
    <main className="not-found-page">
      <Link className="not-found-brand" href="/" aria-label="Capital European, pagina principală">
        <Brand variant="light" />
      </Link>
      <section aria-labelledby="not-found-title">
        <p className="eyebrow eyebrow-light">Eroare 404</p>
        <h1 id="not-found-title">Pagina nu a fost găsită.</h1>
        <p>Adresa poate fi incompletă sau pagina a fost mutată. Alege una dintre direcțiile principale ori revino la pagina de start.</p>
        <div className="not-found-actions">
          <Link className="primary-button yellow-button" href="/"><ArrowLeft aria-hidden="true" /> Pagina principală</Link>
          <Link href="/fonduri-europene"><Landmark aria-hidden="true" /> Fonduri europene</Link>
          <Link href="/servicii-administrative"><Files aria-hidden="true" /> Servicii administrative</Link>
        </div>
      </section>
    </main>
  );
}
