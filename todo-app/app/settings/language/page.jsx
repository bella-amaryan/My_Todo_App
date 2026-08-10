import LanguageSettings from "../components/LanguageSettings";
import { cookies } from "next/headers";

export default async function LanguageSettingsPage() {
  const cookieStore = await cookies();
  const locale = cookieStore.get("NEXT_LOCALE")?.value || "en";

  return <LanguageSettings currentLocale={locale} />;
}