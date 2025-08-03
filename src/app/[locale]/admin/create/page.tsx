"use client";

import { useEffect, useState } from "react";
import H1 from "@/components/h1";
import GlassLink from "@/components/ui/link-glass";
import GlassButton from "@/components/ui/btn-glass";

export default function Page() {
  const [type, setType] = useState<"region" | "section" | "control">("region");
  const [name, setName] = useState("");
  const [parentId, setParentId] = useState<number | "">("");
  const [regions, setRegions] = useState<{ id: number; name: string }[]>([]);
  const [sections, setSections] = useState<{ id: number; name: string }[]>([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const resRegions = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/regions`,
          {
            credentials: "include",
          }
        );
        const dataRegions = await resRegions.json();
        if (dataRegions.success) setRegions(dataRegions.data);

        const resSections = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/sections`,
          {
            credentials: "include",
          }
        );
        const dataSections = await resSections.json();
        if (dataSections.success) setSections(dataSections.data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/create`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            type,
            name,
            parent_id: parentId || undefined,
          }),
        }
      );

      const data = await res.json();
      if (data.success) {
        setMessage("Създадено успешно!");
        setName("");
        setParentId("");
      } else {
        setMessage("Грешка при създаване.");
      }
    } catch (err) {
      console.log(err);
      setMessage("Сървърна грешка");
    }
  };

  return (
    <main className="mt-26 p-6">
      <H1 className="mb-4">
        Must Fix this h1 Create
        {/* {t("h1")} */}
      </H1>

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
      {/* {isAdmin && <AdminNavigation />} */}
      
      <div className="flex">
        <form
          onSubmit={handleSubmit}
          className=" bg-gray-900 p-4  text-white max-w-lg"
        >
          <label className="block mb-2">Тип</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value as any)}
            className="w-full bg-gray-700 p-2 rounded mb-4"
          >
            <option value="region">Регион</option>
            <option value="section">Секция</option>
            <option value="control">Контрола</option>
          </select>

          <label className="block mb-2">Име</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full bg-gray-700 p-2 rounded mb-4"
          />

          {(type === "section" || type === "control") && (
            <>
              <label className="block mb-2">
                {type === "section" ? "Регион" : "Секция"}
              </label>
              <select
                value={parentId}
                onChange={(e) => setParentId(Number(e.target.value))}
                required
                className="w-full bg-gray-700 p-2 rounded mb-4"
              >
                <option value="">-- Избери --</option>
                {(type === "section" ? regions : sections).map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </>
          )}
          <GlassButton
            type="submit"
            className="bg-gray-800/30 px-4 py-2 text-sm mt-4"
          >
            Създай
          </GlassButton>

          {message && <p className="mt-4 text-green-400">{message}</p>}
        </form>
      </div>
    </main>
  );
}
