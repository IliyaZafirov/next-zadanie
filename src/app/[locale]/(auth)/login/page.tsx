import LoginForm from "@/components/forms/form-login";
import H1 from "@/components/h1";
import { getTranslations } from "next-intl/server";

export default async function Page() {
  const t = await getTranslations("LoginPage");
  return (
    <main className="flex flex-col justify-center items-center pt-16">
      <H1 className="text-white/70 my-8">{t("h1")}</H1>

      <LoginForm
        labels={{
          username: t("username"),
          password: t("password"),
        }}
        returnCase={{
          emptyFieldsCase: t("empty-fields-case"),
          incorrectCase: t("incorrect-case"),
          successCase: t("success-case"),
          errorCase: t("error-case"),
          submit: t("submit"),
        }}
      />
    </main>
  );
}
