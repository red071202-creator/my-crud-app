"use client";

import { useState } from "react";
import { logoutUser } from "./actions";

export function LogoutButton() {
  const [isOpen, setIsOpen] = useState(false);

  async function handleLogout() {
    await logoutUser();
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="rounded-md border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-800 transition hover:border-zinc-400 hover:bg-zinc-100"
      >
        Logout
      </button>

      {isOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-sm rounded-md bg-white p-6 shadow-lg">
            <h2 className="text-lg font-semibold text-zinc-950">
              Log out?
            </h2>
            <p className="mt-2 text-sm text-zinc-600">
              You will need to sign in again to access your tasks.
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="rounded-md border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-800 transition hover:border-zinc-400 hover:bg-zinc-100"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleLogout}
                className="rounded-md bg-zinc-950 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-800"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
