"use client";

import { useState } from "react";
import { toast } from "sonner";
import {
  deleteTask,
  toggleTaskCompleted,
  updateTask,
} from "./task-actions";

type TaskItemProps = { // Type lang siya or structure ng data
  task: {
    id: string;
    title: string;
    description: string | null;
    completed: boolean;
  };
};

// task is from the page.tsx task is a props
export function TaskItem({ task }: TaskItemProps) { // ang type niya ay yung ginawa natin na TaskItemProps sa taas
  const [isEditing, setIsEditing] = useState(false);

  async function handleUpdateTask(formData: FormData) {
    await updateTask(formData);
    setIsEditing(false);
    toast.success("Task updated successfully.");
  }

  async function handleToggleTaskCompleted(formData: FormData) {
    await toggleTaskCompleted(formData);
    toast.success(
      task.completed
        ? "Task marked as pending."
        : "Task marked as completed.",
    );
  }

  async function handleDeleteTask(formData: FormData) {
    await deleteTask(formData);
    toast.success("Task deleted successfully.");
  }

  return (
    <li className="py-4 first:pt-0 last:pb-0">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-medium text-zinc-950">{task.title}</h3>
          {task.description ? (
            <p className="mt-1 text-sm text-zinc-600">{task.description}</p>
          ) : null}
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <form action={handleToggleTaskCompleted}>
            <input type="hidden" name="taskId" value={task.id} />
            <button
              type="submit"
              className="rounded-md bg-zinc-100 px-2 py-1 text-xs font-medium text-zinc-700 transition hover:bg-zinc-200"
            >
              {task.completed ? "Done" : "Pending"}
            </button>
          </form>

          <button
            type="button"
            onClick={() => setIsEditing((current) => !current)}
            className="rounded-md border border-zinc-300 bg-white px-2 py-1 text-xs font-medium text-zinc-800 transition hover:border-zinc-400 hover:bg-zinc-100"
          >
            {isEditing ? "Cancel" : "Edit"}
          </button>

          <form action={handleDeleteTask}>
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

      {isEditing ? (
        <form action={handleUpdateTask} className="mt-4 space-y-3">
          <input type="hidden" name="taskId" value={task.id} />

          <div>
            <label
              htmlFor={`title-${task.id}`}
              className="block text-xs font-medium text-zinc-700"
            >
              Edit title
            </label>
            <input
              id={`title-${task.id}`}
              name="title"
              type="text"
              required
              defaultValue={task.title}
              className="mt-1 w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-950 outline-none focus:border-zinc-900"
            />
          </div>

          <div>
            <label
              htmlFor={`description-${task.id}`}
              className="block text-xs font-medium text-zinc-700"
            >
              Edit description
            </label>
            <textarea
              id={`description-${task.id}`}
              name="description"
              rows={2}
              defaultValue={task.description ?? ""}
              className="mt-1 w-full resize-none rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-950 outline-none focus:border-zinc-900"
            />
          </div>

          <button
            type="submit"
            className="rounded-md border border-zinc-300 bg-white px-3 py-2 text-xs font-medium text-zinc-800 transition hover:border-zinc-400 hover:bg-zinc-100"
          >
            Save changes
          </button>
        </form>
      ) : null}
    </li>
  );
}
