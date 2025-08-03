import UsersTab from "@/components/admin/tab-users";
import { getTranslations } from "next-intl/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import H1 from "@/components/h1";
import AdminNavigation from "@/components/admin/nav-admin";

export default async function Page() {
  const t = await getTranslations("AdminUsersPage");
  const cookieStore = await cookies();
  const token = cookieStore.get("userRegistered")?.value;

  let role: string | null = null;

  if (token) {
    try {
      const decoded = jwt.decode(token) as { id: number; role?: string } | null;
      role = decoded?.role || null;
    } catch (err) {
      role = null;
    }
  }

  let safeRole: "admin" | "power_admin" | null = null;

  if (role === "admin" || role === "power_admin") {
    safeRole = role;
  }

  const isAdmin = role === "admin" || role === "power_admin";

  return (
    <main className="mt-26 p-6">
      {isAdmin && <AdminNavigation />}
      <H1 className="mb-4">{t("h1")}</H1>

      <UsersTab
        currentUserRole={safeRole}
        labels={{
          id: t("id"),
          user: t("user"),
          email: t("email"),
          role: t("role"),
          status: t("status"),
          actions: t("actions"),
          actionsBtn: t("actions-btn"),
          actionsHandleErrDataLoading: t("actions-handle-err-data-loading"),
          actionsHandleServerErr: t("actions-handle-server-err"),
          tabUsersLoadingErr: t("tab-users-loading-err"),
          tabUsersServerErr: t("tab-users-server-err"),
          saveUserSaveAlert: t("save-user-save-alert"),
          saveUserServerErr: t("save-user-server-err"),
          loading: t("loading"),
        }}
        editUserLabels={{
          editUserHandleConfirm: t("edit-user-handle-confirm"),
          editUserH2: t("edit-user-h2"),
          editUserLabelRole: t("edit-user-label-role"),
          editUserDisableRoleChange: t("edit-user-disable-role-change"),
          editUserLabelNewPass: t("edit-user-label-new-pass"),
          editUserNewPassPlaceholder: t("edit-user-new-pass-placeholder"),
          editUserLabelStatus: t("edit-user-label-status"),
          editUserActiveStatus: t("edit-user-active-status"),
          editUserInactiveStatus: t("edit-user-inactive-status"),
          editUserDisableStatusChange: t("edit-user-disable-status-change"),
          editUserLabelControlAccess: t("edit-user-label-control-access"),
          editUserLoadingControls: t("edit-user-loading-controls"),
          editUserButtonCancel: t("edit-user-button-cancel"),
          editUserButtonSave: t("edit-user-button-save"),
        }}
      />
    </main>
  );
}
