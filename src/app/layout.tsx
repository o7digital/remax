import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import type { ReactNode } from "react";

import { getDemoLocale } from "@/lib/server-i18n";
import { getLocaleConfig } from "@/lib/demo-locale";
import { hasClerkConfig } from "@/lib/clerk-config";

import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-brand"
});

export const metadata: Metadata = {
  title: "O7 ERP SaaS",
  description: "Application ERP SaaS interne"
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  const locale = await getDemoLocale();
  const config = getLocaleConfig(locale);
  const body = (
    <html lang={config.languageTag}>
      <body className={archivo.variable}>{children}</body>
    </html>
  );

  if (!hasClerkConfig()) {
    return body;
  }

  return <ClerkProvider>{body}</ClerkProvider>;
}
