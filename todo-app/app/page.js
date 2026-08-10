import Link from "next/link";
import Footer from "./Footer/page";

export default function Home() {
  return (
    <div
      className="min-h-screen flex flex-col bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/images/background.png')",
        backgroundSize: "1600px 700px",
      }}
    >
      {/* MAIN */}
      <main className="flex-1 relative">
        <div className="flex flex-col items-center gap-7 pt-10 text-center">
          <h1 className="text-7xl text-[#6A4C93] font-bold">
            Todo App
          </h1>

          <div className="space-y-2 text-[#2E2E2E]">
            <p>Manage your tasks efficiently!</p>
            <p>Stay focused on your priorities!</p>
            <p>Boost your productivity every day.</p>
          </div>

          <div className="flex gap-4">
            <Link
              href="/register"
              className="bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-800"
            >
              Register
            </Link>

            <Link
              href="/login"
              className="bg-green-900 text-white px-4 py-2 rounded hover:bg-green-800"
            >
              Login
            </Link>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <Footer/>
    </div>
  );
}