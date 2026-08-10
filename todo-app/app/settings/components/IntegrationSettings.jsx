"use client";

export default function IntegrationsSettings() {

  const connectGoogle = () => {
    window.location.href = "/api/integrations/google";
  };


  return (
    <main className="min-h-screen bg-slate-50 px-6 py-16">

      <div className="mx-auto max-w-3xl">

        <h1 className="mb-8 text-4xl font-bold text-slate-900">
          Integrations
        </h1>


        <div className="rounded-3xl bg-white p-6 shadow-xl">

          <div className="flex items-center justify-between">

            <div>
              <h2 className="text-xl font-semibold text-slate-900">
                Google
              </h2>

              <p className="text-slate-600">
                Connect your Google account.
              </p>
            </div>


            <button
              onClick={connectGoogle}
              className="
                rounded-xl
                bg-cyan-500
                px-5
                py-2
                text-white
                transition
                hover:bg-cyan-600
              "
            >
              Connect
            </button>

          </div>

        </div>

      </div>

    </main>
  );
}