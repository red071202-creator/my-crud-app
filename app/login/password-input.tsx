"use client";

import { useState } from "react";

export function PasswordInput() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      <label
        htmlFor="password"
        className="block text-sm font-medium text-zinc-800"
      >
        Password
      </label>
      <div className="relative mt-2">
        <input
          id="password"
          name="password"
          type={showPassword ? "text" : "password"}
          autoComplete="current-password"
          required
          className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 pr-11 text-zinc-950 outline-none focus:border-zinc-900"
        />
        <button
          type="button"
          aria-label={showPassword ? "Hide password" : "Show password"}
          onClick={() => setShowPassword((current) => !current)}
          className="absolute inset-y-0 right-0 flex w-11 items-center justify-center text-zinc-500 hover:text-zinc-900"
        >
          {showPassword ? (
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            >
              <path d="m2 2 20 20" />
              <path d="M10.6 10.6a2 2 0 0 0 2.8 2.8" />
              <path d="M9.9 5.2A10.8 10.8 0 0 1 12 5c5 0 8.5 4.5 9.8 6.3a1.2 1.2 0 0 1 0 1.4 19.8 19.8 0 0 1-2.9 3.3" />
              <path d="M6.1 6.1A19.3 19.3 0 0 0 2.2 11.3a1.2 1.2 0 0 0 0 1.4C3.5 14.5 7 19 12 19a10.8 10.8 0 0 0 4.2-.9" />
            </svg>
          ) : (
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            >
              <path d="M2.2 11.3a1.2 1.2 0 0 0 0 1.4C3.5 14.5 7 19 12 19s8.5-4.5 9.8-6.3a1.2 1.2 0 0 0 0-1.4C20.5 9.5 17 5 12 5s-8.5 4.5-9.8 6.3Z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}
