"use client";

import { useEffect, useState } from "react";

type EventItem = {
  id: number;
  username: string | null;
  type: string;
  details: string;
  created_at: string;
};

export default function EventsList() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  async function fetchEvents() {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/events`, {
        credentials: "include",
      });
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
    <div className="bg-gray-800 p-4 rounded-lg">
      <h1 className="text-xl font-bold text-white mb-4">Списък със събития</h1>
      <table className="w-full text-white text-sm">
        <thead>
          <tr className="border-b border-gray-600">
            <th className="p-2 text-left">ID</th>
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
              <td className="p-2">{new Date(e.created_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
