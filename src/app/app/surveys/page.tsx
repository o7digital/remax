import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { DataOriginNotice } from "@/components/data-origin-notice";
import { DataTable } from "@/components/data-table";
import { PageHeader } from "@/components/page-header";
import { SectionCard } from "@/components/section-card";
import { StatCard } from "@/components/stat-card";
import { StatusBadge } from "@/components/status-badge";
import { getClientOverviewData } from "@/lib/remax-app-data";
import { getDemoI18n } from "@/lib/server-i18n";

const SURVEY_TEMPLATES = {
  visita_asesor_sitio: {
    label: "Visita Asesor en Sitio",
    questions: [
      "¿Qué tan satisfecho(a) quedaste con la visita del asesor? (1-5)",
      "¿El asesor llegó puntual a la cita?",
      "¿La explicación del inmueble fue clara y completa?",
      "¿Recomendarías a este asesor a otra persona?",
      "Comentarios adicionales"
    ]
  },
  cierre_operacion: {
    label: "Cierre de Operación",
    questions: [
      "¿Cómo calificarías el proceso de cierre? (1-5)",
      "¿La comunicación durante el cierre fue oportuna?",
      "¿La documentación fue clara?",
      "¿Te sentiste acompañado(a) durante todo el proceso?",
      "Comentarios adicionales"
    ]
  },
  postventa: {
    label: "Postventa",
    questions: [
      "¿Cómo evalúas la atención postventa? (1-5)",
      "¿Se resolvieron tus dudas después de la operación?",
      "¿Volverías a trabajar con REMAX Activa?",
      "¿Qué podríamos mejorar?"
    ]
  }
} as const;

type SurveyTemplateKey = keyof typeof SURVEY_TEMPLATES;

function buildSurveyEmailBody(args: {
  clientName: string;
  advisorName: string;
  template: SurveyTemplateKey;
  language: "es" | "en" | "fr";
}) {
  const template = SURVEY_TEMPLATES[args.template];

  if (args.language === "en") {
    return [
      `Hello ${args.clientName},`,
      "",
      `Thank you for your interaction with REMAX Activa. Please help us evaluate your experience with advisor ${args.advisorName}.`,
      "",
      `Survey: ${template.label}`,
      "",
      ...template.questions.map((question, index) => `${index + 1}. ${question}`),
      "",
      "Thank you for your feedback.",
      "REMAX Activa"
    ].join("\n");
  }

  if (args.language === "fr") {
    return [
      `Bonjour ${args.clientName},`,
      "",
      `Merci pour votre interaction avec REMAX Activa. Nous souhaitons evaluer votre experience avec le conseiller ${args.advisorName}.`,
      "",
      `Enquete: ${template.label}`,
      "",
      ...template.questions.map((question, index) => `${index + 1}. ${question}`),
      "",
      "Merci pour votre retour.",
      "REMAX Activa"
    ].join("\n");
  }

  return [
    `Hola ${args.clientName},`,
    "",
    `Gracias por tu interacción con REMAX Activa. Queremos conocer tu experiencia con el asesor ${args.advisorName}.`,
    "",
    `Encuesta: ${template.label}`,
    "",
    ...template.questions.map((question, index) => `${index + 1}. ${question}`),
    "",
    "Gracias por tu tiempo.",
    "REMAX Activa"
  ].join("\n");
}

async function sendSurveyAction(formData: FormData) {
  "use server";

  const clientId = String(formData.get("clientId") ?? "").trim();
  const surveyTemplate = String(formData.get("surveyTemplate") ?? "") as SurveyTemplateKey;
  const advisorName = String(formData.get("advisorName") ?? "Asesor REMAX").trim();
  const fallbackEmail = String(formData.get("fallbackEmail") ?? "").trim();
  const language = String(formData.get("language") ?? "es") as "es" | "en" | "fr";

  if (!clientId || !surveyTemplate || !SURVEY_TEMPLATES[surveyTemplate]) {
    redirect("/app/surveys?error=missing");
  }

  const { records } = await getClientOverviewData();
  const client = records.find((row) => row.id === clientId);

  if (!client) {
    redirect("/app/surveys?error=client_not_found");
  }

  const recipientEmail = fallbackEmail || client.email;

  if (!recipientEmail) {
    redirect("/app/surveys?error=no_email");
  }

  const subject =
    language === "en"
      ? `REMAX Survey - ${SURVEY_TEMPLATES[surveyTemplate].label}`
      : language === "fr"
        ? `Enquete REMAX - ${SURVEY_TEMPLATES[surveyTemplate].label}`
        : `Encuesta REMAX - ${SURVEY_TEMPLATES[surveyTemplate].label}`;

  const body = buildSurveyEmailBody({
    clientName: client.fullName,
    advisorName,
    template: surveyTemplate,
    language
  });

  const resendApiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.SURVEY_FROM_EMAIL ?? "Encuestas REMAX <onboarding@resend.dev>";

  if (!resendApiKey) {
    const mailto = `mailto:${encodeURIComponent(recipientEmail)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    redirect(`/app/surveys?warning=email_provider_missing&mailto=${encodeURIComponent(mailto)}`);
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [recipientEmail],
      subject,
      text: body
    })
  });

  if (!response.ok) {
    const payload = await response.text();
    redirect(`/app/surveys?error=${encodeURIComponent(payload.slice(0, 160))}`);
  }

  revalidatePath("/app/surveys");
  redirect("/app/surveys?sent=1");
}

export default async function SurveysPage({
  searchParams
}: {
  searchParams: Promise<{ sent?: string; error?: string; warning?: string; mailto?: string }>;
}) {
  const { locale, txt } = await getDemoI18n();
  const params = await searchParams;
  const { records } = await getClientOverviewData();

  const clientsWithEmail = records.filter((row) => Boolean(row.email));

  return (
    <div className="page-stack">
      <PageHeader
        title={txt("Encuestas")}
        description={txt("Crea y envia encuestas de satisfaccion a clientes despues de visitas, cierres o postventa.")}
      />

      <DataOriginNotice
        title={txt("Modulo operativo")}
        description={txt("Puedes enviar cuestionarios por email al cliente para medir experiencia con asesores y proceso comercial.")}
      />

      {params.sent ? <p className="helper-text">{txt("Encuesta enviada correctamente.")}</p> : null}
      {params.error ? <p className="auth-error">{txt("Error al enviar encuesta.")} {params.error}</p> : null}
      {params.warning === "email_provider_missing" ? (
        <div className="list-item">
          <strong>{txt("Proveedor de email no configurado.")}</strong>
          <p className="muted">{txt("Configura RESEND_API_KEY y SURVEY_FROM_EMAIL para envio automatico.")}</p>
          {params.mailto ? (
            <a className="table-link" href={decodeURIComponent(params.mailto)}>
              {txt("Abrir email manual")}
            </a>
          ) : null}
        </div>
      ) : null}

      <div className="stats-grid">
        <StatCard label={txt("Clientes disponibles")} value={String(records.length)} detail={txt("base clientes")}/>
        <StatCard label={txt("Con email")} value={String(clientsWithEmail.length)} detail={txt("listos para encuesta")}/>
        <StatCard label={txt("Templates")} value={String(Object.keys(SURVEY_TEMPLATES).length)} detail={txt("cuestionarios activos")}/>
      </div>

      <SectionCard
        title={txt("Crear encuesta para cliente")}
        description={txt("Selecciona cliente, template y asesor. El sistema envia el cuestionario por email.")}
      >
        <form action={sendSurveyAction} className="form-grid">
          <label className="field field-full">
            <span className="field-label">{txt("Cliente")}</span>
            <select name="clientId" required>
              <option value="">{txt("Seleccionar cliente")}</option>
              {records.slice(0, 300).map((client) => (
                <option key={client.id} value={client.id}>
                  {client.fullName} {client.email ? `· ${client.email}` : "· sin email"}
                </option>
              ))}
            </select>
          </label>

          <label className="field">
            <span className="field-label">{txt("Template")}</span>
            <select name="surveyTemplate" required>
              {Object.entries(SURVEY_TEMPLATES).map(([key, template]) => (
                <option key={key} value={key}>
                  {template.label}
                </option>
              ))}
            </select>
          </label>

          <label className="field">
            <span className="field-label">{txt("Nombre del asesor")}</span>
            <input name="advisorName" defaultValue="Asesor REMAX" required />
          </label>

          <label className="field">
            <span className="field-label">{txt("Email alternativo (opcional)")}</span>
            <input name="fallbackEmail" type="email" placeholder="cliente@correo.com" />
          </label>

          <label className="field">
            <span className="field-label">{txt("Idioma")}</span>
            <select name="language" defaultValue={locale}>
              <option value="es">ES</option>
              <option value="en">EN</option>
              <option value="fr">FR</option>
            </select>
          </label>

          <div className="field" style={{ alignSelf: "end" }}>
            <button className="button" type="submit">{txt("Enviar encuesta")}</button>
          </div>
        </form>
      </SectionCard>

      <SectionCard
        title={txt("Questionarios disponibles")}
        description={txt("Base inicial de encuestas para sitio, cierre y postventa.")}
      >
        <DataTable
          rows={Object.entries(SURVEY_TEMPLATES).map(([key, template]) => ({
            id: key,
            code: key,
            name: template.label,
            questionCount: template.questions.length,
            questions: template.questions
          }))}
          getRowId={(row) => row.id}
          columns={[
            { key: "code", label: txt("Codigo"), render: (row) => <span className="mono">{row.code}</span> },
            { key: "name", label: txt("Nombre"), render: (row) => row.name },
            {
              key: "count",
              label: txt("Preguntas"),
              align: "right",
              render: (row) => row.questionCount
            },
            {
              key: "status",
              label: txt("Estado"),
              render: () => <StatusBadge value={txt("activo")} />
            }
          ]}
        />

        <div className="list">
          {Object.entries(SURVEY_TEMPLATES).map(([key, template]) => (
            <div key={key} className="list-item">
              <strong>{template.label}</strong>
              <ol>
                {template.questions.map((question) => (
                  <li key={question} className="muted">{question}</li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}
