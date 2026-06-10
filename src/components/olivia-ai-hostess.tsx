"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import type { DemoLocale } from "@/lib/demo-locale";

const oliviaUrl = process.env.NEXT_PUBLIC_OLIVIA_AI_URL ?? "https://suitesmine-bot.vercel.app";

const quickHelp = [
  {
    title: "F-Asesores / F-Staff",
    text: "Captura asesores y staff desde Configuracion. Los bloques siguen el formato Access: general, fiscal, personal y socio REMAX."
  },
  {
    title: "Panel",
    text: "El panel resume propiedades, operaciones, asesores, guardias y asistencia importada desde la base operativa."
  },
  {
    title: "Datos",
    text: "Los registros se guardan en Railway/Postgres. Si algo no aparece, revisa que el formulario se haya guardado sin error."
  }
];

export function OliviaAiHostess({ locale }: { locale: DemoLocale }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const iframeSrc = `${oliviaUrl}?source=remax&context=${encodeURIComponent(pathname)}&lang=${locale}`;

  return (
    <div className="olivia-hostess" aria-live="polite">
      {open ? (
        <section className="olivia-panel" aria-label="Olivia AI Hotesse">
          <div className="olivia-header">
            <div>
              <span>Olivia AI</span>
              <strong>Hôtesse</strong>
            </div>
            <button type="button" className="olivia-close" onClick={() => setOpen(false)} aria-label="Cerrar Olivia AI">
              ×
            </button>
          </div>

          {oliviaUrl ? (
            <iframe title="Olivia AI Hôtesse" src={iframeSrc} className="olivia-frame" />
          ) : (
            <div className="olivia-fallback">
              <p>Estoy aqui para orientar al usuario dentro del sistema.</p>
              {quickHelp.map((item) => (
                <article key={item.title}>
                  <strong>{item.title}</strong>
                  <span>{item.text}</span>
                </article>
              ))}
              <p className="muted">Configura NEXT_PUBLIC_OLIVIA_AI_URL para conectar el motor Railway/Python.</p>
            </div>
          )}
        </section>
      ) : null}

      <button type="button" className="olivia-button" onClick={() => setOpen((value) => !value)} aria-expanded={open}>
        <span>Olivia AI</span>
      </button>
    </div>
  );
}
