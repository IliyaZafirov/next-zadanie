import ForgotForm from "@/components/forms/form-forgot";
import H1 from "@/components/h1";
import { getTranslations } from "next-intl/server";

export default async function Page() {
  const t = await getTranslations("ForgotPage");
  return (
    <main className="flex flex-col justify-center items-center pt-16">
      <H1 className="text-white/70 my-8">{t("h1")}</H1>

      <ForgotForm
        labels={{
          email: t("email"),
          newPassword: t("new-password"),
          confirmNewPassword: t("confirm-new-password"),
          submit: t("submit"),
        }}
        links={{
          register: t("register"),
          back: t("back"),
        }}
        returnCase={{
          emailNotFound: t("email-not-found"),
          successCase: t("success-case"),
          errorCase: t("error-case"),
          passNotMatchCase: t('pass-not-match-case')
        }}
      />
    </main>
  );
}
