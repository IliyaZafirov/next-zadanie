import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import H1 from "@/components/h1";
import AdminNavigation from "@/components/admin/nav-admin";
import GlassLink from "@/components/ui/link-glass";
import { getTranslations } from "next-intl/server";

type Control = {
  control_id: number;
  control_name: string;
  section_name: string;
  region_name: string;
};

async function getControls(): Promise<Control[]> {
  try {
    const cookieStore = await cookies();
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/controls`,
      {
        cache: "no-store",
        credentials: "include",
        headers: {
          Cookie: cookieStore
            .getAll()
            .map((c) => `${c.name}=${c.value}`)
            .join("; "),
        },
      }
    );

    const data = await res.json();
    if (!data.success) return [];
    return data.data;
  } catch (err) {
    console.log(err);
    return [];
  }
}

export default async function Page() {
  const t = await getTranslations("AdminControlsPage");

  const cookieStore = await cookies();
  const token = cookieStore.get("userRegistered")?.value;

  let isAdmin = false;
  if (token) {
    try {
      const decoded = jwt.decode(token) as { role?: string } | null;
      if (decoded?.role === "admin" || decoded?.role === "power_admin") {
        isAdmin = true;
      }
    } catch {
      isAdmin = false;
    }
  }

  if (!isAdmin) {
    return <main className="p-6 text-red-500">{t("no-access")}</main>;
  }

  const controls = await getControls();

  return (
    <main className="mt-26 p-6">
      {isAdmin && <AdminNavigation />}
      <H1 className="mb-4">{t("h1")}</H1>

      <div className="bg-gray-900 p-4 relative">
        <table className="w-full text-white text-sm">
          <thead className="hidden md:table-header-group">
            <tr className="border-b border-gray-600">
              <th className="p-2 text-left">{t("id")}</th>
              <th className="p-2 text-left">{t("controls")}</th>
              <th className="p-2 text-left">{t("section")}</th>
              <th className="p-2 text-left">{t("region")}</th>
              <th className="p-2 text-left">{t("action")}</th>
            </tr>
          </thead>
          <tbody>
            {controls.map((c) => (
              <tr
                key={c.control_id}
                className="border-b border-gray-700 block md:table-row mb-4 md:mb-0"
              >
                <td
                  data-label={t("id")}
                  className="p-2 block md:table-cell md:p-2 before:content-[attr(data-label)] 
                             before:block before:font-bold before:text-gray-400 md:before:hidden"
                >
                  {c.control_id}
                </td>
                <td
                  data-label={t("controls")}
                  className="p-2 block md:table-cell before:content-[attr(data-label)] 
                             before:block before:font-bold before:text-gray-400 md:before:hidden"
                >
                  {c.control_name}
                </td>
                <td
                  data-label={t("section")}
                  className="p-2 block md:table-cell before:content-[attr(data-label)] 
                             before:block before:font-bold before:text-gray-400 md:before:hidden"
                >
                  {c.section_name}
                </td>
                <td
                  data-label={t("region")}
                  className="p-2 block md:table-cell before:content-[attr(data-label)] 
                             before:block before:font-bold before:text-gray-400 md:before:hidden"
                >
                  {c.region_name}
                </td>
                <td
                  data-label={t("action")}
                  className="p-2 block md:table-cell before:content-[attr(data-label)] 
                             before:block before:font-bold before:text-gray-400 md:before:hidden"
                >
                  <GlassLink
                    href={`/admin/controls/${c.control_id}`}
                    className="bg-gray-800/30 px-4 py-2 text-sm block md:inline-block mt-2 md:mt-0"
                  >
                    {t("action-btn")}
                  </GlassLink>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {controls.length === 0 && (
        <p className="text-gray-400 mt-4">{t("no-controls")}</p>
      )}
    </main>
  );
}
