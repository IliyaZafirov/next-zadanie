import H1 from "@/components/h1";
import { getTranslations } from "next-intl/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
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
      <H1 className="mb-4">{t("h1")}</H1>
      {isAdmin && <AdminNavigation />}
    </main>
  );
}
