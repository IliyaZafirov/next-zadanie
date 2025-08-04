import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import AdminNavigation from "@/components/admin/nav-admin";
import { getTranslations } from "next-intl/server";
import RegistrationEventsList from "@/components/admin/registration-events-lists";

export default async function Page() {
  const t = await getTranslations("AdminRegisterEventsPage");

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

      <RegistrationEventsList
        labels={{
          h1: t("h1"),
          controlId: t("control-id"),
          username: t("username"),
          type: t("type"),
          details: t("details"),
          date: t("date"),
        }}
      />
    </main>
  );
}
