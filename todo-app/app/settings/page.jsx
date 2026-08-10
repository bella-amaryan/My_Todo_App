"use client";

import {
  ArrowLeft,
  User,
  Bell,
  Palette,
  Languages,
  Link,
  Shield
  
} from "lucide-react";

import SettingsCard from "./components/SettingsCard";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";




export default function SettingsPage(){
  const router = useRouter();
  const t = useTranslations("Settings");
  
  

  
  return (
    <div className="min-h-screen  text-white p-6">
      <div className="max-w-2xl mx-auto">
      <div className="
flex
items-center
gap-4
mb-8
">
      
    <button
  onClick={() => router.push("/dashboard")}
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
  <ArrowLeft
    size={20}
    //className="transition-transform group-hover:-translate-x-0.5"
  />
</button>

      
<div>
        <h1 className="text-purple-900 text-3xl font-bold mb-2">
          {t("title")}
        </h1>

        <p className="text-gray-400 mb-8">
          {t("description")}
        </p>
        </div>
        </div>


        <div className="grid gap-6">


          <SettingsCard
            icon={<User />}
            title={t("account")}
            description={t("accountDescription")}
              href="/settings/account"
          />


          <SettingsCard
            icon={<Bell />}
            title={t("notifications")}
            description={t("notificationsDescription")}
             href="/settings/notifications"
          />


          <SettingsCard
            icon={<Palette />}
            title={t("appearance")}
            description={t("appearanceDescription")}
            href="/settings/appearance"
          />


          <SettingsCard
            icon={<Languages />}
            title={t("language")}
            description={t("languageDescription")}
            href="/settings/language"
          />


          <SettingsCard
            icon={<Link />}
            title={t("integrations")}
            description={t("integrationsDescription")}
            href="/settings/integration"
          />


          <SettingsCard
            icon={<Shield />}
            title={t("security")}
            description={t("securityDescription")} 
            href="/settings/security" 
          />


        </div>

      </div>
      </div>
  );
}