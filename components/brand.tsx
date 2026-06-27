import Image from "next/image";

type BrandVariant = "dark" | "light";

export function Brand({
  compact = false,
  variant = "dark",
  priority = false
}: {
  compact?: boolean;
  variant?: BrandVariant;
  priority?: boolean;
}) {
  const logoSrc = variant === "light"
    ? "/images/Consultanta-Fonduri-Europene-si-Servicii-Administrari-firme-1.webp"
    : "/images/Consultanta-Fonduri-Europene-si-Servicii-Administrari-firme-2.webp";
  const logoSize = variant === "light"
    ? { width: 700, height: 322 }
    : { width: 700, height: 344 };

  return (
    <span className={`brand ${compact ? "brand-compact" : ""} brand-${variant}`}>
      <span className="brand-logo-frame">
        <Image
          src={logoSrc}
          alt="Capital European - consultanță fonduri europene și servicii administrative"
          width={logoSize.width}
          height={logoSize.height}
          sizes={compact ? "106px" : "180px"}
          className="brand-logo"
          priority={priority}
        />
      </span>
    </span>
  );
}
