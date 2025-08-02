import React from "react";
import GlassLink from "../ui/link-glass";

export default function AdminNavigation() {
  return (
    <div className="flex gap-4 mb-6">
      <GlassLink
        href="/admin/users"
        className="bg-gray-800/30 px-4 py-2"
        textSize="!capitalize"
      >
        Users {/* {t("users")} */}
      </GlassLink>
      <GlassLink
        href="/admin/controls"
        className="bg-gray-800/30 px-4 py-2"
        textSize="!capitalize"
      >
        Controls {/* {t("controls")} */}
      </GlassLink>
      <GlassLink
        href="/admin/create"
        className="bg-gray-800/30 px-4 py-2"
        textSize="!capitalize"
      >
        Create {/* {t("create")} */}
      </GlassLink>
      <GlassLink
        href="/admin/events"
        className="bg-gray-800/30 px-4 py-2"
        textSize="!capitalize"
      >
        Events
      </GlassLink>
      <GlassLink
        href="/dashboard"
        className="bg-gray-800/30 px-4 py-2"
        textSize="!capitalize"
      >
        Dashboard
      </GlassLink>
    </div>
  );
}
