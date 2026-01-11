"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="light"   // 👈 LIGHT MODE BY DEFAULT
      enableSystem={false}  // 👈 optional but recommended
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}
