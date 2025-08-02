"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";

export default function LangSwitch() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  // const toggleLocale = () => {
  //   const newLocale = locale === 'en' ? 'bg' : 'en';
  //   router.replace(pathname, { locale: newLocale });
  //   router.refresh();
  // };

  const switchLocale = (newLocale: string) => {
    if (newLocale === locale) return;
    router.replace(pathname, { locale: newLocale });
    router.refresh();
  };

  return (
    // {locale === 'en' ? 'BG' : 'EN'}
    <div className="flex gap-2">
      <button onClick={() => switchLocale("en")} disabled={locale === "en"} className="hover:text-gray-400">
        EN
      </button>
      <button onClick={() => switchLocale("bg")} disabled={locale === "bg"} className="hover:text-gray-400">
        BG
      </button>
    </div>
  );
}
