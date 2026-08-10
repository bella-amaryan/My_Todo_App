export default function TermsPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-16">
      <div className="mx-auto max-w-3xl rounded-3xl bg-white p-8 shadow-xl">

        <h1 className="mb-6 text-4xl font-bold text-slate-900">
          Terms of Service
        </h1>

        <div className="space-y-6 text-slate-600">

          <section>
            <h2 className="mb-2 text-xl font-semibold text-slate-900">
              Using Our App
            </h2>
            <p>
              By using Todo App, you agree to use the service responsibly and
              follow these terms.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-semibold text-slate-900">
              Your Account
            </h2>
            <p>
              You are responsible for keeping your account information secure.
              Please do not share your password with others.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-semibold text-slate-900">
              Your Tasks and Data
            </h2>
            <p>
              You own the tasks and information you create in the app. We store
              your data only to provide the Todo App service.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-semibold text-slate-900">
              Service Changes
            </h2>
            <p>
              We may update, improve, or change features of the application
              to provide a better experience.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-semibold text-slate-900">
              Account Removal
            </h2>
            <p>
              You can delete your account and remove your personal data at any
              time through account settings.
            </p>
          </section>

         

        </div>

      </div>
    </main>
  );
}
