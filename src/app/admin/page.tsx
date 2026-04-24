import { AdminPanel } from "@/components/admin-panel";
import { SiteHeader } from "@/components/site-header";

export const metadata = {
  title: "Админка каталога — HAMZA GROUP"
};

export default function AdminPage() {
  return (
    <>
      <SiteHeader />
      <AdminPanel />
    </>
  );
}
