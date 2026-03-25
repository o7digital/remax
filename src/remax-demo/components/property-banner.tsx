import { StatusBadge } from "@/components/status-badge";
import { formatPropertyAddress } from "@/remax-demo/formatters";
import { translatePropertyStatus, type RemaxLanguage } from "@/remax-demo/i18n";
import type { RemaxProperty } from "@/remax-demo/types";

function getTone(status: RemaxProperty["estatus"]) {
  if (status === "Activa") {
    return "success" as const;
  }

  if (status === "Cerrada") {
    return "info" as const;
  }

  return "danger" as const;
}

export function PropertyBanner({
  property,
  title,
  language = "es"
}: {
  property: RemaxProperty;
  title: string;
  language?: RemaxLanguage;
}) {
  return (
    <div className="remax-property-banner">
      <div>
        <p className="remax-view-title">{title}</p>
        <div className="remax-property-line">
          <strong>{language === "en" ? "Property:" : "Propiedad:"}</strong>
          <span>{property.clave}</span>
          <span>{formatPropertyAddress(property)}</span>
        </div>
      </div>
      <StatusBadge value={translatePropertyStatus(language, property.estatus)} tone={getTone(property.estatus)} />
    </div>
  );
}
