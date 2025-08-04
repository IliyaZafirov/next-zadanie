import React from "react";
import GlassLink from "../ui/link-glass";
import { getTranslations } from "next-intl/server";

export default async function AdminNavigation() {
  const t = await getTranslations("AdminNavigation");
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <GlassLink
        href="/admin/users"
        className="bg-gray-800/30 px-4 py-2 text-xs md:text-base"
        textSize="!capitalize"
      >
        {t("users")}
      </GlassLink>
      <GlassLink
        href="/admin/controls"
        className="bg-gray-800/30 px-4 py-2 text-xs md:text-base"
        textSize="!capitalize"
      >
        {t("controls")}
      </GlassLink>
      <GlassLink
        href="/admin/create"
        className="bg-gray-800/30 px-4 py-2 text-xs md:text-base"
        textSize="!capitalize"
      >
        {t("create")}
      </GlassLink>
      <GlassLink
        href="/admin/events"
        className="bg-gray-800/30 px-4 py-2 text-xs md:text-base"
        textSize="!capitalize"
      >
        {t("events-lists")}
      </GlassLink>
      <GlassLink
        href="/dashboard"
        className="bg-gray-800/30 px-4 py-2 text-xs md:text-base"
        textSize="!capitalize"
      >
        {t("dashboard")}
      </GlassLink>
    </div>
  );
}
