"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

async function getCurrentUserId() { // who is the currently logged in user?
  const cookieStore = await cookies(); // Using compare browser token and the token from the session talbe from server.
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

export async function toggleTaskCompleted(formData: FormData) {
  const userId = await getCurrentUserId();
  const taskId = String(formData.get("taskId") ?? "");

  if (!taskId) {
    throw new Error("Task id is required.");
  }

  const task = await prisma.task.findFirst({
    where: {
      id: taskId, // comparing of id from task model/table and taskId for the specific task you click. Medyo magulo pa para saakin pero medyo gets na
      userId, // sinesearch mo den na dapat yung task nayon ay may userId na userId
    },
  });

  if (!task) {
    throw new Error("Task not found.");
  }

  await prisma.task.update({
    where: {
      id: task.id, // compare the task id to the task variable id to know what to to toggle.
    },
    data: {
      completed: !task.completed,
    },
  });

  revalidatePath("/dashboard");
}

export async function updateTask(formData: FormData){
  const userId = await getCurrentUserId();
  const taskId = String(formData.get("taskId") ?? "");
  const title = String(formData.get("title") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();

  if (!taskId) {
    throw new Error("Task id is required.");
  }

  if (!title) {
    throw new Error("Task title is required.");
  }

  const task = await prisma.task.findFirst({
    where: {
      id: taskId, 
      userId, 
    },
  });

  if (!task) {
    throw new Error("Task not found.");
  }

  await prisma.task.update({
    where: {
      id: task.id,
    },
    data: {
      title,
      description: description || null,
    },
  });

  revalidatePath("/dashboard");
}

export async function deleteTask(formData: FormData) {
  const userId = await getCurrentUserId();
  const taskId = String(formData.get("taskId") ?? "");

  if (!taskId) {
    throw new Error("Task id is required.");
  }

  await prisma.task.deleteMany({
    where: {
      id: taskId,
      userId,
    },
  });

  revalidatePath("/dashboard");
}
