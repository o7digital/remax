"use client";

export function ReportingPrintButton() {
  return (
    <button
      type="button"
      className="button report-action-button"
      onClick={() => window.print()}
      title="Imprimir o guardar en PDF"
      aria-label="Imprimir o guardar en PDF"
    >
      Imprimir / PDF
    </button>
  );
}
