import type { Metadata } from "next";
import { ContentAdminConsole } from "@/components/content-admin-console";
import { adminSessionPolicy, isAdminAuthenticated, isAdminConfigured } from "@/lib/admin-auth";
import { getManagedContentSnapshot } from "@/lib/content-store";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Administrare conținut",
  robots: { index: false, follow: false, noarchive: true, nocache: true }
};

export default async function AdminPage() {
  const configured = isAdminConfigured();
  const authenticated = configured && await isAdminAuthenticated();
  let snapshot = null;
  let initialError = null;
  if (authenticated) {
    try {
      snapshot = await getManagedContentSnapshot();
    } catch {
      initialError = "Conținutul CMS nu poate fi încărcat în siguranță. Datele existente au fost păstrate.";
    }
  }

  return (
    <ContentAdminConsole
      configured={configured}
      initialAuthenticated={authenticated}
      initialContent={snapshot?.content ?? null}
      initialStorage={snapshot?.storage ?? null}
      initialSessionPolicy={adminSessionPolicy()}
      initialError={initialError}
    />
  );
}
