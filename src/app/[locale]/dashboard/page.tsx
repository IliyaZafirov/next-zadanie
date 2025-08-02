import H1 from "@/components/h1";
import ControlButton from "@/components/ui/btn-control";
import { getTranslations } from "next-intl/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import Link from "next/link";

type Control = {
  region_name: string;
  section_name: string;
  control_id: number;
  control_name: string;
};

export default async function Page() {
  const t = await getTranslations("DashboardPage");
  const cookieStore = await cookies();
  const token = cookieStore.get("userRegistered")?.value;

  if (!token) {
    return (
      <main className="flex flex-col items-center pt-16">
        <H1 className="text-red-500">{t("h1-noaccess")}</H1>
      </main>
    );
  }

  let role: string | null = null;
  try {
    const decoded = jwt.decode(token) as { role?: string };
    role = decoded?.role || null;
  } catch (err) {
    console.error("JWT decode error:", err);
  }

  const response = await fetch("hhttps://next-zadanie.vercel.app/api/my-controls", {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Cookie: `userRegistered=${token}`,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch controls");
  }

  const { success, data } = await response.json();

  if (!success || !data || data.length === 0) {
    return (
      <main className="flex flex-col items-center pt-16">
        <H1>{t("h1")}</H1>
        {/* Показваме бутона, ако е админ */}
        {(role === "admin" || role === "power_admin") && (
          <Link
            href="/admin"
            className="bg-yellow-500 hover:bg-yellow-400 text-black py-2 px-2 rounded-lg font-semibold mt-4"
          >
            {t("admin-panel")}
          </Link>
        )}
        <p className="mt-4 text-gray-400">{t("controls-not-exists")}</p>
      </main>
    );
  }

  const controls: Control[] = data;

  const grouped = controls.reduce((acc: any, c) => {
    if (!acc[c.region_name]) acc[c.region_name] = {};
    if (!acc[c.region_name][c.section_name])
      acc[c.region_name][c.section_name] = [];
    acc[c.region_name][c.section_name].push(c);
    return acc;
  }, {});

  return (
    <main className="flex flex-col items-center pt-16 w-full max-w-4xl mx-auto">
      <H1 className="text-white/70 my-8">{t("h1")}</H1>

      {(role === "admin" || role === "power_admin") && (
        <Link
          href="/admin"
          className="bg-yellow-500 hover:bg-yellow-400 text-black py-2 px-2  rounded-lg font-semibold mb-6"
        >
          {t("admin-panel")}
        </Link>
      )}

      {Object.entries(grouped).map(([region, sections]) => (
        <section
          key={region}
          className="w-full bg-gray-800 p-4 rounded-lg mb-6"
        >
          <p className="text-lg font-bold text-white/60 mb-2">
            {t("region")}: {region}
          </p>

          <section>
            <p>{t("sections")}:</p>
            {Object.entries(sections as Record<string, Control[]>).map(
              ([section, ctrls]) => (
                <div key={section} className="mb-4">
                  <h3 className="text-md font-semibold text-cyan-500">
                    {section}
                  </h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {ctrls.map((ctrl) => (
                      <ControlButton
                        key={ctrl.control_id}
                        controlButtonProps={{
                          control_id: ctrl.control_id,
                          control_name: ctrl.control_name,
                        }}
                      />
                    ))}
                  </div>
                </div>
              )
            )}
          </section>
        </section>
      ))}
    </main>
  );
}
