"use client";

import { useEffect, useState } from "react";
import GlassButton from "../ui/btn-glass";

type Labels = {
  h1: string;
  type: string;
  name: string;
  region: string;
  section: string;
  choose: string;
  control: string;
  createBtn: string;
  messageSuccess: string;
  messageError: string;
  messageServerError: string;
};

export default function CreateTab({ labels }: { labels: Labels }) {
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
        try {
          await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/create-event`,
            {
              method: "POST",
              credentials: "include",
            }
          );
        } catch (logErr) {
          console.log(logErr);
        }
  
        setMessage(labels.messageSuccess);
        setName("");
        setParentId("");
      } else {
        setMessage(labels.messageError);
      }
    } catch (err) {
      console.log(err);
      setMessage(labels.messageServerError);
    }
  };

  return (
    <div className="flex">
      <form
        onSubmit={handleSubmit}
        className=" bg-gray-900 p-4  text-white max-w-lg"
      >
        <label className="block mb-2">{labels.type}</label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value as any)}
          className="w-full bg-gray-700 p-2 rounded mb-4"
        >
          <option value="region">{labels.region}</option>
          <option value="section">{labels.section}</option>
          <option value="control">{labels.control}</option>
        </select>

        <label className="block mb-2">{labels.name}</label>
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
              {type === "section" ? labels.region : labels.section}
            </label>
            <select
              value={parentId}
              onChange={(e) => setParentId(Number(e.target.value))}
              required
              className="w-full bg-gray-700 p-2 rounded mb-4"
            >
              <option value="">-- {labels.choose} --</option>
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
          {labels.createBtn}
        </GlassButton>
        {/* must fix message en/bg */}
        {message && <p className="mt-4 text-green-400">{message}</p>}
      </form>
    </div>
  );
}
