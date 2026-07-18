export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-6 py-16">
      <div className="w-full max-w-3xl rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
          CarePath AI
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
          Organize care coordination plans from patient context and instructions.
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-slate-600">
          This starter experience prepares the app shell for the planned care-plan workflow while keeping the content non-clinical and safety-focused.
        </p>
        <div className="mt-8 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
          <p className="font-medium text-slate-900">Current focus</p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>Verify the repository foundation</li>
            <li>Prepare the application shell</li>
            <li>Document local environment configuration</li>
          </ul>
        </div>
        <div className="mt-8 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
          This tool organizes supplied care information and does not provide medical advice. Contact the patient’s qualified healthcare team regarding clinical questions or concerning symptoms.
        </div>
      </div>
    </main>
  );
}
