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
    ? "/images/logo-capital-european-light.webp"
    : "/images/logo-capital-european-dark.webp";
  const logoSize = variant === "light"
    ? { width: 360, height: 166 }
    : { width: 360, height: 177 };

  return (
    <span className={`brand ${compact ? "brand-compact" : ""} brand-${variant}`}>
      <span className="brand-logo-frame">
        <Image
          src={logoSrc}
          alt="Capital European - consultanță fonduri europene și servicii administrative"
          width={logoSize.width}
          height={logoSize.height}
          sizes={compact ? "106px" : "(max-width: 1100px) 145px, 180px"}
          className="brand-logo"
          priority={priority}
        />
      </span>
    </span>
  );
}
