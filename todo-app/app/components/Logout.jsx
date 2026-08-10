'use client'
import {useRouter} from "next/navigation";

export default function LogoutButton(){
  const router = useRouter();
  const handleLogout = async () => {
    await fetch("/api/auth/logout", {
      method: "POST",
    });
    router.push("/login");
  };

  return (
    <button
      onClick={handleLogout}
      className="inline-flex items-center rounded-3xl border border-slate-700 bg-slate-900 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:bg-slate-800"
    >
      Log Out
    </button>
  );
}