import Navbar from "../components/Navbar";
import Sidebar from "../components/sidebar";

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen  text-slate-900  dark:text-slate-100 transition-colors duration-300">

      <div className="grid min-h-screen grid-cols-[280px_minmax(0,1fr)]">

        {/* SIDEBAR */}
        <Sidebar />

        {/* MAIN */}
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1 overflow-auto p-6 xl:p-8">
            {children}
          </main>
        </div>

      </div>
    </div>
  );
}