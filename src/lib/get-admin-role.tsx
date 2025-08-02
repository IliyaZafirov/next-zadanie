import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function getAdminRole() {
  const cookieStore = await cookies();
  const token = cookieStore.get("userRegistered")?.value;

  let role: string | null = null;

  if (token) {
    try {
      const decoded = jwt.decode(token) as { id: number; role?: string } | null;
      role = decoded?.role || null;
    } catch {
      role = null;
    }
  }

  const isAdmin = role === "admin" || role === "power_admin";
  const safeRole: "admin" | "power_admin" | null = isAdmin
    ? (role as "admin" | "power_admin")
    : null;

  return { role: safeRole, isAdmin };
}
