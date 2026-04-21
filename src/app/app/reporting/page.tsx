import Link from "next/link";

import { DataOriginNotice } from "@/components/data-origin-notice";
import { DataTable } from "@/components/data-table";
import { PageHeader } from "@/components/page-header";
import { ReportingPrintButton } from "@/components/reporting-print-button";
import { SectionCard } from "@/components/section-card";
import { StatCard } from "@/components/stat-card";
import { StatusBadge } from "@/components/status-badge";
import { invoices, orders, payments } from "@/lib/erp-data";
import { formatCurrency, formatDate } from "@/lib/formatters";
import { getReportingData } from "@/lib/remax-app-data";

type SearchValue = string | string[] | undefined;

type ReportingSearchParams = Promise<Record<string, SearchValue>>;

function formatMonth(month: string) {
  return formatDate(`${month}-01`, "es-MX");
}

function getFirstQueryValue(value: SearchValue): string {
  if (Array.isArray(value)) {
    return value[0] ?? "";
  }

  return value ?? "";
}

function parseDateInput(value: string): string | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return null;
  }

  const parsed = new Date(`${value}T00:00:00Z`);

  return Number.isNaN(parsed.getTime()) ? null : value;
}

function inDateRange(value: string, startDate: string | null, endDate: string | null) {
  if (startDate && value < startDate) {
    return false;
  }

  if (endDate && value > endDate) {
    return false;
  }

  return true;
}

function getPresetRange(period: string): { startDate: string | null; endDate: string | null } {
  switch (period) {
    case "q1-2025":
      return { startDate: "2025-01-01", endDate: "2025-03-31" };
    case "q2-2025":
      return { startDate: "2025-04-01", endDate: "2025-06-30" };
    case "q3-2025":
      return { startDate: "2025-07-01", endDate: "2025-09-30" };
    case "q4-2025":
      return { startDate: "2025-10-01", endDate: "2025-12-31" };
    case "s1-2025":
      return { startDate: "2025-01-01", endDate: "2025-06-30" };
    case "s2-2025":
      return { startDate: "2025-07-01", endDate: "2025-12-31" };
    case "year-2025":
      return { startDate: "2025-01-01", endDate: "2025-12-31" };
    case "q1-2026":
      return { startDate: "2026-01-01", endDate: "2026-03-31" };
    case "q2-2026":
      return { startDate: "2026-04-01", endDate: "2026-06-30" };
    case "q3-2026":
      return { startDate: "2026-07-01", endDate: "2026-09-30" };
    case "q4-2026":
      return { startDate: "2026-10-01", endDate: "2026-12-31" };
    case "s1-2026":
      return { startDate: "2026-01-01", endDate: "2026-06-30" };
    case "s2-2026":
      return { startDate: "2026-07-01", endDate: "2026-12-31" };
    case "year-2026":
      return { startDate: "2026-01-01", endDate: "2026-12-31" };
    default:
      return { startDate: null, endDate: null };
  }
}

function getPeriodLabel(period: string): string {
  switch (period) {
    case "q1-2025":
      return "Q1 2025";
    case "q2-2025":
      return "Q2 2025";
    case "q3-2025":
      return "Q3 2025";
    case "q4-2025":
      return "Q4 2025";
    case "s1-2025":
      return "Semestre 1 - 2025";
    case "s2-2025":
      return "Semestre 2 - 2025";
    case "year-2025":
      return "Ano 2025";
    case "q1-2026":
      return "Q1 2026";
    case "q2-2026":
      return "Q2 2026";
    case "q3-2026":
      return "Q3 2026";
    case "q4-2026":
      return "Q4 2026";
    case "s1-2026":
      return "Semestre 1 - 2026";
    case "s2-2026":
      return "Semestre 2 - 2026";
    case "year-2026":
      return "Ano 2026";
    case "custom":
      return "Rango personalizado";
    default:
      return "Todo el historial";
  }
}

export default async function ReportingPage({
  searchParams
}: {
  searchParams: ReportingSearchParams;
}) {
  const params = await searchParams;
  const period = getFirstQueryValue(params.period) || "all";
  const country = getFirstQueryValue(params.country) || "all";
  const advisorFilter = getFirstQueryValue(params.advisor).trim().toLowerCase();
  const areaFilter = getFirstQueryValue(params.area).trim().toLowerCase();

  const parsedStart = parseDateInput(getFirstQueryValue(params.startDate));
  const parsedEnd = parseDateInput(getFirstQueryValue(params.endDate));
  const presetRange = getPresetRange(period);
  const startDate = period === "custom" ? parsedStart : presetRange.startDate;
  const endDate = period === "custom" ? parsedEnd : presetRange.endDate;

  const { summary, monthlyClosings, topAreas, topAdvisors } = await getReportingData();

  const filteredInvoices = invoices.filter((invoice) => {
    if (country !== "all" && invoice.country !== country) {
      return false;
    }

    return inDateRange(invoice.issueDate, startDate, endDate);
  });

  const filteredAdvisors = topAdvisors.filter((advisor) => {
    if (!advisorFilter) {
      return true;
    }

    return advisor.advisorName.toLowerCase().includes(advisorFilter);
  });

  const filteredAreas = topAreas.filter((area) => {
    if (!areaFilter) {
      return true;
    }

    return area.area.toLowerCase().includes(areaFilter);
  });

  const filteredMonthlyClosings = monthlyClosings.filter((row) => {
    const monthStart = `${row.month}-01`;

    return inDateRange(monthStart, startDate, endDate);
  });

  const issuedInvoices = filteredInvoices.filter((invoice) =>
    ["issued", "partially_paid", "paid"].includes(invoice.businessStatus)
  );
  const submittedInvoices = filteredInvoices.filter(
    (invoice) => invoice.electronicStatus === "submitted" || invoice.electronicStatus === "accepted"
  );
  const invoicingByCountry = ["MX", "FR"].map((countryCode) => {
    const countryInvoices = filteredInvoices.filter((invoice) => invoice.country === countryCode);
    const emitted = countryInvoices.reduce((sum, invoice) => sum + invoice.total, 0);
    const balance = countryInvoices.reduce((sum, invoice) => sum + invoice.balance, 0);

    return {
      id: countryCode,
      country: countryCode,
      invoices: countryInvoices.length,
      emitted,
      balance,
      accepted: countryInvoices.filter((invoice) => invoice.electronicStatus === "accepted").length
    };
  });

  const blockedPayments = payments.filter((payment) => payment.status === "blocked").length;
  const paidAmount = payments.filter((payment) => payment.status === "paid").reduce((sum, payment) => sum + payment.amount, 0);
  const invoiceRevenue = filteredInvoices.reduce((sum, invoice) => sum + invoice.total, 0);
  const outstandingBalance = filteredInvoices.reduce((sum, invoice) => sum + invoice.balance, 0);
  const collectionRate = invoiceRevenue > 0 ? Math.round(((invoiceRevenue - outstandingBalance) / invoiceRevenue) * 100) : 0;

  return (
    <div className="page-stack">
      <PageHeader
        title="Reporting"
        description="Sistema de reportes operativos y financieros para direccion comercial y administrativa."
        actions={
          <div className="button-row report-controls no-print">
            <ReportingPrintButton />
            <Link href="/app/commissions" className="button report-action-button">
              Ver comisiones
            </Link>
            <Link href="/app/dashboard" className="button button-secondary report-action-button">
              Volver al dashboard
            </Link>
          </div>
        }
      />

      <section className="card no-print report-filters">
        <div className="card-header">
          <div>
            <h2>Filtros de reporte</h2>
            <p>Periodo: {getPeriodLabel(period)}. Usa trimestre, semestre, ano o rango personalizado.</p>
          </div>
        </div>

        <form className="report-filter-grid" action="/app/reporting" method="get">
          <label className="field">
            <span className="field-label">Periodo</span>
            <select name="period" defaultValue={period}>
              <option value="all">Todo</option>
              <option value="q1-2025">Q1 2025</option>
              <option value="q2-2025">Q2 2025</option>
              <option value="q3-2025">Q3 2025</option>
              <option value="q4-2025">Q4 2025</option>
              <option value="s1-2025">Semestre 1 2025</option>
              <option value="s2-2025">Semestre 2 2025</option>
              <option value="year-2025">Ano 2025</option>
              <option value="q1-2026">Q1 2026</option>
              <option value="q2-2026">Q2 2026</option>
              <option value="q3-2026">Q3 2026</option>
              <option value="q4-2026">Q4 2026</option>
              <option value="s1-2026">Semestre 1 2026</option>
              <option value="s2-2026">Semestre 2 2026</option>
              <option value="year-2026">Ano 2026</option>
              <option value="custom">Personalizado</option>
            </select>
          </label>

          <label className="field">
            <span className="field-label">Fecha inicio</span>
            <input name="startDate" type="date" defaultValue={parsedStart ?? ""} />
          </label>

          <label className="field">
            <span className="field-label">Fecha fin</span>
            <input name="endDate" type="date" defaultValue={parsedEnd ?? ""} />
          </label>

          <label className="field">
            <span className="field-label">Pais</span>
            <select name="country" defaultValue={country}>
              <option value="all">Todos</option>
              <option value="MX">Mexico</option>
              <option value="FR">Francia</option>
            </select>
          </label>

          <label className="field">
            <span className="field-label">Asesor</span>
            <input name="advisor" type="text" defaultValue={advisorFilter} placeholder="Nombre de asesor" />
          </label>

          <label className="field">
            <span className="field-label">Zona</span>
            <input name="area" type="text" defaultValue={areaFilter} placeholder="Zona o municipio" />
          </label>

          <div className="button-row">
            <button type="submit" className="button report-action-button">Aplicar filtros</button>
            <Link href="/app/reporting" className="button button-secondary report-action-button">Limpiar</Link>
          </div>
        </form>
      </section>

      <DataOriginNotice
        title="Reportes ejecutivos"
        description="Incluye: Desempeno por asesor, Ventas, Facturacion emitida y Finanzas."
      />

      <div className="subnav no-print">
        <a href="#reporte-asesor" className="subnav-link">Reporte asesor</a>
        <a href="#reporte-ventas" className="subnav-link">Reporte ventas</a>
        <a href="#reporte-facturacion" className="subnav-link">Facturacion emitida</a>
        <a href="#reporte-financiero" className="subnav-link">Reporte financiero</a>
      </div>

      <SectionCard
        title="Reporte de desempeno por asesor"
        description="Productividad comercial por asesor basada en deals y comision calculada."
      >
        <div id="reporte-asesor" className="stats-grid">
          <StatCard label="Asesores con actividad" value={String(filteredAdvisors.length)} detail="ranking vigente" />
          <StatCard label="Deals completados" value={String(summary.completedDeals)} detail="cierres historicos" />
          <StatCard
            label="Comision total"
            value={formatCurrency(summary.estimatedCommissionTotal, "MXN", "es-MX")}
            detail="estimacion consolidada"
          />
        </div>

        <DataTable
          rows={filteredAdvisors}
          getRowId={(row) => row.id}
          emptyMessage="No hay asesores con comision estimable."
          columns={[
            {
              key: "advisor",
              label: "Asesor",
              render: (row) => (
                <div>
                  <strong>{row.advisorName}</strong>
                  <div className="muted">{row.staffKind}</div>
                </div>
              )
            },
            { key: "deals", label: "Deals", align: "right", render: (row) => row.dealCount },
            {
              key: "commission",
              label: "Comision",
              align: "right",
              render: (row) => formatCurrency(row.estimatedCommission, row.currencyCode, "es-MX")
            }
          ]}
        />
      </SectionCard>

      <div className="two-columns" id="reporte-ventas">
        <SectionCard
          title="Reporte de ventas"
          description="Tendencia mensual de cierres y comision por ventas."
        >
          <DataTable
            rows={filteredMonthlyClosings}
            getRowId={(row) => row.month}
            emptyMessage="No hay meses consolidados para el rango seleccionado."
            columns={[
              { key: "month", label: "Mes", render: (row) => formatMonth(row.month) },
              { key: "deals", label: "Ventas", align: "right", render: (row) => row.deals },
              {
                key: "commission",
                label: "Comision estimada",
                align: "right",
                render: (row) => formatCurrency(row.estimatedCommission, "MXN", "es-MX")
              }
            ]}
          />
        </SectionCard>

        <SectionCard
          title="Ventas por zona"
          description="Concentracion de inventario y cartera activa por zona."
        >
          <DataTable
            rows={filteredAreas}
            getRowId={(row) => row.area}
            emptyMessage="No hay ubicaciones disponibles para el filtro."
            columns={[
              { key: "area", label: "Zona", render: (row) => row.area },
              { key: "properties", label: "Propiedades", align: "right", render: (row) => row.propertyCount },
              {
                key: "active",
                label: "Activas",
                align: "right",
                render: (row) => row.activePropertyCount
              }
            ]}
          />
        </SectionCard>
      </div>

      <SectionCard
        title="Reportes de facturacion emitida"
        description="Control de facturas emitidas, estado electronico y saldo por pais."
      >
        <div id="reporte-facturacion" className="stats-grid">
          <StatCard label="Facturas emitidas" value={String(issuedInvoices.length)} detail="ERP emitidas" />
          <StatCard label="Enviadas SAT/PDP" value={String(submittedInvoices.length)} detail="submitted + accepted" />
          <StatCard
            label="Monto emitido"
            value={formatCurrency(invoiceRevenue, "MXN", "es-MX")}
            detail="suma total facturas"
          />
          <StatCard
            label="Saldo pendiente"
            value={formatCurrency(outstandingBalance, "MXN", "es-MX")}
            detail="por cobrar"
          />
        </div>

        <DataTable
          rows={invoicingByCountry}
          getRowId={(row) => row.id}
          emptyMessage="No hay facturacion por pais."
          columns={[
            { key: "country", label: "Pais", render: (row) => <StatusBadge value={row.country} /> },
            { key: "invoices", label: "Facturas", align: "right", render: (row) => row.invoices },
            {
              key: "accepted",
              label: "Aceptadas",
              align: "right",
              render: (row) => row.accepted
            },
            {
              key: "emitted",
              label: "Emitido",
              align: "right",
              render: (row) => formatCurrency(row.emitted, "MXN", "es-MX")
            },
            {
              key: "balance",
              label: "Saldo",
              align: "right",
              render: (row) => formatCurrency(row.balance, "MXN", "es-MX")
            }
          ]}
        />
      </SectionCard>

      <div className="two-columns" id="reporte-financiero">
        <SectionCard
          title="Reportes financieros"
          description="KPIs de caja, cobranza y riesgo financiero."
        >
          <div className="stats-grid">
            <StatCard label="Cobranza efectiva" value={`${collectionRate}%`} detail="sobre facturacion" />
            <StatCard
              label="Pagos recibidos"
              value={formatCurrency(paidAmount, "MXN", "es-MX")}
              detail="status paid"
            />
            <StatCard label="Pagos bloqueados" value={String(blockedPayments)} detail="requieren accion" />
            <StatCard label="Ordenes activas" value={String(orders.length)} detail="pipeline facturable" />
          </div>
        </SectionCard>

        <SectionCard
          title="Riesgo de cobranza"
          description="Facturas con saldo y pagos en estado blocked/scheduled."
        >
          <DataTable
            rows={filteredInvoices.filter((invoice) => invoice.balance > 0)}
            getRowId={(row) => row.id}
            emptyMessage="No hay riesgo de cobranza detectado."
            columns={[
              {
                key: "invoice",
                label: "Factura",
                render: (row) => (
                  <div>
                    <strong>{row.number}</strong>
                    <div className="muted">{row.client}</div>
                  </div>
                )
              },
              { key: "status", label: "Estado", render: (row) => <StatusBadge value={row.businessStatus} /> },
              {
                key: "electronic",
                label: "Estatus e-invoice",
                render: (row) => <StatusBadge value={row.electronicStatus} />
              },
              {
                key: "balance",
                label: "Saldo",
                align: "right",
                render: (row) => formatCurrency(row.balance, row.currency, "es-MX")
              }
            ]}
          />
        </SectionCard>
      </div>
    </div>
  );
}
