import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import H1 from "@/components/h1";
import ControlEditForm from "@/components/admin/control-edit-form";

type User = {
  id: number;
  username: string;
  email: string;
};

type ControlData = {
  control_id: number;
  control_name: string;
  section_name: string;
  region_name: string;
};

async function getControlDetails(id: string) {
  const cookieStore = await cookies();
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/controls/${id}`,
    {
      cache: "no-store",
      credentials: "include",
      headers: {
        Cookie: cookieStore
          .getAll()
          .map((c) => `${c.name}=${c.value}`)
          .join("; "),
      },
    }
  );

  const data = await res.json();
  if (!data.success) return null;
  return data;
}

export default async function ControlEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const cookieStore = await cookies();
  const token = cookieStore.get("userRegistered")?.value;
  let isAdmin = false;

  if (token) {
    try {
      const decoded = jwt.decode(token) as { role?: string } | null;
      if (decoded?.role === "admin" || decoded?.role === "power_admin") {
        isAdmin = true;
      }
    } catch {}
  }

  if (!isAdmin) {
    return (
      <main className="p-6 text-red-500">Нямате достъп до тази страница.</main>
    );
  }

  const details = await getControlDetails(id);
  if (!details) {
    return <main className="p-6 text-red-500">Контролата не е намерена.</main>;
  }

  const { control, allUsers, usersWithAccess } = details;

  return (
    <main className="mt-26 p-6">
      <H1 className="text-2xl font-bold mb-4">Редакция на Контрола</H1>
      <p>
        <b>Име:</b> {control.control_name}
      </p>
      <p>
        <b>Секция:</b> {control.section_name}
      </p>
      <p>
        <b>Регион:</b> {control.region_name}
      </p>

      <h2 className="text-xl mt-6 mb-2">Добавяне на достъп</h2>
      <ControlEditForm
        controlId={control.control_id}
        allUsers={allUsers}
        usersWithAccess={usersWithAccess}
      />

      <h2 className="text-xl mt-6 mb-2">Потребители с достъп</h2>
      <ul className="list-disc pl-6">
        {usersWithAccess.length > 0 ? (
          usersWithAccess.map((u: User) => (
            <li key={u.id}>
              {u.username} ({u.email})
            </li>
          ))
        ) : (
          <p className="text-gray-400">Няма добавени потребители</p>
        )}
      </ul>
    </main>
  );
}
