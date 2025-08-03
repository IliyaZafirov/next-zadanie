import GlassLink from '../ui/link-glass'

export default function EventsNavigation() {
  return (
    <div className="flex gap-4 mb-6">
      <GlassLink
        href="/admin/events/registration"
        className="bg-gray-800/30 px-4 py-2"
        textSize="!capitalize"
      >
        Registration Events {/* {t("users")} */}
      </GlassLink>
      <GlassLink
        href="/admin/events/change"
        className="bg-gray-800/30 px-4 py-2"
        textSize="!capitalize"
      >
        Change Password Events {/* {t("controls")} */}
      </GlassLink>
      <GlassLink
        href="/admin/events/controls"
        className="bg-gray-800/30 px-4 py-2"
        textSize="!capitalize"
      >
        Controls Events {/* {t("create")} */}
      </GlassLink>
      <GlassLink
        href="/admin/events/login"
        className="bg-gray-800/30 px-4 py-2"
        textSize="!capitalize"
      >
        Login/Logout Events
      </GlassLink>
    </div>
  )
}
