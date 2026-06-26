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
      className="mt-5 space-y-4"
    >
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
  );
}
