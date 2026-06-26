import Image from "next/image";

export function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <span className={`brand ${compact ? "brand-compact" : ""}`}>
      <span className="brand-logo-frame">
        <Image
          src="/images/logo-capital-european.webp"
          alt="Capital European – Creăm astăzi succesul de mâine"
          width={1024}
          height={1024}
          sizes={compact ? "106px" : "180px"}
          className="brand-logo"
          priority
        />
      </span>
    </span>
  );
}
