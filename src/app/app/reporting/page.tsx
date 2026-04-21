import Link from "next/link";

import { DataOriginNotice } from "@/components/data-origin-notice";
import { DataTable } from "@/components/data-table";
import { PageHeader } from "@/components/page-header";
import { SectionCard } from "@/components/section-card";
import { StatCard } from "@/components/stat-card";
import { StatusBadge } from "@/components/status-badge";
import { invoices, orders, payments } from "@/lib/erp-data";
import { formatCurrency, formatDate } from "@/lib/formatters";
import { getReportingData } from "@/lib/remax-app-data";

function formatMonth(month: string) {
  return formatDate(`${month}-01`, "es-MX");
}

export default async function ReportingPage() {
  const { summary, monthlyClosings, topAreas, topAdvisors } = await getReportingData();

  const issuedInvoices = invoices.filter((invoice) =>
    ["issued", "partially_paid", "paid"].includes(invoice.businessStatus)
  );
  const submittedInvoices = invoices.filter(
    (invoice) => invoice.electronicStatus === "submitted" || invoice.electronicStatus === "accepted"
  );
  const invoicingByCountry = ["MX", "FR"].map((country) => {
    const countryInvoices = invoices.filter((invoice) => invoice.country === country);
    const emitted = countryInvoices.reduce((sum, invoice) => sum + invoice.total, 0);
    const balance = countryInvoices.reduce((sum, invoice) => sum + invoice.balance, 0);

    return {
      id: country,
      country,
      invoices: countryInvoices.length,
      emitted,
      balance,
      accepted: countryInvoices.filter((invoice) => invoice.electronicStatus === "accepted").length
    };
  });

  const blockedPayments = payments.filter((payment) => payment.status === "blocked").length;
  const paidAmount = payments.filter((payment) => payment.status === "paid").reduce((sum, payment) => sum + payment.amount, 0);
  const invoiceRevenue = invoices.reduce((sum, invoice) => sum + invoice.total, 0);
  const outstandingBalance = invoices.reduce((sum, invoice) => sum + invoice.balance, 0);
  const collectionRate = invoiceRevenue > 0 ? Math.round(((invoiceRevenue - outstandingBalance) / invoiceRevenue) * 100) : 0;

  return (
    <div className="page-stack">
      <PageHeader
        title="Reporting"
        description="Sistema de reportes operativos y financieros para direccion comercial y administrativa."
        actions={
          <div className="button-row">
            <Link href="/app/commissions" className="button">
              Ver comisiones
            </Link>
            <Link href="/app/dashboard" className="button button-secondary">
              Volver al dashboard
            </Link>
          </div>
        }
      />

      <DataOriginNotice
        title="Reportes ejecutivos"
        description="Incluye: Desempeno por asesor, Ventas, Facturacion emitida y Finanzas."
      />

      <div className="subnav">
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
          <StatCard label="Asesores con actividad" value={String(topAdvisors.length)} detail="ranking vigente" />
          <StatCard label="Deals completados" value={String(summary.completedDeals)} detail="cierres historicos" />
          <StatCard
            label="Comision total"
            value={formatCurrency(summary.estimatedCommissionTotal, "MXN", "es-MX")}
            detail="estimacion consolidada"
          />
        </div>

        <DataTable
          rows={topAdvisors}
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
            rows={monthlyClosings}
            getRowId={(row) => row.month}
            emptyMessage="No hay meses consolidados."
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
            rows={topAreas}
            getRowId={(row) => row.area}
            emptyMessage="No hay ubicaciones disponibles."
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
            rows={invoices.filter((invoice) => invoice.balance > 0)}
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
