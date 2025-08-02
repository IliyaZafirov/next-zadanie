import H1 from "@/components/h1";
import { getTranslations } from "next-intl/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import Link from "next/link";
import EventsList from "@/components/admin/events-list";

export default async function EventsPage() {
  const t = await getTranslations("AdminPage");
  const cookieStore = await cookies();
  const token = cookieStore.get("userRegistered")?.value;

  let role: string | null = null;
  if (token) {
    try {
      const decoded = jwt.decode(token) as { id: number; role?: string } | null;
      role = decoded?.role || null;
    } catch {
      role = null;
    }
  }

  const isAdmin = role === "admin" || role === "power_admin";

  return (
    <main className="p-6">
      <H1 className="mb-4">{t("h1")}</H1>

      {isAdmin && (
        <div className="flex gap-4 mb-6">
          <Link
            href="/admin"
            className="bg-purple-600 hover:bg-purple-500 py-2 px-2 rounded text-white"
          >
            Controls
          </Link>
          <Link
            href="/admin/create"
            className="bg-green-600 hover:bg-green-500 py-2 px-2 rounded text-white"
          >
            Create
          </Link>
          <Link
            href="/admin/events"
            className="bg-orange-600 hover:bg-orange-500 py-2 px-2 rounded text-white"
          >
            Events
          </Link>
        </div>
      )}

      <EventsList />
    </main>
  );
}
