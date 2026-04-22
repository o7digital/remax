import Link from "next/link";

import { DataOriginNotice } from "@/components/data-origin-notice";
import { DataTable } from "@/components/data-table";
import { PageHeader } from "@/components/page-header";
import { SectionCard } from "@/components/section-card";
import { StatCard } from "@/components/stat-card";
import { StatusBadge } from "@/components/status-badge";
import { runIaSearch } from "@/lib/ia-search";
import { getDemoI18n } from "@/lib/server-i18n";

const DEFAULT_DOMAINS = "inmueble24.com,easybroker.com,metroscubicos.com";

export default async function IaSearchPage({
  searchParams
}: {
  searchParams: Promise<{ q?: string; domains?: string }>;
}) {
  const { locale } = await getDemoI18n();
  const params = await searchParams;
  const keywords = params.q?.trim() ?? "";
  const domains = params.domains?.trim() ?? DEFAULT_DOMAINS;

  const { query, provider, results } = await runIaSearch({
    keywords,
    domains,
    locale
  });

  const sourceCounts = new Map<string, number>();

  for (const result of results) {
    sourceCounts.set(result.source, (sourceCounts.get(result.source) ?? 0) + 1);
  }

  const sourceRows = Array.from(sourceCounts.entries()).map(([source, count]) => ({ source, count }));

  return (
    <div className="page-stack">
      <PageHeader
        title="IA Search"
        description="Busqueda inteligente para rastrear propiedades y menciones en Google por palabras clave y portales objetivo."
        actions={
          <div className="button-row">
            <Link href="/app/settings" className="button button-secondary">
              Volver a settings
            </Link>
          </div>
        }
      />

      <DataOriginNotice
        title="Motor de analisis web"
        description="Consulta Google con foco en Inmueble24, EasyBroker y dominios personalizados."
      />

      <SectionCard
        title="Nueva busqueda IA"
        description="Define keywords, zonas o tipo de bien. Puedes incluir chats, renta, venta, asesor o colonia."
      >
        <form className="filter-form" action="/app/settings/ia-search" method="get">
          <div className="filter-grid">
            <label className="field field-full">
              <span className="field-label">Keywords</span>
              <input
                name="q"
                defaultValue={keywords}
                placeholder="departamento 2 recamaras providencia guadalajara visita asesor"
                required
              />
            </label>
            <label className="field field-full">
              <span className="field-label">Dominios objetivo (separados por coma)</span>
              <input name="domains" defaultValue={domains} />
            </label>
            <div className="field">
              <button type="submit" className="button">
                Ejecutar IA Search
              </button>
            </div>
          </div>
        </form>
      </SectionCard>

      <div className="stats-grid">
        <StatCard label="Resultados" value={String(results.length)} detail="hallazgos web" />
        <StatCard label="Fuentes" value={String(sourceRows.length)} detail="dominios detectados" />
        <StatCard
          label="Proveedor"
          value={provider === "serpapi" ? "Google API" : provider === "fallback" ? "Fallback" : "N/A"}
          detail="motor de consulta"
        />
      </div>

      {keywords ? (
        <SectionCard
          title="Resultados encontrados"
          description={`Query ejecutada: ${query}`}
        >
          <DataTable
            rows={results}
            getRowId={(row) => row.id}
            emptyMessage="Sin resultados para esta busqueda."
            columns={[
              {
                key: "title",
                label: "Resultado",
                render: (row) => (
                  <div>
                    <a href={row.link} target="_blank" rel="noopener noreferrer">
                      <strong>{row.title}</strong>
                    </a>
                    <div className="muted">{row.snippet}</div>
                    <div className="inline-actions">
                      <a className="table-link" href={row.link} target="_blank" rel="noopener noreferrer">
                        Abrir resultado
                      </a>
                      <a className="table-link" href={row.googleLink} target="_blank" rel="noopener noreferrer">
                        Google
                      </a>
                    </div>
                  </div>
                )
              },
              { key: "source", label: "Fuente", render: (row) => <StatusBadge value={row.source} /> },
              { key: "position", label: "Pos", align: "right", render: (row) => row.position }
            ]}
          />
        </SectionCard>
      ) : null}

      <SectionCard
        title="Cobertura por fuente"
        description="Distribucion de resultados por portal para priorizar scouting comercial."
      >
        <DataTable
          rows={sourceRows}
          getRowId={(row) => row.source}
          emptyMessage="Ejecuta una busqueda para ver cobertura por fuente."
          columns={[
            { key: "source", label: "Fuente", render: (row) => row.source },
            { key: "count", label: "Resultados", align: "right", render: (row) => row.count }
          ]}
        />
      </SectionCard>
    </div>
  );
}
