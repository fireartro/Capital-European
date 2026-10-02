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
          sizes={compact ? "106px" : "(min-width: 3800px) 360px, (min-width: 3000px) 320px, (min-width: 2000px) 280px, (min-width: 1101px) 220px, 190px"}
          quality={90}
          className="brand-logo"
          priority={priority}
        />
      </span>
    </span>
  );
}
