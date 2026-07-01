"use client";

import { useRef } from "react";
import { toast } from "sonner";
import { createTask } from "./task-actions";

export function CreateTaskForm() {
  const formRef = useRef<HTMLFormElement>(null);

  async function handleCreateTask(formData: FormData) {
    await createTask(formData);
    formRef.current?.reset();
    toast.success("Task created successfully.");
  }

  return (
    <form
      ref={formRef}
      action={handleCreateTask}
      className="mt-6 space-y-5"
    >
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-slate-800"
        >
          Title
        </label>
        <input
          id="title"
          name="title"
          type="text"
          required
          className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-teal-500 focus:ring-4 focus:ring-teal-100"
        />
      </div>

      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-slate-800"
        >
          Description
        </label>
        <textarea
          id="description"
          name="description"
          rows={3}
          className="mt-2 w-full resize-none rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-teal-500 focus:ring-4 focus:ring-teal-100"
        />
      </div>

      <button
        type="submit"
        className="w-full rounded-2xl bg-teal-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-teal-600/20 transition hover:-translate-y-0.5 hover:bg-teal-700 active:translate-y-0"
      >
        Create task
      </button>
    </form>
  );
}
