"use client";

import { useState } from "react";
import GlassButton from "../ui/btn-glass";

type User = {
  id: number;
  username: string;
  email: string;
};

export default function ControlEditForm({
  controlId,
  allUsers,
  usersWithAccess,
  labelBtnSave,
}: {
  controlId: number;
  allUsers: User[];
  usersWithAccess: User[];
  labelBtnSave: string;
}) {
  const [selectedUsers, setSelectedUsers] = useState<number[]>(
    usersWithAccess.map((u) => u.id)
  );
  const [message, setMessage] = useState("");

  const handleToggle = (userId: number) => {
    setSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/controls/${controlId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ users: selectedUsers }),
        }
      );

      const data = await res.json();
      if (data.success) {
        setMessage("Запазено успешно!");
      } else {
        setMessage("Грешка при запазване");
      }
    } catch {
      setMessage("Сървърна грешка");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-900 p-4 ">
      {allUsers.map((u) => (
        <label key={u.id} className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={selectedUsers.includes(u.id)}
            onChange={() => handleToggle(u.id)}
          />
          {u.username} ({u.email})
        </label>
      ))}
      <GlassButton
        type="submit"
        className="bg-gray-800/30 px-4 py-2 text-sm mt-4"
      >
        {labelBtnSave}
      </GlassButton>

      {message && <p className="mt-2">{message}</p>}
    </form>
  );
}
