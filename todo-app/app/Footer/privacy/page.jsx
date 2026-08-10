export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-16">
      <div className="mx-auto max-w-3xl rounded-3xl bg-white p-8 shadow-xl">

        <h1 className="mb-6 text-4xl font-bold text-slate-900">
          Privacy Policy
        </h1>

        <div className="space-y-6 text-slate-600">

          <section>
            <h2 className="mb-2 text-xl font-semibold text-slate-900">
              Information We Collect
            </h2>
            <p>
              We collect information you provide when creating an account,
              such as your name, email address, and tasks you create in the app.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-semibold text-slate-900">
              How We Use Your Information
            </h2>
            <p>
              Your information is used to provide and improve the Todo App
              experience, including saving your tasks and personal settings.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-semibold text-slate-900">
              Data Security
            </h2>
            <p>
              We take reasonable measures to protect your personal information
              and keep your account secure.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-semibold text-slate-900">
              Your Data
            </h2>
            <p>
              You can update or delete your account information at any time
              through your account settings.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-semibold text-slate-900">
              Contact
            </h2>

        <p>
              If you have questions about this Privacy Policy, please contact us.
            </p>
            <div className="space-y-3 text-slate-700">
          <p>
            Email:
            <span className="ml-2 font-medium text-cyan-600">
              supportAdmin1994@gmail.com
            </span>
          </p>
         </div>
          </section>

        </div>

      </div>
    </main>
  );
}