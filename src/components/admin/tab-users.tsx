"use client";

import { useEffect, useState } from "react";
import EditUser from "./edit-user";

type User = {
  id: number;
  username: string;
  email: string;
  role: string;
  active: boolean;
  created_at: string;
  controls?: number[];
};

type Control = {
  control_id: number;
  control_name: string;
  section_name: string;
  region_name: string;
};

type Labels = {
  id: string;
  user: string;
  email: string;
  role: string;
  status: string;
  actions: string;
};

export default function UsersTab({
  currentUserRole,
  labels,
}: {
  currentUserRole?: "admin" | "power_admin" | null;
  labels: Labels;
}) {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editUser, setEditUser] = useState<{
    id: number;
    username: string;
    role: string;
    active: boolean;
    controls: number[];
    allControls: Control[];
  } | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/users`,
        {
          credentials: "include",
        }
      );
      const data = await res.json();
      if (data.success) {
        setUsers(data.data);
      } else {
        setError("Грешка при зареждане на потребителите");
      }
    } catch (err) {
      setError("Сървърна грешка");
    } finally {
      setLoading(false);
    }
  }

  async function handleEditClick(userId: number) {
    try {
      const resUser = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/users/${userId}`,
        {
          credentials: "include",
        }
      );
      const userData = await resUser.json();

      const resControls = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/controls`,
        {
          credentials: "include",
        }
      );
      const controlsData = await resControls.json();

      if (userData.success && controlsData.success) {
        setEditUser({
          id: userData.user.id,
          username: userData.user.username,
          role: userData.user.role,
          active: userData.user.active,
          controls: userData.user.controls || [],
          allControls: controlsData.data,
        });
      } else {
        alert("Грешка при зареждане на данните");
      }
    } catch (err) {
      console.error(err);
      alert("Сървърна грешка");
    }
  }

  async function handleSaveUser(changes: any) {
    if (!editUser) return;
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/users/${editUser.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(changes),
        }
      );
      const data = await res.json();
      if (data.success) {
        await fetchUsers();
        setEditUser(null);
      } else {
        alert("Грешка при записване на потребителя");
      }
    } catch (_err) {
      alert("Сървърна грешка");
    }
  }

  if (loading) return <p className="text-white">Зареждане...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="bg-gray-800 p-4 rounded-lg relative">
      <table className="w-full text-white">
        <thead>
          <tr className="border-b border-gray-600">
            <th className="p-2 text-left">{labels.id}</th>
            <th className="p-2 text-left">{labels.user}</th>
            <th className="p-2 text-left">{labels.email}</th>
            <th className="p-2 text-left">{labels.role}</th>
            <th className="p-2 text-left">{labels.status}</th>
            <th className="p-2 text-left">{labels.actions}</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id} className="border-b border-gray-700">
              <td className="p-2">{u.id}</td>
              <td className="p-2">{u.username}</td>
              <td className="p-2">{u.email}</td>
              <td className="p-2">{u.role}</td>
              <td className="p-2">
                {u.active ? (
                  <span className="text-green-400">Активен</span>
                ) : (
                  <span className="text-red-400">Неактивен</span>
                )}
              </td>
              <td className="p-2">
                <button
                  onClick={() => handleEditClick(u.id)}
                  className="bg-amber-700 hover:bg-amber-500 px-3 py-1 rounded"
                >
                  Промени
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editUser && (
        <EditUser
          currentUserRole={currentUserRole}
          user={editUser}
          onClose={() => setEditUser(null)}
          onSave={handleSaveUser}
        />
      )}
    </div>
  );
}
