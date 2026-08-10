import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="w-1/2 border-t border-white/10 bg-transparent backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-2 px-4 py-3 text-[10px] text-gray-700/80 sm:text-[11px]">
        <p className="text-center">
          © {year} Todo App. All rights reserved.
        </p>

        <div className="flex flex-col items-center gap-1">
          <Link href="/Footer/privacy" className="transition hover:text-gray-900">
            Privacy Policy
          </Link>
          <Link href="/Footer/terms" className="transition hover:text-gray-900">
            Terms of Service
          </Link>
          <Link href="/Footer/contact" className="transition hover:text-gray-900">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}