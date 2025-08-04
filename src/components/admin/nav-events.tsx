import { getTranslations } from "next-intl/server";
import GlassLink from "../ui/link-glass";
import { useTranslations } from "next-intl";

export default function EventsNavigation() {
  const t = useTranslations("AdminEventsNavigation");

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6 border-t pt-6 md:pt-0 border-white/40 md:border-none">
      <GlassLink
        href="/admin/events/registration"
        className="bg-gray-800/30 px-4 py-2 text-xs md:text-base"
        textSize="!capitalize"
      >
        {t("registration-events")}
      </GlassLink>
      <GlassLink
        href="/admin/events/change"
        className="bg-gray-800/30 px-4 py-2 text-xs md:text-base"
        textSize="!capitalize"
      >
        {t("change-pass-events")}
      </GlassLink>
      <GlassLink
        href="/admin/events/controls"
        className="bg-gray-800/30 px-4 py-2 text-xs md:text-base"
        textSize="!capitalize"
      >
        {t("controls-events")}
      </GlassLink>
      <GlassLink
        href="/admin/events/login"
        className="bg-gray-800/30 px-4 py-2 text-xs md:text-base"
        textSize="!capitalize"
      >
        {t("in-out-events")}
      </GlassLink>
    </div>
  );
}
