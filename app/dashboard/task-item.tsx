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
    <li className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-teal-200 hover:shadow-md hover:shadow-teal-100">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3
              className={`font-semibold text-slate-950 ${
                task.completed ? "text-slate-500 line-through" : ""
              }`}
            >
              {task.title}
            </h3>
            <span
              className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                task.completed
                  ? "bg-teal-50 text-teal-700 ring-1 ring-teal-100"
                  : "bg-slate-100 text-slate-600 ring-1 ring-slate-200"
              }`}
            >
              {task.completed ? "Done" : "Pending"}
            </span>
          </div>
          {task.description ? (
            <p className="mt-2 text-sm leading-6 text-slate-600">
              {task.description}
            </p>
          ) : null}
        </div>

        <div className="flex shrink-0 flex-wrap items-center gap-2">
          <form action={handleToggleTaskCompleted}>
            <input type="hidden" name="taskId" value={task.id} />
            <button
              type="submit"
              className="rounded-xl border border-teal-100 bg-teal-50 px-3 py-2 text-xs font-semibold text-teal-700 transition hover:bg-teal-100 active:scale-[0.98]"
            >
              {task.completed ? "Mark pending" : "Mark done"}
            </button>
          </form>

          <button
            type="button"
            onClick={() => setIsEditing((current) => !current)}
            className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition hover:border-teal-200 hover:bg-teal-50 hover:text-teal-700 active:scale-[0.98]"
          >
            {isEditing ? "Cancel" : "Edit"}
          </button>

          <form action={handleDeleteTask}>
            <input type="hidden" name="taskId" value={task.id} />
            <button
              type="submit"
              className="rounded-xl border border-red-200 bg-white px-3 py-2 text-xs font-semibold text-red-700 transition hover:bg-red-50 active:scale-[0.98]"
            >
              Delete
            </button>
          </form>
        </div>
      </div>

      {isEditing ? (
        <form
          action={handleUpdateTask}
          className="mt-4 space-y-4 rounded-2xl border border-teal-100 bg-teal-50/60 p-4"
        >
          <input type="hidden" name="taskId" value={task.id} />

          <div>
            <label
              htmlFor={`title-${task.id}`}
              className="block text-xs font-semibold uppercase tracking-wide text-teal-700"
            >
              Edit title
            </label>
            <input
              id={`title-${task.id}`}
              name="title"
              type="text"
              required
              defaultValue={task.title}
              className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-100"
            />
          </div>

          <div>
            <label
              htmlFor={`description-${task.id}`}
              className="block text-xs font-semibold uppercase tracking-wide text-teal-700"
            >
              Edit description
            </label>
            <textarea
              id={`description-${task.id}`}
              name="description"
              rows={2}
              defaultValue={task.description ?? ""}
              className="mt-2 w-full resize-none rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-100"
            />
          </div>

          <button
            type="submit"
            className="rounded-xl bg-teal-600 px-4 py-2.5 text-xs font-semibold text-white shadow-sm shadow-teal-600/20 transition hover:bg-teal-700 active:scale-[0.98]"
          >
            Save changes
          </button>
        </form>
      ) : null}
    </li>
  );
}
