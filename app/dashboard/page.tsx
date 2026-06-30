import { cookies } from "next/headers";
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

          <LogoutButton />
        </div>

        <section className="rounded-md border border-zinc-200 bg-white p-6">
          <h2 className="text-lg font-medium text-zinc-950">Create task</h2>

          <CreateTaskForm />
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
                <TaskItem key={task.id} task={task} />
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
}
