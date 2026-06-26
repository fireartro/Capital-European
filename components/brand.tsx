import Image from "next/image";

type BrandVariant = "dark" | "light";

export function Brand({ compact = false, variant = "dark" }: { compact?: boolean; variant?: BrandVariant }) {
  const logoSrc = variant === "light"
    ? "/images/Consultanta Fonduri Europene si Servicii Administrari firme 1.webp"
    : "/images/Consultanta Fonduri Europene si Servicii Administrari firme 2.webp";

  return (
    <span className={`brand ${compact ? "brand-compact" : ""} brand-${variant}`}>
      <span className="brand-logo-frame">
        <Image
          src={logoSrc}
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
