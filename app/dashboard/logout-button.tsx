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
        className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-teal-200 hover:bg-teal-50 hover:text-teal-700 active:scale-[0.98]"
      >
        Logout
      </button>

      {isOpen ? (
        <div className="fixed inset-0 z-50 grid min-h-dvh place-items-center bg-slate-950/50 px-4 py-8 backdrop-blur-sm">
          <div className="w-full max-w-xs rounded-2xl border border-white/80 bg-white p-5 shadow-xl shadow-slate-950/20">
            <h2 className="text-lg font-semibold text-slate-950">
              Log out?
            </h2>
            <p className="mt-1.5 text-sm leading-5 text-slate-600">
              You will need to sign in again to access your tasks.
            </p>

            <div className="mt-5 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-sm font-semibold text-slate-700 transition hover:border-teal-200 hover:bg-teal-50 hover:text-teal-700 active:scale-[0.98]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleLogout}
                className="rounded-xl bg-teal-600 px-3.5 py-2 text-sm font-semibold text-white shadow-sm shadow-teal-600/20 transition hover:bg-teal-700 active:scale-[0.98]"
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
