import type { Metadata } from "next";
import type { ReactNode } from "react";

import { RemaxDemoShell } from "@/remax-demo/components/remax-demo-shell";
import { getRemaxLanguage } from "@/remax-demo/get-language";
import { rt } from "@/remax-demo/i18n";

import "./remax-demo.css";

export const metadata: Metadata = {
  title: "REMAX Demo",
  description: "Plataforma operativa inmobiliaria de REMAX Activa desarrollada en Astro"
};

export default async function RemaxDemoLayout({ children }: { children: ReactNode }) {
  const language = await getRemaxLanguage();

  return (
    <RemaxDemoShell currentLanguage={language} shellTitle={rt(language, "REMAX Activa | Plataforma Operativa Inmobiliaria")}>
      {children}
    </RemaxDemoShell>
  );
}
