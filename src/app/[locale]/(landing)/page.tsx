import H1 from "@/components/h1";
import GlassLink from "@/components/ui/link-glass";
import { getTranslations } from "next-intl/server";

export default async function HomePage() {
  const t = await getTranslations("HomePage");
  return (
    <main className="flex flex-col flex-grow items-center px-3 sm:pt-2 md:pt-16 lg:pt-16 overflow-auto">
      <H1 className=" mt-4">{t("h1")}</H1>

      <section className="flex flex-row gap-x-4 mt-16">
        <GlassLink
          href="/register"
          textSize="text-sm"
          className="bg-gray-800/30 px-4 py-2"
        >
          {t("register-btn")}
        </GlassLink>
        <GlassLink
          href="/login"
          textSize="text-sm"
          className="bg-gray-800/30 px-4 py-2"
        >
          {t("login-btn")}
        </GlassLink>
      </section>
    </main>
  );
}
