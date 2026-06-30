import Link from "next/link";

const features = [
  {
    title: "Custom authentication",
    description: "Register and sign in with email and password.",
  },
  {
    title: "Google OAuth",
    description: "Continue with Google using a server-side OAuth flow.",
  },
  {
    title: "Private dashboard",
    description: "Session cookies protect each user's task workspace.",
  },
  {
    title: "Full task CRUD",
    description: "Create, edit, complete, and delete user-owned tasks.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-slate-50 text-slate-950">
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:40px_40px] opacity-45" />
      <div className="absolute inset-x-0 top-0 -z-10 h-96 bg-gradient-to-b from-teal-100 via-white to-transparent" />

      <header className="sticky top-0 z-10 border-b border-teal-100/80 bg-white/90 shadow-[0_1px_12px_rgba(15,23,42,0.04)] backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
          <Link
            href="/"
            className="group flex items-center gap-3 text-base font-semibold tracking-tight text-slate-950 transition hover:text-teal-700"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-teal-200 bg-teal-50 text-sm font-bold text-teal-700 shadow-sm transition group-hover:bg-teal-100">
              T
            </span>
            <span>Tasks CRUD App</span>
          </Link>

          <nav className="flex items-center gap-2">
            <Link
              href="/login"
              className="rounded-xl border border-transparent px-3 py-2 text-sm font-medium text-slate-600 transition hover:border-teal-100 hover:bg-teal-50 hover:text-teal-700 active:scale-[0.98]"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="rounded-xl bg-teal-600 px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-teal-600/20 transition hover:bg-teal-700 active:scale-[0.98]"
            >
              Register
            </Link>
          </nav>
        </div>
      </header>

      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6">
        <section className="grid flex-1 items-center gap-12 py-10 pb-20 lg:grid-cols-[1.05fr_0.95fr] lg:py-12 lg:pb-24">
          <div className="max-w-3xl">
            <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-teal-700">
              <span className="h-2 w-2 rounded-full bg-teal-500" />
              Next.js, Prisma, Supabase Postgres
            </p>
            <h1 className="mt-6 text-4xl font-semibold leading-tight tracking-normal text-slate-950 sm:text-6xl">
              Manage your tasks with custom auth and a private dashboard.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              A simple learning project with email login, Google login,
              session cookies, and user-owned task CRUD.
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/register"
                className="rounded-2xl bg-teal-600 px-6 py-3 text-center text-sm font-semibold text-white shadow-lg shadow-teal-600/20 transition hover:-translate-y-0.5 hover:bg-teal-700 active:translate-y-0"
              >
                Create account
              </Link>
              <Link
                href="/dashboard"
                className="rounded-2xl border border-slate-300 bg-white px-6 py-3 text-center text-sm font-semibold text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-400 hover:bg-slate-50 active:translate-y-0"
              >
                Open dashboard
              </Link>
            </div>
          </div>

          <div className="rounded-3xl border border-white/80 bg-white/90 p-6 shadow-xl shadow-slate-200/80 backdrop-blur">
            <div className="rounded-2xl border border-teal-100 bg-teal-50/70 p-5">
              <p className="inline-flex rounded-full border border-teal-200 bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-teal-700">
                Project scope
              </p>
              <h2 className="mt-4 text-2xl font-semibold text-slate-950">
                What it includes
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                A compact full-stack auth and CRUD workflow built step by step.
              </p>
            </div>

            <ul className="mt-6 space-y-4">
              {features.map((feature) => (
                <li
                  key={feature.title}
                  className="group rounded-2xl border border-slate-200 bg-white p-4 transition hover:border-teal-200 hover:shadow-md hover:shadow-teal-100"
                >
                  <div className="flex gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-sm font-bold text-teal-700 ring-1 ring-teal-100 transition group-hover:bg-teal-600 group-hover:text-white">
                      ✓
                    </span>
                    <div>
                      <h3 className="text-sm font-semibold text-slate-950">
                        {feature.title}
                      </h3>
                      <p className="mt-1 text-sm leading-6 text-slate-600">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </main>
  );
}
