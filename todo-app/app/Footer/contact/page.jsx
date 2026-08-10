export default function ContactPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-16">
      <div className="mx-auto max-w-2xl rounded-3xl bg-white p-8 shadow-xl">

        <h1 className="mb-4 text-4xl font-bold text-slate-900">
          Contact Us
        </h1>

        <p className="mb-6 text-slate-600">
          Have a question, suggestion, or feedback? We'd love to hear from you.
        </p>

        <div className="space-y-3 text-slate-700">
          <p>
            Email:
            <span className="ml-2 font-medium text-cyan-600">
              supportAdmin1994@gmail.com
            </span>
          </p>

          <p>
            We usually reply within 24-48 hours.
          </p>
        </div>

      </div>
    </main>
  );
}