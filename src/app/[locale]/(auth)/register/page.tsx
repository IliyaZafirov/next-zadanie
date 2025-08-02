import RegisterForm from "@/components/forms/form-register";
import H1 from "@/components/h1";
import { getTranslations } from "next-intl/server";

export default async function Page() {
  const t = await getTranslations("RegisterPage");
  return (
    <main className="flex flex-col justify-center items-center pt-16">
      <H1 className="text-white/70 my-8">{t("h1")}</H1>

      <RegisterForm
        labels={{
          username: t("username"),
          email: t("email"),
          password: t("password"),
          confirmPassword: t("confirm-password"),
          submit: t("submit"),
        }}
        helperText={{
          username: t("username-help"),
          email: t("email-help"),
          password: t("password-help"),
          confirmPassword: t("confirm-password-help"),
        }}
        links={{
          forgotPassword: t("forgot-password"),
          back: t("back"),
        }}
        returnCase={{
          usernameExists: t("username-exists"),
          emailExists: t("email-exists"),
          successCase: t("success-case"),
          errorCase: t("error-case"),
          passNotMatchCase: t("pass-not-match-case"),
        }}
      />
    </main>
  );
}
