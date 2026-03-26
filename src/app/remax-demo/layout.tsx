import type { Metadata } from "next";
import type { ReactNode } from "react";

import { logoutAction } from "@/remax-demo/auth-actions";
import { getRemaxDemoSession } from "@/remax-demo/auth";
import { RemaxDemoShell } from "@/remax-demo/components/remax-demo-shell";
import { getRemaxLanguage } from "@/remax-demo/get-language";
import { rt } from "@/remax-demo/i18n";

import "./remax-demo.css";

export const metadata: Metadata = {
  title: "REMAX Demo",
  description: "Plataforma operativa inmobiliaria de REMAX Activa desarrollada en Astro"
};

function formatToolbarDate(language: "es" | "en") {
  return new Intl.DateTimeFormat(language === "en" ? "en-US" : "es-MX", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric"
  }).format(new Date());
}

export default async function RemaxDemoLayout({ children }: { children: ReactNode }) {
  const language = await getRemaxLanguage();
  const session = await getRemaxDemoSession();

  return (
    <RemaxDemoShell
      currentDateLabel={formatToolbarDate(language)}
      currentLanguage={language}
      currentSession={session}
      logoutAction={logoutAction}
      shellTitle={rt(language, "REMAX Activa | Plataforma Operativa Inmobiliaria")}
    >
      {children}
    </RemaxDemoShell>
  );
}
