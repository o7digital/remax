import { formatCurrencyMXN, formatDateShort } from "@/remax-demo/formatters";
import type { RemaxLanguage } from "@/remax-demo/i18n";
import type { RemaxValueHistory } from "@/remax-demo/types";

export function ValueHistoryTimeline({
  events,
  language = "es"
}: {
  events: RemaxValueHistory[];
  language?: RemaxLanguage;
}) {
  const maxValue = Math.max(...events.map((event) => event.valor), 1);

  return (
    <div className="remax-timeline">
      {events.map((event) => (
        <article key={event.id} className="remax-timeline-item">
          <div className="remax-timeline-topline">
            <strong>{formatDateShort(event.fecha, language)}</strong>
            <span>{event.usuario}</span>
          </div>
          <h4>{event.motivoCambio}</h4>
          <div className="remax-timeline-values">
            <span>{event.motivoMinuta}</span>
            <strong>{formatCurrencyMXN(event.valor, language)}</strong>
          </div>
          <div className="remax-timeline-bar">
            <span style={{ width: `${Math.max((event.valor / maxValue) * 100, 10)}%` }} />
          </div>
          <p className="muted">
            {language === "en" ? "Currency" : "Moneda"}: {event.moneda} · {language === "en" ? "Position" : "Posicion"}: {event.posicion || "N/A"}
          </p>
        </article>
      ))}
    </div>
  );
}
