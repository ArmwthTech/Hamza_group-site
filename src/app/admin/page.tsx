import { AdminPanel } from "@/components/admin-panel";
import { SiteHeader } from "@/components/site-header";

export const metadata = {
  title: "Админка каталога — HAMZA GROUP"
};

export const dynamic = "force-dynamic";

export default function AdminPage() {
  return (
    <>
      <SiteHeader />
      <AdminPanel passwordConfigured={Boolean(process.env.ADMIN_PASSWORD)} />
    </>
  );
}
