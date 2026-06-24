import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

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

  return (
    <main className="min-h-screen bg-zinc-50 px-6 py-12">
      <div className="mx-auto w-full max-w-3xl">
        <div className="mb-8">
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

        <section className="rounded-md border border-zinc-200 bg-white p-6">
          <h2 className="text-lg font-medium text-zinc-950">Tasks</h2>
          <p className="mt-2 text-sm text-zinc-600">
            We will add create, read, update, and delete actions in the next
            phase.
          </p>
        </section>
      </div>
    </main>
  );
}
