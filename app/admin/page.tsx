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
  const snapshot = authenticated ? await getManagedContentSnapshot() : null;

  return (
    <ContentAdminConsole
      configured={configured}
      initialAuthenticated={authenticated}
      initialContent={snapshot?.content ?? null}
      initialStorage={snapshot?.storage ?? null}
      initialSessionPolicy={adminSessionPolicy()}
    />
  );
}
