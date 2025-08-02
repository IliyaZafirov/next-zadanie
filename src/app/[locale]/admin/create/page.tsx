"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function AdminCreatePage() {
  const [type, setType] = useState<"region" | "section" | "control">("region");
  const [name, setName] = useState("");
  const [parentId, setParentId] = useState<number | "">("");
  const [regions, setRegions] = useState<{ id: number; name: string }[]>([]);
  const [sections, setSections] = useState<{ id: number; name: string }[]>([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const resRegions = await fetch("/api/admin/regions", {
          credentials: "include",
        });
        const dataRegions = await resRegions.json();
        if (dataRegions.success) setRegions(dataRegions.data);

        const resSections = await fetch("/api/admin/sections", {
          credentials: "include",
        });
        const dataSections = await resSections.json();
        if (dataSections.success) setSections(dataSections.data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch("/api/admin/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          type,
          name,
          parent_id: parentId || undefined,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setMessage("Създадено успешно!");
        setName("");
        setParentId("");
      } else {
        setMessage("Грешка при създаване.");
      }
    } catch (err) {
      console.error(err);
      setMessage("Сървърна грешка");
    }
  };

  return (
    <main className="p-6">
      {/* Навигация */}
      <div className="flex gap-4 mb-6">
        <Link href="/admin" className="bg-purple-600 hover:bg-purple-500 py-2 px-2 rounded text-white">
          Controls
        </Link>
        <Link href="/admin/create" className="bg-green-600 hover:bg-green-500 py-2 px-2 rounded text-white">
          Create
        </Link>
        <Link href="/admin/events" className="bg-orange-600 hover:bg-orange-500 py-2 px-2 rounded text-white">
          Events
        </Link>
      </div>

      <h1 className="text-xl font-bold text-white mb-4">Създаване на елемент</h1>

      <form onSubmit={handleSubmit} className="bg-gray-800 p-4 rounded-lg text-white max-w-lg">
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

        <button type="submit" className="bg-amber-600 hover:bg-amber-500 px-4 py-2 rounded">
          Създай
        </button>

        {message && <p className="mt-4 text-green-400">{message}</p>}
      </form>
    </main>
  );
}
