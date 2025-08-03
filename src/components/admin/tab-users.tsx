"use client";

import { useEffect, useState } from "react";
import EditUser from "./edit-user";
import GlassButton from "../ui/btn-glass";

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
  actionsBtn: string;
  actionsHandleErrDataLoading: string;
  actionsHandleServerErr: string;
  tabUsersLoadingErr: string;
  tabUsersServerErr: string;
  saveUserSaveAlert: string;
  saveUserServerErr: string;
  loading: string;
};

 type EditUserLabels = {
  editUserHandleConfirm: string;
  editUserH2: string;
  editUserLabelRole: string;
  editUserDisableRoleChange: string;
  editUserLabelNewPass: string;
  editUserNewPassPlaceholder: string;
  editUserLabelStatus: string;
  editUserActiveStatus: string;
  editUserInactiveStatus: string;
  editUserDisableStatusChange: string;
  editUserLabelControlAccess: string;
  editUserLoadingControls: string;
  editUserButtonCancel: string;
  editUserButtonSave: string;
}

export default function UsersTab({
  currentUserRole,
  labels,
  editUserLabels
}: {
  currentUserRole?: "admin" | "power_admin" | null;
  labels: Labels;
  editUserLabels: EditUserLabels;
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
        setError(labels.tabUsersLoadingErr);
      }
    } catch (err) {
      setError(labels.tabUsersServerErr);
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
        alert(labels.actionsHandleErrDataLoading);
      }
    } catch (err) {
      console.log(err);
      alert(labels.actionsHandleServerErr);
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
        alert(labels.saveUserSaveAlert);
      }
    } catch (_err) {
      alert(labels.saveUserServerErr);
    }
  }

  if (loading) return <p className="text-white">{labels.loading}</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="bg-gray-900 p-4  relative">
      <table className="w-full text-white">
        <thead>
          <tr className="border-b border-gray-600">
            <th className="p-2 text-left">{labels.id}</th>
            <th className="p-2 text-left">{labels.user}</th>
            <th className="p-2 text-left">{labels.email}</th>
            <th className="p-2 text-left">{labels.role}</th>
            {/* <th className="p-2 text-left">{labels.status}</th> */}
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
              {/* <td className="p-2">
                {u.active ? (
                  <span className="text-green-400">Активен</span>
                ) : (
                  <span className="text-red-400">Неактивен</span>
                )}
              </td> */}
              <td className="p-2">
                <GlassButton
                  type="button"
                  onClick={() => handleEditClick(u.id)}
                  className="bg-gray-800/30 px-4 py-2"
                >
                  {labels.actionsBtn}
                </GlassButton>
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
          editUserLabels={editUserLabels}
        />
      )}
    </div>
  );
}
