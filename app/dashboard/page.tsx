import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { CreateTaskForm } from "./create-task-form";
import { LogoutButton } from "./logout-button";
import { TaskItem } from "./task-item";

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;

  if (!token) {
    redirect("/login");
  }

  const session = await prisma.session.findUnique({
    where: { token },
    include: {
      user: {
        select: {
          name: true,
          email: true,
        },
      },
    },
  });

  if (!session || session.expiresAt < new Date()) {
    redirect("/login");
  }

  const tasks = await prisma.task.findMany({
    where: {
      userId: session.userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-50 text-slate-950">
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:40px_40px] opacity-45" />
      <div className="absolute inset-x-0 top-0 -z-10 h-96 bg-gradient-to-b from-teal-100 via-white to-transparent" />

      <header className="sticky top-0 z-10 border-b border-teal-100/80 bg-white/90 shadow-[0_1px_12px_rgba(15,23,42,0.04)] backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-6 py-4">
          <Link
            href="/"
            className="group flex items-center gap-3 text-base font-semibold tracking-tight text-slate-950 transition hover:text-teal-700"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-teal-200 bg-teal-50 text-sm font-bold text-teal-700 shadow-sm transition group-hover:bg-teal-100">
              T
            </span>
            <span>Tasks CRUD App</span>
          </Link>

          <LogoutButton />
        </div>
      </header>

      <div className="mx-auto w-full max-w-6xl px-6 py-10">
        <div className="mb-8 grid gap-6 lg:grid-cols-[1fr_0.45fr] lg:items-end">
          <div>
            <p className="flex items-center gap-2 text-sm font-semibold text-teal-700">
              <span className="h-2 w-2 rounded-full bg-teal-500" />
              Signed in as {session.user.email}
            </p>
            <h1 className="mt-4 text-4xl font-semibold leading-tight tracking-normal text-slate-950 sm:text-5xl">
              Welcome, {session.user.name}
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
              Create, organize, and update your private task list from one
              clean workspace.
            </p>
          </div>

          <div className="rounded-3xl border border-white/80 bg-white/90 p-5 shadow-xl shadow-slate-200/80 backdrop-blur">
            <p className="text-sm font-medium text-slate-600">Task summary</p>
            <div className="mt-3 flex items-end justify-between gap-4">
              <p className="text-4xl font-semibold text-slate-950">
                {tasks.length}
              </p>
              <span className="rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-teal-700">
                Total tasks
              </span>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <section className="rounded-3xl border border-white/80 bg-white/90 p-6 shadow-xl shadow-slate-200/80 backdrop-blur lg:sticky lg:top-24">
            <p className="inline-flex rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-teal-700">
              New task
            </p>
            <h2 className="mt-4 text-2xl font-semibold text-slate-950">
              Create task
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Add a clear title and optional details for what you want to do.
            </p>

            <CreateTaskForm />
          </section>

          <section className="rounded-3xl border border-white/80 bg-white/90 p-6 shadow-xl shadow-slate-200/80 backdrop-blur">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="inline-flex rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-teal-700">
                  Workspace
                </p>
                <h2 className="mt-4 text-2xl font-semibold text-slate-950">
                  Your tasks
                </h2>
              </div>
            </div>

            {tasks.length === 0 ? (
              <div className="mt-6 rounded-2xl border border-dashed border-teal-200 bg-teal-50/60 p-6 text-center">
                <p className="text-sm font-medium text-slate-800">
                  No tasks yet.
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Create your first task and it will appear here.
                </p>
              </div>
            ) : (
              <ul className="mt-6 space-y-4 lg:max-h-[560px] lg:overflow-y-auto lg:pr-2">
                {tasks.map((task) => (
                  <TaskItem key={task.id} task={task} />
                ))}
              </ul>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
