"use client";

import { useEffect, useState } from "react";
import H1 from "../h1";
import GlassLink from "../ui/link-glass";
import EventsNavigation from "./nav-events";

type EventItem = {
  id: number;
  username: string | null;
  type: string;
  details: string;
  created_at: string;
};

export default function ControlsEventsList() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  async function fetchEvents() {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/events`,
        {
          credentials: "include",
        }
      );
      const data = await res.json();

      console.log(data);

      if (data.success) {
        setEvents(data.data);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <p className="text-white">Зареждане...</p>;

  return (
    <main className="mt-26 p-6">
      <H1>Списък събития при клик</H1>
      {/* Must fix this Nav - no auth now  */}
      <div className="flex gap-4 mb-6">
        <GlassLink
          href="/admin/users"
          className="bg-gray-800/30 px-4 py-2"
          textSize="!capitalize"
        >
          Users {/* {t("controls")} */}
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
          Events List
        </GlassLink>
        <GlassLink
          href="/dashboard"
          className="bg-gray-800/30 px-4 py-2"
          textSize="!capitalize"
        >
          Dashboard
        </GlassLink>
      </div>
      <EventsNavigation />
      <div className="bg-gray-900 p-4">
        <h2 className="text-xl font-bold text-white mb-4">
          Списък със контролни събития
        </h2>
        <table className="w-full text-white text-sm">
          <thead>
            <tr className="border-b border-gray-600">
              <th className="p-2 text-left">ID Control</th>
              <th className="p-2 text-left">Потребител</th>
              <th className="p-2 text-left">Тип</th>
              <th className="p-2 text-left">Детайли</th>
              <th className="p-2 text-left">Дата</th>
            </tr>
          </thead>
          <tbody>
            {events.map((e) => (
              <tr key={e.id} className="border-b border-gray-700">
                <td className="p-2">{e.id}</td>
                <td className="p-2">{e.username || "—"}</td>
                <td className="p-2">{e.type}</td>
                <td className="p-2">
                  <pre className="whitespace-pre-wrap text-gray-300">
                    {e.details}
                  </pre>
                </td>
                <td className="p-2">
                  {new Date(e.created_at).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
