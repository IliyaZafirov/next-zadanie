import H1 from "@/components/h1";
import { getTranslations } from "next-intl/server";
import EventsList from "@/components/admin/events-list";
import AdminNavigation from "@/components/admin/nav-admin";
import { getAdminRole } from "@/lib/get-admin-role";

export default async function Page() {
  const t = await getTranslations("AdminPage");

  const { isAdmin, role } = await getAdminRole();

  return (
    <main className="p-6">
      <H1 className="mb-4">{t("h1")}</H1>

      {isAdmin && <AdminNavigation />}


      <EventsList />
    </main>
  );
}
