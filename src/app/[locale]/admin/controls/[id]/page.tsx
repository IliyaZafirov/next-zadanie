// import { cookies } from "next/headers";
// import jwt from "jsonwebtoken";

// type Control = {
//   control_id: number;
//   control_name: string;
//   section_name: string;
//   region_name: string;
// };

// type User = {
//   id: number;
//   username: string;
//   email: string;
//   role: string;
// };

// async function getControlData(id: string) {
//   try {
//     const cookieStore = await cookies();
//     const res = await fetch(
//       `${process.env.NEXT_PUBLIC_SITE_URL}/api/admin/controls/${id}`,
//       {
//         cache: "no-store",
//         credentials: "include",
//         headers: {
//           Cookie: cookieStore
//             .getAll()
//             .map((c) => `${c.name}=${c.value}`)
//             .join("; "),
//         },
//       }
//     );

//     const data = await res.json();
//     if (!data.success) return null;
//     return data;
//   } catch (err) {
//     console.log(err);
//   }
// }

// export default async function Page({ params }: { params: { id: string } }) {
//   const cookieStore = await cookies();
//   const token = cookieStore.get("userRegistered")?.value;

//   let isAdmin = false;
//   if (token) {
//     const decoded = jwt.decode(token) as { role?: string } | null;
//     if (decoded?.role === "admin" || decoded?.role === "power_admin") {
//       isAdmin = true;
//     }
//   }

//   if (!isAdmin) {
//     return <main className="p-6 text-red-500">Нямате достъп</main>;
//   }

//   const controlData = await getControlData(params.id);
//   if (!controlData) {
//     return <main className="p-6 text-red-500">Контролата не е намерена</main>;
//   }

//   const { control, usersWithAccess, allUsers } = controlData;

//   return (
//     <main className="p-6 text-white">
//       <h1 className="text-xl font-bold mb-4">Редакция на контрола</h1>

//       <p>
//         <b>Име:</b> {control.control_name}
//       </p>
//       <p>
//         <b>Секция:</b> {control.section_name}
//       </p>
//       <p>
//         <b>Регион:</b> {control.region_name}
//       </p>

//       <h2 className="mt-6 font-semibold">Потребители с достъп</h2>
//       <ul className="mb-4">
//         {usersWithAccess.map((u: User) => (
//           <li key={u.id}>
//             {u.username} ({u.email})
//           </li>
//         ))}
//         {usersWithAccess.length === 0 && <li>Няма потребители с достъп</li>}
//       </ul>

//       <h2 className="mt-6 font-semibold">Добави потребители</h2>
//       <form action="" method="POST">
//         <select name="userId" className="bg-gray-700 p-2 rounded">
//           {allUsers.map((u: User) => (
//             <option key={u.id} value={u.id}>
//               {u.username} ({u.email})
//             </option>
//           ))}
//         </select>
//         <button
//           type="submit"
//           className="ml-2 bg-amber-600 px-4 py-2 rounded hover:bg-amber-500"
//         >
//           Добави
//         </button>
//       </form>
//     </main>
//   );
// }
