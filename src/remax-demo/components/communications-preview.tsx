import { StatusBadge } from "@/components/status-badge";
import { formatDateLong, formatPropertyAddress } from "@/remax-demo/formatters";
import {
  rt,
  translateCommunicationStatus,
  translateCommunicationType,
  type RemaxLanguage
} from "@/remax-demo/i18n";
import type { RemaxCommunication, RemaxProperty } from "@/remax-demo/types";

function getTone(status: RemaxCommunication["estado"]) {
  if (status === "enviado") {
    return "success" as const;
  }

  return status === "borrador" ? ("warning" as const) : ("neutral" as const);
}

export function CommunicationsPreview({
  communication,
  property,
  language = "es"
}: {
  communication: RemaxCommunication;
  property?: RemaxProperty;
  language?: RemaxLanguage;
}) {
  const t = (value: string) => rt(language, value);
  return (
    <article className="remax-communication-preview">
      <div className="remax-communication-header">
        <div>
          <p className="remax-eyebrow">{language === "en" ? "Preview" : "Vista previa"}</p>
          <h3>{language === "en" ? `${translateCommunicationType(language, communication.tipo)} · ${communication.propiedadClave}` : communication.asunto}</h3>
        </div>
        <StatusBadge value={translateCommunicationStatus(language, communication.estado)} tone={getTone(communication.estado)} />
      </div>

      <div className="info-grid">
        <div className="info-item">
          <span>{language === "en" ? "Type" : "Tipo"}</span>
          <strong>{translateCommunicationType(language, communication.tipo)}</strong>
        </div>
        <div className="info-item">
          <span>{language === "en" ? "Date" : "Fecha"}</span>
            <strong>{formatDateLong(communication.fecha, language)}</strong>
          </div>
          <div className="info-item">
            <span>{language === "en" ? "Property" : "Propiedad"}</span>
            <strong>
              {property
                ? `${property.clave} · ${formatPropertyAddress(property)}`
                : communication.propiedadClave}
            </strong>
          </div>
        <div className="info-item">
          <span>{language === "en" ? "Recipients" : "Destinatarios"}</span>
          <strong>{communication.destinatarios.length}</strong>
        </div>
      </div>

      <div className="remax-message-box">
        <p className="muted">{language === "en" ? "Recorded summary" : "Resumen registrado"}</p>
        <p>{t(communication.resumen)}</p>
      </div>

      <div className="remax-message-box">
        <p className="muted">{language === "en" ? "Signature" : "Firma"}</p>
        <p>{t(communication.firma)}</p>
      </div>

      <div className="remax-message-box">
        <p className="muted">{language === "en" ? "Distribution" : "Distribucion"}</p>
        <div className="inline-stack">
          {communication.destinatarios.map((recipient) => (
            <span key={recipient} className="badge badge-neutral">
              {recipient}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
