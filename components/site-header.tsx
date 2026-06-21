"use client";

import {
  ArrowLeft,
  BadgeCheck,
  BookOpenCheck,
  Building2,
  CircleHelp,
  ClipboardList,
  FileText,
  Home,
  Landmark,
  Mail,
  Menu,
  Phone,
  Sparkles,
  Users,
  X
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { type MouseEvent, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Brand } from "@/components/brand";
import { siteConfig } from "@/lib/site-config";

type NavigationItem = {
  label: string;
  href: string;
  icon: typeof Home;
};

const fundingNavigation: NavigationItem[] = [
  { label: "Prezentare", href: "/fonduri-europene", icon: Landmark },
  { label: "Servicii", href: "/fonduri-europene#servicii-fonduri", icon: FileText },
  { label: "Beneficii", href: "/fonduri-europene#beneficii-fonduri", icon: BadgeCheck },
  { label: "Proces", href: "/fonduri-europene#proces-fonduri", icon: ClipboardList },
  { label: "Întrebări", href: "/fonduri-europene#intrebari-fonduri", icon: CircleHelp },
  { label: "Contact", href: "/contact?service=fonduri-europene", icon: Mail }
];

const adminNavigation: NavigationItem[] = [
  { label: "Prezentare", href: "/servicii-administrative", icon: FileText },
  { label: "Servicii", href: "/servicii-administrative#servicii-administrative", icon: ClipboardList },
  { label: "Înființare firmă", href: "/servicii-administrative#infiintare-firma", icon: Building2 },
  { label: "Despre", href: "/despre", icon: Users },
  { label: "Întrebări", href: "/servicii-administrative#intrebari-administrative", icon: CircleHelp },
  { label: "Contact", href: "/contact?service=servicii-administrative", icon: Mail }
];

const generalNavigation: NavigationItem[] = [
  { label: "Alegere servicii", href: "/", icon: Home },
  { label: "Fonduri europene", href: "/fonduri-europene", icon: Landmark },
  { label: "Servicii administrative", href: "/servicii-administrative", icon: FileText },
  { label: "Despre", href: "/despre", icon: BookOpenCheck },
  { label: "Întrebări", href: "/intrebari", icon: CircleHelp },
  { label: "Contact", href: "/contact", icon: Mail }
];

export function SiteHeader({ navigationContext }: { navigationContext?: "funding" | "admin" | "general" }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState({ pathname: "", hash: "" });
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const getHrefParts = useCallback((href: string) => {
    const [rawPath = "", rawHash] = href.split("#");
    return {
      path: (rawPath || pathname).split("?")[0],
      hash: rawHash ? `#${rawHash}` : ""
    };
  }, [pathname]);

  const context = useMemo(() => {
    if (navigationContext === "funding" || pathname.startsWith("/fonduri-europene")) {
      return {
        label: "Fonduri europene",
        navigation: fundingNavigation,
        contactHref: "/contact?service=fonduri-europene"
      };
    }
    if (navigationContext === "admin" || pathname.startsWith("/servicii-administrative")) {
      return {
        label: "Servicii administrative",
        navigation: adminNavigation,
        contactHref: "/contact?service=servicii-administrative"
      };
    }
    return {
      label: siteConfig.tagline,
      navigation: generalNavigation,
      contactHref: "/contact"
    };
  }, [navigationContext, pathname]);

  useEffect(() => {
    const localItems = context.navigation
      .map((item) => ({ ...item, ...getHrefParts(item.href) }))
      .filter((item) => item.hash && item.path === pathname);

    let frame = 0;
    const updateActiveSection = () => {
      frame = 0;
      if (window.scrollY < 140 || !localItems.length) {
        setActiveSection((current) =>
          current.pathname === pathname && current.hash === ""
            ? current
            : { pathname, hash: "" }
        );
        return;
      }

      const viewportAnchor = window.innerHeight * .34;
      let nextHash = "";
      localItems.forEach((item) => {
        const section = document.getElementById(item.hash.slice(1));
        if (section && section.getBoundingClientRect().top <= viewportAnchor) {
          nextHash = item.hash;
        }
      });

      setActiveSection((current) =>
        current.pathname === pathname && current.hash === nextHash
          ? current
          : { pathname, hash: nextHash }
      );
    };

    const scheduleUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateActiveSection);
    };

    updateActiveSection();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [context, getHrefParts, pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;

    const focusable = drawerRef.current?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable?.[0];
    const last = focusable?.[focusable.length - 1];
    const menuButton = menuButtonRef.current;
    first?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        return;
      }
      if (event.key !== "Tab" || !first || !last) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      menuButton?.focus();
    };
  }, [menuOpen]);

  const isActive = (href: string) => {
    const { path, hash } = getHrefParts(href);
    const activeHash = activeSection.pathname === pathname ? activeSection.hash : "";
    if (hash) return path === pathname && activeHash === hash;
    if (activeHash && path === pathname && (pathname === "/fonduri-europene" || pathname === "/servicii-administrative")) return false;
    return path === "/" ? pathname === "/" : pathname === path;
  };

  const handleNavigationClick = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    setMenuOpen(false);
    const { path, hash } = getHrefParts(href);
    const isSamePageAnchor = path === pathname && !href.includes("?");
    if (!isSamePageAnchor) return;

    event.preventDefault();
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const behavior: ScrollBehavior = reduceMotion ? "auto" : "smooth";

    if (hash) {
      const section = document.getElementById(hash.slice(1));
      if (!section) return;
      section.scrollIntoView({ behavior, block: "start" });
      window.history.replaceState(null, "", `${path}${hash}`);
      setActiveSection({ pathname, hash });
      return;
    }

    window.scrollTo({ top: 0, behavior });
    window.history.replaceState(null, "", path);
    setActiveSection({ pathname, hash: "" });
  };

  const navContent = (
    <>
      <Link className="back-to-choice" href="/" aria-label="Schimbă categoria de servicii ProBirou" title="Schimbă categoria de servicii">
        <ArrowLeft aria-hidden="true" />
        <span>Schimbă categoria</span>
      </Link>
      <nav className="side-nav" aria-label={`Navigare ${context.label}`}>
        {context.navigation.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              aria-label={`Navighează la ${item.label} - ${context.label}`}
              className={isActive(item.href) ? "active" : ""}
              href={item.href}
              key={item.href}
              onClick={(event) => handleNavigationClick(event, item.href)}
              title={`${item.label} - ${context.label}`}
            >
              <Icon aria-hidden="true" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
      <div className="sidebar-contact">
        <span>Ai o întrebare?</span>
        {siteConfig.phoneHref && <a href={`tel:${siteConfig.phoneHref}`} aria-label={`Sună ${siteConfig.name}`} title={`Sună ${siteConfig.name}`}><Phone aria-hidden="true" /> {siteConfig.phoneDisplay}</a>}
        <a href={`mailto:${siteConfig.email}`} aria-label={`Trimite email către ${siteConfig.name}`} title={`Trimite email către ${siteConfig.name}`}><Mail aria-hidden="true" /> {siteConfig.email}</a>
        <Link className="sidebar-cta" href={context.contactHref} onClick={() => setMenuOpen(false)} aria-label={`Solicită o discuție cu ${siteConfig.name}`} title={`Solicită o discuție cu ${siteConfig.name}`}>
          Solicită o discuție
        </Link>
      </div>
      <div className="sidebar-legal">
        <a href="/confidentialitate" aria-label="Citește politica de confidențialitate ProBirou" title="Politica de confidențialitate ProBirou">Confidențialitate</a>
        <a href="/termeni" aria-label="Citește termenii și condițiile ProBirou" title="Termeni și condiții ProBirou">Termeni</a>
      </div>
    </>
  );

  return (
    <>
      <aside className="sidebar">
        <Link className="sidebar-brand" href="/" aria-label={`${siteConfig.name}, pagina de alegere`} title={`${siteConfig.name}, pagina de alegere`}>
          <Brand />
          <small>{context.label}</small>
        </Link>
        {navContent}
      </aside>

      <header className="mobile-header">
        <Link href="/" aria-label={`${siteConfig.name}, pagina de alegere`} title={`${siteConfig.name}, pagina de alegere`}><Brand compact /></Link>
        <span className="mobile-context">{context.label}</span>
        <button
          ref={menuButtonRef}
          className="menu-button"
          onClick={() => setMenuOpen(true)}
          aria-label="Deschide meniul"
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation-drawer"
        >
          <Menu aria-hidden="true" />
        </button>
      </header>

      {menuOpen && (
        <div
          ref={drawerRef}
          className="mobile-drawer"
          id="mobile-navigation-drawer"
          role="dialog"
          aria-modal="true"
          aria-label={`Meniu ${context.label}`}
        >
          <div className="drawer-top">
            <Link href="/" onClick={() => setMenuOpen(false)} aria-label={`${siteConfig.name}, pagina de alegere`} title={`${siteConfig.name}, pagina de alegere`}><Brand /></Link>
            <button onClick={() => setMenuOpen(false)} aria-label="Închide meniul"><X aria-hidden="true" /></button>
          </div>
          <p className="drawer-context"><Sparkles /> {context.label}</p>
          {navContent}
        </div>
      )}
    </>
  );
}
