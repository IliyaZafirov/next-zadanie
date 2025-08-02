import { getTranslations } from "next-intl/server";
import LangSwitch from "../lang-switch";
import Navigation from "./navigation";

export default async function Header() {
  const t = await getTranslations("Header");

  return (
    <header className="absolute top-5 right-5">
      <Navigation labels={{ backBtn: t("back-btn"), exitBtn: t("exit-btn") }} />
      <LangSwitch  />
    </header>
  );
}
