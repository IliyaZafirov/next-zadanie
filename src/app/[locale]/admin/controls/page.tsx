import React from 'react'

export default function Page() {
  return (
    <div>Controls Page</div>
  )
}


// import { cookies } from "next/headers";
// import jwt from "jsonwebtoken";
// import Link from "next/link";
// import H1 from "@/components/h1";
// import AdminNavigation from "@/components/admin/nav-admin";
// import GlassLink from "@/components/ui/link-glass";

// type Control = {
//   control_id: number;
//   control_name: string;
//   section_name: string;
//   region_name: string;
// };

// async function getControls(): Promise<Control[]> {
//   try {
//     const cookieStore = await cookies();
//     const res = await fetch(
//       `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/controls`,
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
//     if (!data.success) return [];
//     return data.data;
//   } catch (err) {
//     console.log(err);
//     return [];
//   }
// }

// export default async function Page() {
//   const cookieStore = await cookies();
//   const token = cookieStore.get("userRegistered")?.value;

//   let isAdmin = false;
//   if (token) {
//     try {
//       const decoded = jwt.decode(token) as { role?: string } | null;
//       if (decoded?.role === "admin" || decoded?.role === "power_admin") {
//         isAdmin = true;
//       }
//     } catch {
//       isAdmin = false;
//     }
//   }

//   if (!isAdmin) {
//     return (
//       <main className="p-6 text-red-500">Нямате достъп до тази страница.</main>
//     );
//   }

//   const controls = await getControls();

//   return (
//     <main className="p-6">
//       <H1 className="mb-4">Списък с контролни</H1>

//       {isAdmin && <AdminNavigation />}
//       <div className="bg-gray-900 p-4 relative">
//         <table className="w-full text-white">
//           <thead>
//             <tr className="border-b border-gray-600">
//               <th className="p-2 text-left">ID</th>
//               <th className="p-2 text-left">Име</th>
//               <th className="p-2 text-left">Секция</th>
//               <th className="p-2 text-left">Регион</th>
//               <th className="p-2 text-left">Действия</th>
//             </tr>
//           </thead>
//           <tbody>
//             {controls.map((c) => (
//               <tr key={c.control_id} className="border-b border-gray-700">
//                 <td className="p-2">{c.control_id}</td>
//                 <td className="p-2">{c.control_name}</td>
//                 <td className="p-2">{c.section_name}</td>
//                 <td className="p-2">{c.region_name}</td>
//                 <td className="p-2">
//                   {/* <GlassLink
//                     href={`/admin/controls/${c.control_id}`}
//                     className="bg-gray-800/30 px-4 py-2 text-sm"
//                   >
//                     Промени
//                   </GlassLink> */}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {controls.length === 0 && (
//         <p className="text-gray-400 mt-4">Няма налични контроли.</p>
//       )}
//     </main>
//   );
// }
