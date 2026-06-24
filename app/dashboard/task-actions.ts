"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

async function getCurrentUserId() {
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;

  if (!token) {
    redirect("/login");
  }

  const session = await prisma.session.findUnique({
    where: { token },
    select: {
      userId: true,
      expiresAt: true,
    },
  });

  if (!session || session.expiresAt < new Date()) {
    redirect("/login");
  }

  return session.userId;
}

export async function createTask(formData: FormData) {
  const userId = await getCurrentUserId();
  const title = String(formData.get("title") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();

  if (!title) {
    throw new Error("Task title is required.");
  }

  await prisma.task.create({
    data: {
      title,
      description: description || null,
      userId,
    },
  });

  revalidatePath("/dashboard");
}
