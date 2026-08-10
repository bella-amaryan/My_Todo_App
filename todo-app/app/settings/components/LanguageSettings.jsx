"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { ArrowLeft } from "lucide-react";

const locales = [
  { code: "en", label: "English" },
  { code: "sv", label: "Svenska" },
];

export default function LanguageSettings({ currentLocale }) {
  const t = useTranslations("LanguageSettings");
  const router = useRouter();

  const [language, setLanguage] = useState(currentLocale);

  const changeLocale = async (locale) => {
    try {
      await fetch("/api/account", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          language: locale,
        }),
      });

      document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=${60 * 60 * 24 * 365}`;

      setLanguage(locale);

      router.refresh();
    } catch (error) {
      console.error(error);
    }
  };

 return (
    <div className="min-h-screen text-white px-6 py-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-start gap-4 mb-10">
          <button
            onClick={() => router.push("/settings")}
            className="
    group
    flex
    h-11
    w-11
    items-center
    justify-center
    rounded-full
    border
    border-slate-700
    text-slate-400
    transition-all
    hover:-translate-x-1
    hover:bg-purple-500/20
    hover:text-purple-400
            "
          >
            <ArrowLeft size={22} />
          </button>

          <div>
            <h1 className="text-4xl font-bold text-purple-900">
              {t("title")}
            </h1>

            <p className="mt-2 text-lg text-slate-400">
              {t("description")}
            </p>
          </div>
        </div>

        {/* Language Cards */}
        <div className="space-y-5">
          {locales.map((locale) => {
            const active = language === locale.code;

            return (
              <button
                key={locale.code}
                onClick={() => changeLocale(locale.code)}
                className={`
                  w-full
                  rounded-2xl
                  border
                  px-6
                  py-6
                  text-left
                  transition-all
                  duration-300
                  ${
                    active
                      ? "border-purple-500 bg-purple-500/10 shadow-lg shadow-purple-500/20"
                      : "border-slate-700 bg-slate-200 hover:border-purple-400 hover:bg-slate-300"
                  }
                `}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-semibold text-purple-500">
                      {locale.label}
                    </h2>

                    <p className="mt-2 text-base text-slate-400">
                      {t(`languages.${locale.code}`)}
                    </p>
                  </div>

                  <div
                    className={`
                      flex
                      h-7
                      w-7
                      items-center
                      justify-center
                      rounded-full
                      border-2
                      transition-all
                      ${
                        active
                          ? "border-purple-500"
                          : "border-slate-600"
                      }
                    `}
                  >
                    {active && (
                      <div className="h-3 w-3 rounded-full bg-purple-500" />
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}