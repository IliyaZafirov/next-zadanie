import UsersTab from "@/components/admin/tab-users";
import H1 from "@/components/h1";
import { getTranslations } from "next-intl/server";
import AdminNavigation from "@/components/admin/nav-admin";
import { getAdminRole } from "@/lib/get-admin-role";

export default async function Page() {
  const t = await getTranslations("AdminPage");

  const { isAdmin, role } = await getAdminRole();

  return (
    <main className="p-6">
      <H1 className="mb-4">{t("h1")}</H1>

      {isAdmin && <AdminNavigation />}

      <UsersTab
        currentUserRole={role}
        labels={{
          id: t("id"),
          user: t("user"),
          email: t("email"),
          role: t("role"),
          status: t("status"),
          actions: t("actions"),
        }}
      />
    </main>
  );
}
