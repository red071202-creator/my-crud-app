import type { ReactNode } from "react";
import { Toaster } from "sonner";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <>
      {children}
      <Toaster
        richColors
        position="top-right"
        toastOptions={{
          classNames: {
            toast: "rounded-2xl border border-teal-100 shadow-lg",
          },
        }}
      />
    </>
  );
}
