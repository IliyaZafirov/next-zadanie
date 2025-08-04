"use client";

import { useEffect, useState } from "react";
import EventsNavigation from "./nav-events";
import H1 from "../h1";

type EventItem = {
  id: number;
  username: string | null;
  type: string;
  details: string;
  created_at: string;
};

type Labels = {
  h1: string;
  controlId: string | number;
  username: string;
  type: string;
  details: string;
  date: string;
};

export default function ChangePassEventsList({ labels }: { labels: Labels }) {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  async function fetchEvents() {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/change-pass-events`,
        {
          cache: "no-store",
          credentials: "include",
        }
      );
      const data = await res.json();

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
    <>
      <EventsNavigation />
      <H1 className="mb-4">{labels.h1}</H1>

      <div className="bg-gray-900 p-4">
        <table className="w-full text-white text-sm">
          <thead>
            <tr className="border-b border-gray-600">
              <th className="p-2 text-left">{labels.controlId}</th>
              <th className="p-2 text-left">{labels.username}</th>
              <th className="p-2 text-left">{labels.type}</th>
              <th className="p-2 text-left">{labels.details}</th>
              <th className="p-2 text-left">{labels.date}</th>
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
    </>
  );
}
