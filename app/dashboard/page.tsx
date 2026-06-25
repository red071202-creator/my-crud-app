import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { logoutUser } from "./actions";
import {
  createTask,
  deleteTask,
  toggleTaskCompleted,
} from "./task-actions";

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
    <main className="min-h-screen bg-zinc-50 px-6 py-12">
      <div className="mx-auto w-full max-w-3xl">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-sm font-medium text-zinc-500">
              Signed in as {session.user.email}
            </p>
            <h1 className="mt-2 text-3xl font-semibold text-zinc-950">
              Welcome, {session.user.name}
            </h1>
            <p className="mt-2 text-zinc-600">
              Your tasks dashboard will live here.
            </p>
          </div>

          <form action={logoutUser}>
            <button
              type="submit"
              className="rounded-md border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-800 transition hover:border-zinc-400 hover:bg-zinc-100"
            >
              Logout
            </button>
          </form>
        </div>

        <section className="rounded-md border border-zinc-200 bg-white p-6">
          <h2 className="text-lg font-medium text-zinc-950">Create task</h2>

          <form action={createTask} className="mt-5 space-y-4">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-zinc-800"
              >
                Title
              </label>
              <input
                id="title"
                name="title"
                type="text"
                required
                className="mt-2 w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-zinc-950 outline-none focus:border-zinc-900"
              />
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-zinc-800"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows={3}
                className="mt-2 w-full resize-none rounded-md border border-zinc-300 bg-white px-3 py-2 text-zinc-950 outline-none focus:border-zinc-900"
              />
            </div>

            <button
              type="submit"
              className="rounded-md bg-zinc-950 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-zinc-800"
            >
              Create task
            </button>
          </form>
        </section>

        <section className="mt-6 rounded-md border border-zinc-200 bg-white p-6">
          <h2 className="text-lg font-medium text-zinc-950">Your tasks</h2>

          {tasks.length === 0 ? (
            <p className="mt-3 text-sm text-zinc-600">
              No tasks yet. Create your first task above.
            </p>
          ) : (
            <ul className="mt-5 divide-y divide-zinc-200">
              {tasks.map((task) => (
                <li key={task.id} className="py-4 first:pt-0 last:pb-0">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-medium text-zinc-950">
                        {task.title}
                      </h3>
                      {task.description ? (
                        <p className="mt-1 text-sm text-zinc-600">
                          {task.description}
                        </p>
                      ) : null}
                    </div>

                    <div className="flex shrink-0 items-center gap-2">
                      <form action={toggleTaskCompleted}>
                        <input type="hidden" name="taskId" value={task.id} />
                        <button
                          type="submit"
                          className="rounded-md bg-zinc-100 px-2 py-1 text-xs font-medium text-zinc-700 transition hover:bg-zinc-200"
                        >
                          {task.completed ? "Mark open" : "Mark done"}
                        </button>
                      </form>

                      <form action={deleteTask}>
                        <input type="hidden" name="taskId" value={task.id} />
                        <button
                          type="submit"
                          className="rounded-md border border-red-200 bg-white px-2 py-1 text-xs font-medium text-red-700 transition hover:bg-red-50"
                        >
                          Delete
                        </button>
                      </form>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
}
