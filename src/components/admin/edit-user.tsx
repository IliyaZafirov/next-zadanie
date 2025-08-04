"use client";

import { useEffect, useState } from "react";

type Control = {
  control_id: number;
  control_name: string;
  section_name: string;
  region_name: string;
};

type User = {
  id: number;
  username: string;
  role: string;
  active: boolean;
  controls?: number[];
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
};

export default function EditUser({
  currentUserRole,
  user,
  onClose,
  onSave,
  editUserLabels,
}: {
  currentUserRole?: "admin" | "power_admin" | null;
  user: User;
  onClose: () => void;
  onSave: (changes: {
    role: string;
    password?: string;
    active: boolean;
    controls: number[];
  }) => void;
  editUserLabels: EditUserLabels;
}) {
  const [role, setRole] = useState(user.role);
  const [password, setPassword] = useState("");
  const [active, setActive] = useState(user.active);
  const [controls, setControls] = useState<number[]>(user.controls || []);
  const [allControls, setAllControls] = useState<Control[]>([]);
  const [loadingControls, setLoadingControls] = useState(true);

  const isAdmin = currentUserRole === "admin";
  const isPowerAdmin = currentUserRole === "power_admin";

  useEffect(() => {
    fetchControls();
  }, []);

  async function fetchControls() {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/controls`,
        {
          credentials: "include",
        }
      );
      const data = await res.json();
      if (data.success) {
        setAllControls(data.data);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoadingControls(false);
    }
  }

  const handleControlToggle = (controlId: number) => {
    setControls((prev) =>
      prev.includes(controlId)
        ? prev.filter((id) => id !== controlId)
        : [...prev, controlId]
    );
  };

  const handleSubmit = async () => {
    const confirm = window.confirm(editUserLabels.editUserHandleConfirm);

    if (!confirm) return;

    onSave({
      role,
      password: password || undefined,
      active,
      controls,
    });

    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/change-user-event`,
        {
          method: "POST",
          credentials: "include",
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  const disableRoleChange =
    isAdmin &&
    (user.role === "power_admin" || role === "admin" || role === "power_admin");

  const disableStatusChange =
    isAdmin && (user.role === "admin" || user.role === "power_admin");

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-6 rounded-lg w-[500px] text-white max-h-[90vh] overflow-y-auto">
        <h2 className="text-lg font-bold mb-4">
          {editUserLabels.editUserH2} {user.username}
        </h2>

        {/* Смяна на роля */}
        <label className="block mb-2">{editUserLabels.editUserLabelRole}</label>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full bg-gray-700 p-2 rounded mb-4 disabled:opacity-50"
          disabled={disableRoleChange}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
          <option value="power_admin">Power Admin</option>
        </select>
        {disableRoleChange && (
          <p className="text-xs text-red-400 mb-2">
            {editUserLabels.editUserDisableRoleChange}
          </p>
        )}

        {/* Смяна на парола */}
        <label className="block mb-2">
          {editUserLabels.editUserLabelNewPass}
        </label>
        <input
          type="password"
          placeholder={editUserLabels.editUserLabelNewPass}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full bg-gray-700 p-2 rounded mb-4"
        />

        {/* Активиране/Деактивиране */}
        <label className="block mb-2">
          {editUserLabels.editUserLabelStatus}
        </label>
        <select
          value={active ? "active" : "inactive"}
          onChange={(e) => setActive(e.target.value === "active")}
          className="w-full bg-gray-700 p-2 rounded mb-4 disabled:opacity-50"
          disabled={disableStatusChange}
        >
          <option value="active">{editUserLabels.editUserActiveStatus}</option>
          <option value="inactive">
            {editUserLabels.editUserInactiveStatus}
          </option>
        </select>
        {disableStatusChange && (
          <p className="text-xs text-red-400 mb-2">
            {editUserLabels.editUserDisableStatusChange}
          </p>
        )}

        {/* Контроли */}
        <label className="block mb-2">
          {editUserLabels.editUserLabelControlAccess}
        </label>
        {loadingControls ? (
          <p className="text-gray-400">
            {editUserLabels.editUserLoadingControls}
          </p>
        ) : (
          <div className="space-y-2 max-h-[200px] overflow-y-auto border border-gray-600 rounded p-2">
            {allControls.map((ctrl) => (
              <label
                key={ctrl.control_id}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={controls.includes(ctrl.control_id)}
                  onChange={() => handleControlToggle(ctrl.control_id)}
                  className="accent-amber-500"
                />
                <span>
                  {ctrl.control_name}{" "}
                  <span className="text-gray-400">
                    ({ctrl.region_name} / {ctrl.section_name})
                  </span>
                </span>
              </label>
            ))}
          </div>
        )}

        {/* Бутони */}
        <div className="flex justify-end gap-2 mt-4">
          <button onClick={onClose} className="px-4 py-2 bg-gray-600 rounded">
            {editUserLabels.editUserButtonCancel}
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-amber-600 rounded"
          >
            {editUserLabels.editUserButtonSave}
          </button>
        </div>
      </div>
    </div>
  );
}
