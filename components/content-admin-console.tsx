"use client";

import {
  BellRing,
  Check,
  ExternalLink,
  FilePenLine,
  ImageUp,
  Landmark,
  LoaderCircle,
  LogOut,
  Plus,
  Save,
  Settings2,
  Trash2
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { type FormEvent, useEffect, useMemo, useState } from "react";
import type { ContentStorage } from "@/lib/content-store";
import type { FundingProgram } from "@/lib/funding-programs";
import {
  announcementStatuses,
  slugifyContent,
  type Announcement,
  type ManagedContent
} from "@/lib/managed-content";

type AdminTab = "funding" | "announcements";
type Notice = { type: "success" | "error"; text: string } | null;

const requestHeaders = {
  "Content-Type": "application/json",
  "X-Requested-With": "XMLHttpRequest"
};

function newProgram(): FundingProgram {
  const id = `program-${Date.now()}`;
  return {
    id,
    code: "Codul apelului",
    title: "Program nou de finanțare",
    program: "Program de finanțare",
    status: "În pregătire",
    audience: "Beneficiarii eligibili vor fi completați după verificarea ghidului.",
    summary: "Descrie pe scurt obiectivul programului și tipul investiției finanțate.",
    value: "De completat",
    cofinancing: "De completat",
    region: "De completat",
    image: "/images/funding-hero-manufacturing.webp",
    imageAlt: "Imagine relevantă pentru programul de finanțare",
    sourceUrl: "https://www.fonduri-ue.ro/",
    lastVerified: "Neverificat încă"
  };
}

function newAnnouncement(): Announcement {
  const now = new Date().toISOString();
  const id = `anunt-${Date.now()}`;
  return {
    id,
    slug: id,
    title: "Anunț nou",
    excerpt: "Rezumatul scurt afișat în lista de anunțuri.",
    body: "Scrie aici informația completă. Folosește paragrafe scurte și date verificate.",
    category: "Informare",
    status: "Ciornă",
    publishedAt: now,
    updatedAt: now,
    sourceUrl: "",
    ctaLabel: "",
    ctaUrl: "",
    pinned: false
  };
}

function localDateTime(iso: string) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  const offset = date.getTimezoneOffset() * 60_000;
  return new Date(date.getTime() - offset).toISOString().slice(0, 16);
}

async function readJson(response: Response) {
  return response.headers.get("content-type")?.includes("application/json")
    ? response.json().catch(() => ({}))
    : {};
}

export function ContentAdminConsole({
  configured,
  initialAuthenticated,
  initialContent,
  initialStorage
}: {
  configured: boolean;
  initialAuthenticated: boolean;
  initialContent: ManagedContent | null;
  initialStorage: ContentStorage | null;
}) {
  const [authenticated, setAuthenticated] = useState(initialAuthenticated);
  const [content, setContent] = useState(initialContent);
  const [storage, setStorage] = useState(initialStorage);
  const [tab, setTab] = useState<AdminTab>("funding");
  const [selectedId, setSelectedId] = useState(initialContent?.fundingPrograms[0]?.id || "");
  const [dirty, setDirty] = useState(false);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState<Notice>(null);

  const currentProgram = useMemo(
    () => content?.fundingPrograms.find((program) => program.id === selectedId) ?? null,
    [content, selectedId]
  );
  const currentAnnouncement = useMemo(
    () => content?.announcements.find((announcement) => announcement.id === selectedId) ?? null,
    [content, selectedId]
  );

  useEffect(() => {
    if (!dirty) return;
    const warn = (event: BeforeUnloadEvent) => event.preventDefault();
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  const loadContent = async () => {
    const response = await fetch("/api/admin/content", { cache: "no-store" });
    const result = await readJson(response) as { content?: ManagedContent; storage?: ContentStorage; message?: string };
    if (!response.ok || !result.content) throw new Error(result.message || "Conținutul nu a putut fi încărcat.");
    setContent(result.content);
    setStorage(result.storage ?? null);
    setSelectedId(result.content.fundingPrograms[0]?.id || result.content.announcements[0]?.id || "");
    setDirty(false);
  };

  const login = async (username: string, password: string) => {
    setBusy(true);
    setNotice(null);
    try {
      const response = await fetch("/api/admin/session", {
        method: "POST",
        headers: requestHeaders,
        body: JSON.stringify({ username, password })
      });
      const result = await readJson(response) as { message?: string };
      if (!response.ok) throw new Error(result.message || "Autentificarea a eșuat.");
      setAuthenticated(true);
      await loadContent();
    } catch (error) {
      setNotice({ type: "error", text: error instanceof Error ? error.message : "Autentificarea a eșuat." });
    } finally {
      setBusy(false);
    }
  };

  const logout = async () => {
    await fetch("/api/admin/session", { method: "DELETE", headers: { "X-Requested-With": "XMLHttpRequest" } });
    setAuthenticated(false);
    setContent(null);
    setStorage(null);
    setDirty(false);
  };

  const save = async () => {
    if (!content) return;
    setBusy(true);
    setNotice(null);
    try {
      const response = await fetch("/api/admin/content", {
        method: "PUT",
        headers: requestHeaders,
        body: JSON.stringify(content)
      });
      const result = await readJson(response) as { content?: ManagedContent; message?: string };
      if (!response.ok || !result.content) throw new Error(result.message || "Modificările nu au putut fi salvate.");
      setContent(result.content);
      setDirty(false);
      setNotice({ type: "success", text: result.message || "Modificările au fost publicate." });
    } catch (error) {
      setNotice({ type: "error", text: error instanceof Error ? error.message : "Modificările nu au putut fi salvate." });
    } finally {
      setBusy(false);
    }
  };

  const switchTab = (nextTab: AdminTab) => {
    setTab(nextTab);
    const nextId = nextTab === "funding" ? content?.fundingPrograms[0]?.id : content?.announcements[0]?.id;
    setSelectedId(nextId || "");
    setNotice(null);
  };

  const updateProgram = <K extends keyof FundingProgram>(field: K, value: FundingProgram[K]) => {
    if (!content || !currentProgram) return;
    setContent({
      ...content,
      fundingPrograms: content.fundingPrograms.map((program) => program.id === currentProgram.id ? { ...program, [field]: value } : program)
    });
    setDirty(true);
  };

  const updateAnnouncement = <K extends keyof Announcement>(field: K, value: Announcement[K]) => {
    if (!content || !currentAnnouncement) return;
    setContent({
      ...content,
      announcements: content.announcements.map((announcement) => announcement.id === currentAnnouncement.id
        ? { ...announcement, [field]: value, updatedAt: new Date().toISOString() }
        : announcement)
    });
    setDirty(true);
  };

  const addItem = () => {
    if (!content) return;
    if (tab === "funding") {
      const item = newProgram();
      setContent({ ...content, fundingPrograms: [item, ...content.fundingPrograms] });
      setSelectedId(item.id);
    } else {
      const item = newAnnouncement();
      setContent({ ...content, announcements: [item, ...content.announcements] });
      setSelectedId(item.id);
    }
    setDirty(true);
    setNotice(null);
  };

  const removeItem = () => {
    if (!content || !selectedId || !window.confirm("Ștergi definitiv acest element? Modificarea devine publică după salvare.")) return;
    if (tab === "funding") {
      const remaining = content.fundingPrograms.filter((item) => item.id !== selectedId);
      setContent({ ...content, fundingPrograms: remaining });
      setSelectedId(remaining[0]?.id || "");
    } else {
      const remaining = content.announcements.filter((item) => item.id !== selectedId);
      setContent({ ...content, announcements: remaining });
      setSelectedId(remaining[0]?.id || "");
    }
    setDirty(true);
  };

  const uploadImage = async (file: File) => {
    if (!currentProgram) return;
    setBusy(true);
    setNotice(null);
    try {
      const formData = new FormData();
      formData.set("file", file);
      const response = await fetch("/api/admin/media", {
        method: "POST",
        headers: { "X-Requested-With": "XMLHttpRequest" },
        body: formData
      });
      const result = await readJson(response) as { url?: string; message?: string };
      if (!response.ok || !result.url) throw new Error(result.message || "Imaginea nu a putut fi încărcată.");
      updateProgram("image", result.url);
      setNotice({ type: "success", text: "Imagine încărcată. Salvează modificările pentru a o publica." });
    } catch (error) {
      setNotice({ type: "error", text: error instanceof Error ? error.message : "Imaginea nu a putut fi încărcată." });
    } finally {
      setBusy(false);
    }
  };

  if (!configured) return <AdminSetup />;
  if (!authenticated) return <AdminLogin onLogin={login} busy={busy} notice={notice} />;
  if (!content) return <AdminLoading />;

  const items = tab === "funding" ? content.fundingPrograms : content.announcements;

  return (
    <main className="content-admin">
      <header className="content-admin-header">
        <div>
          <Link href="/" className="content-admin-brand">Capital European</Link>
          <span>Administrare conținut</span>
        </div>
        <div className="content-admin-actions">
          <span className="content-admin-storage" data-writable={storage?.writable}>{storage?.label || "Stocare necunoscută"}</span>
          <button type="button" className="admin-icon-button" onClick={logout} title="Deconectare" aria-label="Deconectare"><LogOut aria-hidden="true" /></button>
        </div>
      </header>

      <section className="content-admin-shell" aria-labelledby="content-admin-title">
        <div className="content-admin-intro">
          <div>
            <p><Settings2 aria-hidden="true" /> Panou editorial</p>
            <h1 id="content-admin-title">Fonduri și anunțuri</h1>
            <span>Editează conținutul, verifică previzualizarea și publică toate schimbările printr-o singură salvare.</span>
          </div>
          <button type="button" className="admin-save-button" onClick={save} disabled={!dirty || busy || !storage?.writable}>
            {busy ? <LoaderCircle className="spin" aria-hidden="true" /> : dirty ? <Save aria-hidden="true" /> : <Check aria-hidden="true" />}
            {busy ? "Se salvează" : dirty ? "Publică modificările" : "Totul este salvat"}
          </button>
        </div>

        {notice && <p className="admin-notice" data-type={notice.type} role={notice.type === "error" ? "alert" : "status"}>{notice.text}</p>}
        {!storage?.writable && <p className="admin-notice" data-type="error">Conectează o bază de date PostgreSQL la proiect înainte de publicare.</p>}

        <div className="admin-tabs" role="tablist" aria-label="Tip de conținut">
          <button type="button" role="tab" aria-selected={tab === "funding"} onClick={() => switchTab("funding")}><Landmark aria-hidden="true" /> Fonduri <span>{content.fundingPrograms.length}</span></button>
          <button type="button" role="tab" aria-selected={tab === "announcements"} onClick={() => switchTab("announcements")}><BellRing aria-hidden="true" /> Anunțuri <span>{content.announcements.length}</span></button>
        </div>

        <div className="admin-workspace">
          <aside className="admin-item-list" aria-label={tab === "funding" ? "Carduri de finanțare" : "Anunțuri"}>
            <div className="admin-item-list-head">
              <strong>{tab === "funding" ? "Carduri de finanțare" : "Anunțuri"}</strong>
              <button type="button" onClick={addItem}><Plus aria-hidden="true" /> Adaugă</button>
            </div>
            <div className="admin-item-scroll">
              {items.map((item) => (
                <button className="admin-item-row" data-active={item.id === selectedId} type="button" key={item.id} onClick={() => setSelectedId(item.id)}>
                  <span>{item.title}</span>
                  <small>{"status" in item ? item.status : ""}</small>
                </button>
              ))}
              {!items.length && <p className="admin-empty-list">Nu există elemente. Folosește „Adaugă”.</p>}
            </div>
          </aside>

          <section className="admin-editor" aria-label="Editor conținut">
            {tab === "funding" && currentProgram && (
              <FundingEditor program={currentProgram} update={updateProgram} uploadImage={uploadImage} canUpload={Boolean(storage?.mediaWritable)} />
            )}
            {tab === "announcements" && currentAnnouncement && (
              <AnnouncementEditor announcement={currentAnnouncement} update={updateAnnouncement} />
            )}
            {!selectedId && <div className="admin-editor-empty"><FilePenLine aria-hidden="true" /><h2>Alege sau adaugă un element</h2></div>}
            {selectedId && <button type="button" className="admin-delete-button" onClick={removeItem}><Trash2 aria-hidden="true" /> Șterge elementul</button>}
          </section>
        </div>
      </section>
    </main>
  );
}

function AdminLogin({ onLogin, busy, notice }: { onLogin: (username: string, password: string) => Promise<void>; busy: boolean; notice: Notice }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const submit = (event: FormEvent) => {
    event.preventDefault();
    void onLogin(username, password);
  };
  return (
    <main className="admin-auth-page">
      <form className="admin-auth-panel" onSubmit={submit}>
        <p className="admin-auth-kicker"><Settings2 aria-hidden="true" /> Capital European</p>
        <h1>Administrare conținut</h1>
        <p>Acces protejat pentru actualizarea fondurilor și anunțurilor publice.</p>
        <label><span>Utilizator</span><input type="text" name="username" autoComplete="username" value={username} onChange={(event) => setUsername(event.target.value)} required minLength={3} autoFocus /></label>
        <label><span>Parolă</span><input type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} required minLength={12} /></label>
        {notice && <p className="admin-login-error" role="alert">{notice.text}</p>}
        <button type="submit" disabled={busy || username.trim().length < 3 || password.length < 12}>{busy && <LoaderCircle className="spin" aria-hidden="true" />}{busy ? "Se verifică" : "Intră în panou"}</button>
        <Link href="/">Înapoi la site</Link>
      </form>
    </main>
  );
}

function AdminSetup() {
  return (
    <main className="admin-auth-page">
      <section className="admin-auth-panel">
        <p className="admin-auth-kicker"><Settings2 aria-hidden="true" /> Configurare necesară</p>
        <h1>Activează panoul de administrare</h1>
        <p>Adaugă în Vercel variabilele <code>ADMIN_USERNAME</code>, <code>ADMIN_PASSWORD</code> și <code>ADMIN_SESSION_SECRET</code>, apoi redeploy.</p>
        <p>Secretul de sesiune trebuie să aibă cel puțin 32 de caractere, iar parola minimum 12.</p>
        <Link href="/">Înapoi la site</Link>
      </section>
    </main>
  );
}

function AdminLoading() {
  return <main className="admin-auth-page"><div className="admin-auth-panel"><LoaderCircle className="spin" aria-hidden="true" /><h1>Se încarcă panoul</h1></div></main>;
}

function FundingEditor({
  program,
  update,
  uploadImage,
  canUpload
}: {
  program: FundingProgram;
  update: <K extends keyof FundingProgram>(field: K, value: FundingProgram[K]) => void;
  uploadImage: (file: File) => Promise<void>;
  canUpload: boolean;
}) {
  return (
    <div className="admin-editor-form">
      <header><div><p>Card de finanțare</p><h2>{program.title}</h2></div><a href="/fonduri-europene#fonduri-active" target="_blank" rel="noopener noreferrer">Vezi pagina <ExternalLink aria-hidden="true" /></a></header>
      <div className="admin-image-editor">
        <figure><Image src={program.image} alt={program.imageAlt || "Previzualizare"} fill sizes="320px" /></figure>
        <div>
          <label><span>Cale sau URL imagine</span><input value={program.image} onChange={(event) => update("image", event.target.value)} required /></label>
          <label className="admin-upload-button" aria-disabled={!canUpload}><ImageUp aria-hidden="true" /> Încarcă imagine<input type="file" accept="image/jpeg,image/png,image/webp,image/avif" disabled={!canUpload} onChange={(event) => { const file = event.target.files?.[0]; if (file) void uploadImage(file); event.currentTarget.value = ""; }} /></label>
          <small>{canUpload ? "JPG, PNG, WebP sau AVIF, maximum 3 MB." : "Conectează Vercel Blob pentru upload; poți folosi în continuare o cale existentă."}</small>
        </div>
      </div>
      <div className="admin-form-grid">
        <label className="wide"><span>Titlu</span><input value={program.title} maxLength={180} onChange={(event) => update("title", event.target.value)} /></label>
        <label><span>ID unic</span><input value={program.id} maxLength={100} readOnly aria-readonly="true" /></label>
        <label><span>Status</span><select value={program.status} onChange={(event) => update("status", event.target.value as FundingProgram["status"])}><option>Deschis</option><option>În pregătire</option><option>Închis</option></select></label>
        <label><span>Program / categorie</span><input value={program.program} maxLength={120} onChange={(event) => update("program", event.target.value)} /></label>
        <label><span>Cod apel</span><input value={program.code} maxLength={160} onChange={(event) => update("code", event.target.value)} /></label>
        <label className="wide"><span>Rezumat</span><textarea rows={4} value={program.summary} maxLength={600} onChange={(event) => update("summary", event.target.value)} /></label>
        <label className="wide"><span>Beneficiari</span><textarea rows={3} value={program.audience} maxLength={350} onChange={(event) => update("audience", event.target.value)} /></label>
        <label><span>Valoare</span><input value={program.value} maxLength={180} onChange={(event) => update("value", event.target.value)} /></label>
        <label><span>Cofinanțare</span><input value={program.cofinancing} maxLength={180} onChange={(event) => update("cofinancing", event.target.value)} /></label>
        <label><span>Arie / regiune</span><input value={program.region} maxLength={180} onChange={(event) => update("region", event.target.value)} /></label>
        <label><span>Ultima verificare</span><input value={program.lastVerified} maxLength={120} onChange={(event) => update("lastVerified", event.target.value)} /></label>
        <label className="wide"><span>Text alternativ imagine</span><input value={program.imageAlt} maxLength={220} onChange={(event) => update("imageAlt", event.target.value)} /></label>
        <label className="wide"><span>Sursă oficială HTTPS</span><input type="url" value={program.sourceUrl} maxLength={600} onChange={(event) => update("sourceUrl", event.target.value)} /></label>
      </div>
    </div>
  );
}

function AnnouncementEditor({ announcement, update }: { announcement: Announcement; update: <K extends keyof Announcement>(field: K, value: Announcement[K]) => void }) {
  return (
    <div className="admin-editor-form">
      <header><div><p>Anunț</p><h2>{announcement.title}</h2></div>{announcement.status === "Publicat" && <Link href={`/anunturi/${announcement.slug}`} target="_blank">Vezi pagina <ExternalLink aria-hidden="true" /></Link>}</header>
      <div className="admin-form-grid">
        <label className="wide"><span>Titlu</span><input value={announcement.title} maxLength={180} onChange={(event) => update("title", event.target.value)} /></label>
        <label><span>Adresă URL</span><input value={announcement.slug} maxLength={100} pattern="[a-z0-9-]+" onChange={(event) => update("slug", slugifyContent(event.target.value))} /></label>
        <label><span>Categorie</span><input value={announcement.category} maxLength={80} onChange={(event) => update("category", event.target.value)} /></label>
        <label><span>Status</span><select value={announcement.status} onChange={(event) => update("status", event.target.value as Announcement["status"])}>{announcementStatuses.map((status) => <option key={status}>{status}</option>)}</select></label>
        <label><span>Data publicării</span><input type="datetime-local" value={localDateTime(announcement.publishedAt)} onChange={(event) => { const date = new Date(event.target.value); if (!Number.isNaN(date.getTime())) update("publishedAt", date.toISOString()); }} /></label>
        <label className="admin-checkbox"><input type="checkbox" checked={announcement.pinned} onChange={(event) => update("pinned", event.target.checked)} /><span>Fixează primul în listă</span></label>
        <label className="wide"><span>Rezumat</span><textarea rows={4} value={announcement.excerpt} maxLength={420} onChange={(event) => update("excerpt", event.target.value)} /></label>
        <label className="wide"><span>Conținut</span><textarea rows={14} value={announcement.body} maxLength={10_000} onChange={(event) => update("body", event.target.value)} /><small>Separă paragrafele cu o linie liberă.</small></label>
        <label className="wide"><span>Sursă / document oficial (opțional)</span><input value={announcement.sourceUrl} maxLength={600} placeholder="https://..." onChange={(event) => update("sourceUrl", event.target.value)} /></label>
        <label><span>Text buton (opțional)</span><input value={announcement.ctaLabel} maxLength={80} onChange={(event) => update("ctaLabel", event.target.value)} /></label>
        <label><span>Destinație buton</span><input value={announcement.ctaUrl} maxLength={600} placeholder="/contact sau https://..." onChange={(event) => update("ctaUrl", event.target.value)} /></label>
      </div>
    </div>
  );
}
