"use client";

import {
  ArrowLeft,
  BookOpenCheck,
  Building2,
  Calculator,
  CircleHelp,
  ClipboardList,
  FileText,
  Home,
  Landmark,
  Mail,
  Menu,
  Phone,
  Sparkles,
  X
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { type MouseEvent, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Brand } from "@/components/brand";
import { CookieSettingsButton } from "@/components/cookie-settings-button";
import { siteConfig } from "@/lib/site-config";

type NavigationItem = {
  label: string;
  href: string;
  icon: typeof Home;
};

const fundingNavigation: NavigationItem[] = [
  { label: "Prezentare", href: "/fonduri-europene", icon: Landmark },
  { label: "Servicii", href: "/fonduri-europene#servicii-fonduri", icon: FileText },
  { label: "Proces", href: "/fonduri-europene#proces-fonduri", icon: ClipboardList },
  { label: "Întrebări", href: "/fonduri-europene#intrebari-fonduri", icon: CircleHelp },
  { label: "Contact", href: "/contact?service=fonduri-europene", icon: Mail },
  { label: "Calculator", href: "/calculator-pret-consultanta?mode=eligibilitate", icon: Calculator }
];

const adminNavigation: NavigationItem[] = [
  { label: "Prezentare", href: "/servicii-administrative", icon: FileText },
  { label: "Servicii", href: "/servicii-administrative#servicii-administrative", icon: ClipboardList },
  { label: "Înființare firmă", href: "/servicii-administrative#infiintare-firma", icon: Building2 },
  { label: "Întrebări", href: "/servicii-administrative#intrebari-administrative", icon: CircleHelp },
  { label: "Contact", href: "/contact?service=servicii-administrative", icon: Mail },
  { label: "Calculator", href: "/calculator-pret-consultanta?mode=estimare", icon: Calculator }
];

const generalNavigation: NavigationItem[] = [
  { label: "Alegere servicii", href: "/", icon: Home },
  { label: "Fonduri europene", href: "/fonduri-europene", icon: Landmark },
  { label: "Servicii administrative", href: "/servicii-administrative", icon: FileText },
  { label: "Despre", href: "/despre", icon: BookOpenCheck },
  { label: "Întrebări", href: "/intrebari", icon: CircleHelp },
  { label: "Contact", href: "/contact", icon: Mail },
  { label: "Calculator", href: "/calculator-pret-consultanta", icon: Calculator }
];

function normalizePath(path: string) {
  const trimmed = path.replace(/\/+$/, "");
  return trimmed === "" ? "/" : trimmed;
}

export function SiteHeader({ navigationContext }: { navigationContext?: "funding" | "admin" | "general" }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState({ pathname: "", hash: "" });
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const pathname = normalizePath(usePathname() || "/");

  const setMenuState = useCallback((nextOpen: boolean) => {
    setMenuOpen(nextOpen);
  }, []);

  const closeMenu = useCallback(() => setMenuState(false), [setMenuState]);

  const getHrefParts = useCallback((href: string) => {
    const [rawPath = "", rawHash] = href.split("#");
    return {
      path: normalizePath((rawPath || pathname).split("?")[0]),
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
      if (!localItems.length) {
        setActiveSection((current) =>
          current.pathname === pathname && current.hash === ""
            ? current
            : { pathname, hash: "" }
        );
        return;
      }

      const sections = localItems
        .map((item) => ({ ...item, element: document.getElementById(item.hash.slice(1)) }))
        .filter((item): item is (typeof item & { element: HTMLElement }) => Boolean(item.element))
        .sort((a, b) => a.element.getBoundingClientRect().top - b.element.getBoundingClientRect().top);

      if (!sections.length) {
        setActiveSection((current) =>
          current.pathname === pathname && current.hash === ""
            ? current
            : { pathname, hash: "" }
        );
        return;
      }

      const viewportAnchor = window.innerHeight * 0.34;
      let nextHash = "";

      sections.forEach((item) => {
        const top = item.element.getBoundingClientRect().top;
        if (top <= viewportAnchor) {
          nextHash = item.hash;
        }
      });

      if (!nextHash && window.scrollY > 140) {
        nextHash = sections[0].hash;
      }

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
        closeMenu();
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
  }, [closeMenu, menuOpen]);

  const isActive = (href: string) => {
    const { path, hash } = getHrefParts(href);
    const activeHash = activeSection.pathname === pathname ? activeSection.hash : "";
    if (hash) return path === pathname && activeHash === hash;
    if (activeHash && path === pathname && (pathname === "/fonduri-europene" || pathname === "/servicii-administrative")) return false;
    return path === "/" ? pathname === "/" : pathname === path;
  };

  const handleNavigationClick = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    closeMenu();
    const { path, hash } = getHrefParts(href);
    const isSamePageAnchor = path === pathname && hash;
    if (!isSamePageAnchor) return;

    event.preventDefault();
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const behavior: ScrollBehavior = reduceMotion ? "auto" : "smooth";

    const section = document.getElementById(hash.slice(1));
    if (!section) return;

    section.scrollIntoView({ behavior, block: "start" });
    window.history.replaceState(null, "", `${path}${hash}`);
    setActiveSection({ pathname, hash });
  };

  const navigationContent = (
    <>
      <Link className="back-to-choice" href="/" onClick={closeMenu} aria-label="Schimbă categoria de servicii" title="Schimbă categoria de servicii">
        <ArrowLeft aria-hidden="true" />
        <span>Schimbă categoria</span>
      </Link>
      <nav className="side-nav" aria-label={`Navigare ${context.label}`}>
        {context.navigation.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          return (
            <Link
              aria-label={`Navighează la ${item.label} - ${context.label}`}
              aria-current={active ? (item.href.includes("#") ? "location" : "page") : undefined}
              className={active ? "active" : ""}
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
    </>
  );

  const supportContent = (
    <>
      <div className="sidebar-contact">
        <span>Ai o situație de analizat?</span>
        {siteConfig.phoneHref && <a href={`tel:${siteConfig.phoneHref}`} onClick={closeMenu} aria-label={`Sună ${siteConfig.name}`} title={`Sună ${siteConfig.name}`}><Phone aria-hidden="true" /> {siteConfig.phoneDisplay}</a>}
        <a href={`mailto:${siteConfig.email}`} onClick={closeMenu} title={`Trimite email către ${siteConfig.name}`}><Mail aria-hidden="true" /> {siteConfig.email}</a>
        <Link className="sidebar-cta" href={context.contactHref} onClick={closeMenu} aria-label={`Solicită o discuție cu ${siteConfig.name}`} title={`Solicită o discuție cu ${siteConfig.name}`}>
          Trimite o solicitare
        </Link>
      </div>
      <div className="sidebar-legal">
        <a href="/confidentialitate" onClick={closeMenu} title="Politica de confidențialitate">Confidențialitate</a>
        <a href="/termeni" onClick={closeMenu} title="Termeni și condiții">Termeni</a>
        <CookieSettingsButton compact />
      </div>
    </>
  );

  return (
    <>
      <aside className="sidebar">
        <header className="sidebar-header">
          <Link className="sidebar-brand" href="/" aria-label={`${siteConfig.name}, pagina de alegere`} title={`${siteConfig.name}, pagina de alegere`}>
            <Brand priority />
            <small>{context.label}</small>
          </Link>
          {navigationContent}
        </header>
        {supportContent}
      </aside>

      <header className="mobile-header">
        <Link href="/" aria-label={`${siteConfig.name}, pagina de alegere`} title={`${siteConfig.name}, pagina de alegere`}><Brand compact priority /></Link>
        <span className="mobile-context">{context.label}</span>
        <button
          type="button"
          ref={menuButtonRef}
          className="menu-button"
          onClick={() => setMenuState(true)}
          aria-label="Deschide meniul"
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation-drawer"
          aria-haspopup="dialog"
        >
          <Menu aria-hidden="true" />
        </button>
      </header>

      <div
        ref={drawerRef}
        className="mobile-drawer"
        data-open={menuOpen ? "true" : undefined}
        hidden={!menuOpen}
        id="mobile-navigation-drawer"
        role="dialog"
        aria-modal="true"
        aria-hidden={!menuOpen}
        aria-label={`Meniu ${context.label}`}
      >
        <div className="drawer-top">
          <Link href="/" onClick={closeMenu} aria-label={`${siteConfig.name}, pagina de alegere`} title={`${siteConfig.name}, pagina de alegere`}><Brand /></Link>
          <button
            type="button"
            className="drawer-close"
            onClick={closeMenu}
            aria-label="Închide meniul"
          >
            <X aria-hidden="true" />
          </button>
        </div>
        <p className="drawer-context"><Sparkles /> {context.label}</p>
        {navigationContent}
        {supportContent}
      </div>
    </>
  );
}
