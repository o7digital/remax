import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import type { ReactNode } from "react";

import { getDemoLocale } from "@/lib/server-i18n";
import { getLocaleConfig } from "@/lib/demo-locale";
import { hasClerkConfig } from "@/lib/clerk-config";

import "./globals.css";

export const metadata: Metadata = {
  title: "O7 ERP SaaS",
  description: "Application ERP SaaS interne"
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  const locale = await getDemoLocale();
  const config = getLocaleConfig(locale);
  const body = (
    <html lang={config.languageTag}>
      <body>{children}</body>
    </html>
  );

  if (!hasClerkConfig()) {
    return body;
  }

  return <ClerkProvider>{body}</ClerkProvider>;
}
