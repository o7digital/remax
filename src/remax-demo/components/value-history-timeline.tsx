import { formatCurrencyMXN, formatDateShort } from "@/remax-demo/formatters";
import { rt, type RemaxLanguage } from "@/remax-demo/i18n";
import type { RemaxValueHistory } from "@/remax-demo/types";

export function ValueHistoryTimeline({
  events,
  language = "es"
}: {
  events: RemaxValueHistory[];
  language?: RemaxLanguage;
}) {
  const t = (value: string) => rt(language, value);
  const maxValue = Math.max(...events.map((event) => event.valor), 1);

  return (
    <div className="remax-timeline">
      {events.map((event) => (
        <article key={event.id} className="remax-timeline-item">
          <div className="remax-timeline-topline">
            <strong>{formatDateShort(event.fecha, language)}</strong>
            <span>{event.usuario}</span>
          </div>
          <h4>{t(event.motivoCambio)}</h4>
          <div className="remax-timeline-values">
            <span>{t(event.motivoMinuta)}</span>
            <strong>{formatCurrencyMXN(event.valor, language)}</strong>
          </div>
          <div className="remax-timeline-bar">
            <span style={{ width: `${Math.max((event.valor / maxValue) * 100, 10)}%` }} />
          </div>
          <p className="muted">
            {language === "en" ? "Currency" : "Moneda"}: {t(event.moneda)} · {language === "en" ? "Position" : "Posicion"}: {event.posicion ? t(event.posicion) : "N/A"}
          </p>
        </article>
      ))}
    </div>
  );
}
