import Image from "next/image";

export function PnrrPromotionBanner() {
  return (
    <section className="section-container pnrr-promotion" aria-label="Informare Planul Național de Redresare și Reziliență">
      <a
        href="https://mfe.gov.ro/pnrr/"
        target="_blank"
        rel="noopener noreferrer"
        title="Află mai multe despre Planul Național de Redresare și Reziliență"
      >
        <Image
          src="/images/pnrr-fonduri-pentru-romania.webp"
          alt="PNRR: Fonduri pentru România modernă și reformată, finanțat de Uniunea Europeană NextGenerationEU"
          width={1384}
          height={175}
          sizes="(max-width: 1100px) calc(100vw - 40px), 1080px"
        />
      </a>
    </section>
  );
}
