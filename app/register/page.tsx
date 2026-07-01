import Image from "next/image";
import Link from "next/link";
import { registerUser } from "./actions";
import { PasswordInput } from "./password-input";

export default function RegisterPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-50 px-6 py-12 text-slate-950">
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:40px_40px] opacity-45" />
      <div className="absolute inset-x-0 top-0 -z-10 h-96 bg-gradient-to-b from-teal-100 via-white to-transparent" />

      <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl border border-white/80 bg-white/90 shadow-xl shadow-slate-200/80 backdrop-blur lg:grid-cols-[0.9fr_1fr]">
        <div className="hidden border-r border-teal-100 bg-teal-50/70 p-8 lg:flex lg:flex-col lg:justify-between">
          <Link
            href="/"
            className="group flex items-center gap-3 text-base font-semibold text-slate-950 transition hover:text-teal-700"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-teal-200 bg-white text-sm font-bold text-teal-700 shadow-sm transition group-hover:bg-teal-100">
              T
            </span>
            <span>Tasks CRUD App</span>
          </Link>

          <div>
            <p className="flex items-center gap-2 text-sm font-semibold text-teal-700">
              <span className="h-2 w-2 rounded-full bg-teal-500" />
              Start your workspace
            </p>
            <h1 className="mt-5 text-4xl font-semibold leading-tight text-slate-950">
              Create an account for your private tasks.
            </h1>
            <p className="mt-4 text-sm leading-6 text-slate-600">
              Save tasks to your own dashboard and keep every list connected to
              your account.
            </p>
          </div>

          <div className="rounded-2xl border border-teal-100 bg-white/80 p-4 text-sm leading-6 text-slate-600 shadow-sm">
            You can register with email and password, or continue with Google.
          </div>
        </div>

        <div className="p-6 sm:p-8 lg:p-10">
          <div className="mb-8">
            <Link
              href="/"
              className="mb-8 flex items-center gap-3 text-base font-semibold text-slate-950 transition hover:text-teal-700 lg:hidden"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-teal-200 bg-teal-50 text-sm font-bold text-teal-700 shadow-sm">
                T
              </span>
              <span>Tasks CRUD App</span>
            </Link>

            <p className="text-sm font-semibold text-teal-700">
              Create account
            </p>
            <h1 className="mt-3 text-3xl font-semibold text-slate-950">
              Start managing your tasks.
            </h1>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Use your details below, or continue with Google.
            </p>
          </div>

          <form action={registerUser} className="space-y-5">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-slate-800"
              >
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-teal-500 focus:ring-4 focus:ring-teal-100"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-slate-800"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-teal-500 focus:ring-4 focus:ring-teal-100"
              />
            </div>

            <PasswordInput />

            <button
              type="submit"
              className="w-full rounded-2xl bg-teal-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-teal-600/20 transition hover:-translate-y-0.5 hover:bg-teal-700 active:translate-y-0"
            >
              Create account
            </button>
          </form>

          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-slate-200" />
            <span className="text-xs font-medium uppercase text-slate-500">
              or
            </span>
            <div className="h-px flex-1 bg-slate-200" />
          </div>

          <a
            href="/api/auth/google"
            className="flex w-full items-center justify-center gap-3 rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:border-teal-200 hover:bg-teal-50 hover:text-teal-700 active:translate-y-0"
          >
            <Image
              src="/google-icon.png"
              alt=""
              width={20}
              height={20}
              aria-hidden="true"
            />
            Continue with Google
          </a>

          <p className="mt-6 text-center text-sm text-slate-600">
            Already have an account?{" "}
            <Link href="/login" className="font-semibold text-teal-700">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
