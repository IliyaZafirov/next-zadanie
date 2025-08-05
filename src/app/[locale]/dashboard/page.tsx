import H1 from "@/components/h1";
import ControlButton from "@/components/ui/btn-control";
import { getTranslations } from "next-intl/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import GlassLink from "@/components/ui/link-glass";

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
    console.log(err);
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/my-controls`,
    {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Cookie: `userRegistered=${token}`,
      },
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch controls");
  }

  const { success, data } = await response.json();

  const controls: Control[] = data;

  const map = new Map<
    string,
    { region: string; section: string; ctrls: Control[] }
  >();

  for (const ctrl of controls) {
    const key = `${ctrl.region_name}|${ctrl.section_name}`;

    if (!map.has(key)) {
      map.set(key, {
        region: ctrl.region_name,
        section: ctrl.section_name,
        ctrls: [],
      });
    }

    map.get(key)!.ctrls.push(ctrl);
  }

  const renderData = Array.from(map.values());

  console.log(renderData);

  return (
    <main className="flex flex-col items-center my-16 pt-16 w-full max-w-4xl mx-auto">
      <H1 className="text-white/70 my-8">{t("h1")}</H1>

      {(role === "admin" || role === "power_admin") && (
        <GlassLink
          href="/admin"
          className="bg-gray-800/30 px-4 py-2 mb-6"
          textSize="!capitalize"
        >
          {t("admin-panel")}
        </GlassLink>
      )}

      {renderData.map(({ region, section, ctrls }) => (
        <section
          key={`${region}-${section}`}
          className="w-full bg-gray-900 p-4 mb-6"
        >
          <p className="text-lg font-bold text-white/60 mb-2">
            {t("region")}: {region}
          </p>
          <h3 className="text-md font-semibold text-cyan-500">{section}</h3>
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
        </section>
      ))}
    </main>
  );
}
