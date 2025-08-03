import UsersTab from "@/components/admin/tab-users";
import { getTranslations } from "next-intl/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import H1 from "@/components/h1";
import AdminNavigation from "@/components/admin/nav-admin";

export default async function Page() {
  const t = await getTranslations("AdminUsersPage");
  const cookieStore = await cookies();
  const token = cookieStore.get("userRegistered")?.value;

  let role: string | null = null;

  if (token) {
    try {
      const decoded = jwt.decode(token) as { id: number; role?: string } | null;
      role = decoded?.role || null;
    } catch (err) {
      role = null;
    }
  }

  let safeRole: "admin" | "power_admin" | null = null;

  if (role === "admin" || role === "power_admin") {
    safeRole = role;
  }

  const isAdmin = role === "admin" || role === "power_admin";

  return (
    <main className="mt-26 p-6">
      {isAdmin && <AdminNavigation />}
      <H1 className="mb-4">{t("h1")}</H1>

      <UsersTab
        currentUserRole={safeRole}
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
