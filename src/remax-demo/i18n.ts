import type { NavSection } from "@/lib/nav";
import type {
  RemaxCommunicationStatus,
  RemaxOperation,
  RemaxPriorityLevel,
  RemaxPropertyStatus,
  RemaxSentimentLabel,
  RemaxStaffType
} from "@/remax-demo/types";

export type RemaxLanguage = "es" | "en";

export const REMAX_LANGUAGE_COOKIE = "remax_demo_lang";
export const REMAX_LANGUAGE_STORAGE_KEY = "remax-demo-language";

const copy: Record<string, { es: string; en: string }> = {
  "REMAX Demo": { es: "REMAX Demo", en: "REMAX Demo" },
  "Plataforma operativa inmobiliaria de REMAX Activa desarrollada en Astro": {
    es: "Plataforma operativa inmobiliaria de REMAX Activa desarrollada en Astro",
    en: "Modern real estate operations platform for REMAX Activa built with Astro"
  },
  "Plataforma ejecutiva": { es: "Plataforma ejecutiva", en: "Executive Platform" },
  "Plataforma REMAX": { es: "Plataforma REMAX", en: "REMAX Platform" },
  "Alta de propiedad": { es: "Alta de propiedad", en: "Property Onboarding" },
  "Bajas y cierres": { es: "Bajas y cierres", en: "Closings & Offboarding" },
  Cancelaciones: { es: "Cancelaciones", en: "Cancellations" },
  "Gestion de cartera": { es: "Gestion de cartera", en: "Portfolio Management" },
  Equipo: { es: "Equipo", en: "Team" },
  Control: { es: "Control", en: "Control" },
  "Inteligencia comercial": { es: "Inteligencia comercial", en: "Commercial Intelligence" },
  "Analisis inteligente": { es: "Analisis inteligente", en: "Intelligent Analysis" },
  "Pipeline operativo": { es: "Pipeline operativo", en: "Operational Pipeline" },
  "Arquitectura Astro": { es: "Arquitectura Astro", en: "Astro Architecture" },
  Inicio: { es: "Inicio", en: "Home" },
  Operacion: { es: "Operacion", en: "Operations" },
  Gestion: { es: "Gestion", en: "Management" },
  Inteligencia: { es: "Inteligencia", en: "Intelligence" },
  Roadmap: { es: "Roadmap", en: "Roadmap" },
  Alta: { es: "Alta", en: "Onboarding" },
  "Bajas / cierres": { es: "Bajas / cierres", en: "Closings / Offboarding" },
  Cancelacion: { es: "Cancelacion", en: "Cancellation" },
  Propiedades: { es: "Propiedades", en: "Properties" },
  Valores: { es: "Valores", en: "Values" },
  Asesores: { es: "Asesores", en: "Agents" },
  Propietarios: { es: "Propietarios", en: "Owners" },
  Comunicados: { es: "Comunicados", en: "Communications" },
  "Arquitectura web moderna": { es: "Arquitectura web moderna", en: "Modern web architecture" },
  "Gestion centralizada": { es: "Gestion centralizada", en: "Centralized management" },
  "Propiedades, asesores y cierres": { es: "Propiedades, asesores y cierres", en: "Properties, agents and closings" },
  "Operacion comercial, cartera, propietarios, visitas y comunicados en una sola plataforma.": {
    es: "Operacion comercial, cartera, propietarios, visitas y comunicados en una sola plataforma.",
    en: "Commercial operations, portfolio, owners, visits and communications in one platform."
  },
  "Interfaz mas rapida, datos centralizados y base preparada para evolucionar a nuevas funciones.": {
    es: "Interfaz mas rapida, datos centralizados y base preparada para evolucionar a nuevas funciones.",
    en: "Faster interface, centralized data and a foundation ready to evolve into new capabilities."
  },
  "Plataforma disenada para la operacion inmobiliaria real": {
    es: "Plataforma disenada para la operacion inmobiliaria real",
    en: "Platform designed for real estate operations"
  },
  "Gestion centralizada de propiedades, asesores, propietarios, visitas y cierres": {
    es: "Gestion centralizada de propiedades, asesores, propietarios, visitas y cierres",
    en: "Centralized management of properties, agents, owners, visits and closings"
  },
  "martes, 24 de marzo de 2026": { es: "martes, 24 de marzo de 2026", en: "Tuesday, March 24, 2026" },
  "Generacion de clave": { es: "Generacion de clave", en: "Key generation" },
  Expediente: { es: "Expediente", en: "Record" },
  Condiciones: { es: "Condiciones", en: "Conditions" },
  Busqueda: { es: "Busqueda", en: "Search" },
  Registro: { es: "Registro", en: "Record" },
  Comunicado: { es: "Comunicado", en: "Communication" },
  "REMAX ACTIVA | PLATAFORMA OPERATIVA INMOBILIARIA": {
    es: "REMAX ACTIVA | PLATAFORMA OPERATIVA INMOBILIARIA",
    en: "REMAX ACTIVA | REAL ESTATE OPERATIONS PLATFORM"
  },
  "REMAX Activa | Plataforma Operativa Inmobiliaria": {
    es: "REMAX Activa | Plataforma Operativa Inmobiliaria",
    en: "REMAX Activa | Real Estate Operations Platform"
  },
  "Sistema inmobiliario moderno desarrollado en Astro para centralizar la operacion comercial, administrativa y ejecutiva de una oficina inmobiliaria en una sola plataforma mas clara, rapida y escalable.": {
    es: "Sistema inmobiliario moderno desarrollado en Astro para centralizar la operacion comercial, administrativa y ejecutiva de una oficina inmobiliaria en una sola plataforma mas clara, rapida y escalable.",
    en: "Modern real estate platform built with Astro to centralize commercial, administrative and executive operations in one clearer, faster and more scalable environment."
  },
  "Ver pipeline operativo": { es: "Ver pipeline operativo", en: "View operational pipeline" },
  "Abrir analisis inteligente": { es: "Abrir analisis inteligente", en: "Open intelligent analysis" },
  "Ver roadmap movil": { es: "Ver roadmap movil", en: "View mobile roadmap" },
  "Astro, Supabase y Railway": { es: "Astro, Supabase y Railway", en: "Astro, Supabase and Railway" },
  "Vista ejecutiva": { es: "Vista ejecutiva", en: "Executive view" },
  "Direccion, administracion y coordinacion comercial": {
    es: "Direccion, administracion y coordinacion comercial",
    en: "Leadership, administration and commercial coordination"
  },
  "Lectura sintetica del inventario, actividad, prioridades y capacidad de cierre desde una sola vista.": {
    es: "Lectura sintetica del inventario, actividad, prioridades y capacidad de cierre desde una sola vista.",
    en: "A condensed view of inventory, activity, priorities and closing capacity from a single screen."
  },
  "Pipeline activo": { es: "Pipeline activo", en: "Active pipeline" },
  "Alertas de seguimiento": { es: "Alertas de seguimiento", en: "Follow-up alerts" },
  "Cierres pendientes": { es: "Cierres pendientes", en: "Pending closings" },
  "Estado del equipo": { es: "Estado del equipo", en: "Team status" },
  "Oportunidades visibles entre lead, visitas, negociacion y cierre.": {
    es: "Oportunidades visibles entre lead, visitas, negociacion y cierre.",
    en: "Visible opportunities across lead, visits, negotiation and closing."
  },
  "Casos con prioridad alta detectados por la capa inteligente.": {
    es: "Casos con prioridad alta detectados por la capa inteligente.",
    en: "High-priority cases detected by the intelligent layer."
  },
  "Operaciones en negociacion o cierre con accion inmediata.": {
    es: "Operaciones en negociacion o cierre con accion inmediata.",
    en: "Deals in negotiation or closing that require immediate action."
  },
  "Equipo comercial activo con soporte administrativo y recepcion.": {
    es: "Equipo comercial activo con soporte administrativo y recepcion.",
    en: "Active commercial team supported by administration and front desk."
  },
  "Propiedades activas": { es: "Propiedades activas", en: "Active properties" },
  "Eventos de valor": { es: "Eventos de valor", en: "Value events" },
  "Comunicados del mes": { es: "Comunicados del mes", en: "Communications this month" },
  "Equipo operativo": { es: "Equipo operativo", en: "Operating team" },
  "Inventario comercial listo para seguimiento.": {
    es: "Inventario comercial listo para seguimiento.",
    en: "Commercial inventory ready for follow-up."
  },
  "Historico de precios y posiciones centralizado.": {
    es: "Historico de precios y posiciones centralizado.",
    en: "Price history and positioning centralized."
  },
  "Operacion interna unificada en un solo flujo.": {
    es: "Operacion interna unificada en un solo flujo.",
    en: "Internal operations unified in one workflow."
  },
  "Direccion, administracion, recepcion y asesores clase A y M.": {
    es: "Direccion, administracion, recepcion y asesores clase A y M.",
    en: "Leadership, administration, front desk and class A and M agents."
  },
  "Mas claridad operativa": { es: "Mas claridad operativa", en: "More operational clarity" },
  "Seguimiento comercial mas agil": { es: "Seguimiento comercial mas agil", en: "Faster commercial follow-up" },
  "Mejor visibilidad para direccion": { es: "Mejor visibilidad para direccion", en: "Better visibility for leadership" },
  "Base preparada para crecer": { es: "Base preparada para crecer", en: "Foundation ready to scale" }
};

Object.assign(copy, {
  "Por que esta plataforma": { es: "Por que esta plataforma", en: "Why this platform" },
  "Operacion comercial": { es: "Operacion comercial", en: "Commercial Operations" },
  "Gestion de cartera": { es: "Gestion de cartera", en: "Portfolio Management" },
  "Equipo y seguimiento": { es: "Equipo y seguimiento", en: "Team & Follow-up" },
  "Control y reportes": { es: "Control y reportes", en: "Control & Reporting" },
  "Capa comercial avanzada": { es: "Capa comercial avanzada", en: "Advanced Commercial Layer" },
  "Actividad reciente": { es: "Actividad reciente", en: "Recent Activity" },
  "Procesos abiertos": { es: "Procesos abiertos", en: "Open Processes" },
  "Acciones rapidas": { es: "Acciones rapidas", en: "Quick Actions" },
  "Hoja de ruta del producto": { es: "Hoja de ruta del producto", en: "Product Roadmap" },
  "Etapa 1 — Plataforma Web Operativa": { es: "Etapa 1 — Plataforma Web Operativa", en: "Stage 1 — Web Operations Platform" },
  "Etapa 2 — App movil para asesores en campo": { es: "Etapa 2 — App movil para asesores en campo", en: "Stage 2 — Mobile App for Field Agents" },
  "Flujos centrales para captar, cerrar, cancelar y mover visitas con una lectura mas clara.": {
    es: "Flujos centrales para captar, cerrar, cancelar y mover visitas con una lectura mas clara.",
    en: "Core workflows to onboard, close, cancel and manage visits with a clearer operational view."
  },
  "Clave, expediente, condiciones, asesores y ficha tecnica en un solo recorrido.": {
    es: "Clave, expediente, condiciones, asesores y ficha tecnica en un solo recorrido.",
    en: "Key generation, record, conditions, agents and technical sheet in one guided flow."
  },
  "Abrir alta": { es: "Abrir alta", en: "Open onboarding" },
  "Flujo continuo de captura.": { es: "Flujo continuo de captura.", en: "Continuous capture workflow." },
  "Salida comercial con valores, responsables y comunicado listos para control interno.": {
    es: "Salida comercial con valores, responsables y comunicado listos para control interno.",
    en: "Commercial offboarding with values, responsible parties and communication ready for internal control."
  },
  "Abrir cierre": { es: "Abrir cierre", en: "Open closing" },
  "Control de estatus final.": { es: "Control de estatus final.", en: "Final status control." },
  "Motivo, comision, responsables y trazabilidad de salida de cartera.": {
    es: "Motivo, comision, responsables y trazabilidad de salida de cartera.",
    en: "Reason, commission, responsible parties and full offboarding traceability."
  },
  "Abrir cancelacion": { es: "Abrir cancelacion", en: "Open cancellation" },
  "Seguimiento hasta comunicado.": { es: "Seguimiento hasta comunicado.", en: "Tracked through final communication." },
  "Visitas y recorridos": { es: "Visitas y recorridos", en: "Visits & Field Routes" },
  "Agenda de campo, visitas programadas y cobertura comercial del dia.": {
    es: "Agenda de campo, visitas programadas y cobertura comercial del dia.",
    en: "Field schedule, planned visits and daily commercial coverage."
  },
  "Ver agenda": { es: "Ver agenda", en: "View schedule" },
  "Lectura diaria de actividad.": { es: "Lectura diaria de actividad.", en: "Daily activity view." },
  "Inventario, valores, propietarios y control operativo por inmueble en una base unica.": {
    es: "Inventario, valores, propietarios y control operativo por inmueble en una base unica.",
    en: "Inventory, values, owners and operational control per property in one unified base."
  },
  "Expediente comercial, ubicacion, origen y estatus del inventario activo.": {
    es: "Expediente comercial, ubicacion, origen y estatus del inventario activo.",
    en: "Commercial record, location, source and status for active inventory."
  },
  "Ver propiedades": { es: "Ver propiedades", en: "View properties" },
  "Inventario siempre visible.": { es: "Inventario siempre visible.", en: "Inventory always visible." },
  "Historico de precio, posicion comercial y referencia para minuta.": {
    es: "Historico de precio, posicion comercial y referencia para minuta.",
    en: "Price history, commercial positioning and reference for minutes."
  },
  "Ver valores": { es: "Ver valores", en: "View values" },
  "Evolucion comercial clara.": { es: "Evolucion comercial clara.", en: "Clear commercial evolution." },
  "Relacion de propietarios, copropiedad y contacto vinculado a cada expediente.": {
    es: "Relacion de propietarios, copropiedad y contacto vinculado a cada expediente.",
    en: "Owner records, co-ownership and contact details linked to each property record."
  },
  "Ver propietarios": { es: "Ver propietarios", en: "View owners" },
  "Contacto y contexto unificados.": { es: "Contacto y contexto unificados.", en: "Contact and context unified." },
  "Control de llaves": { es: "Control de llaves", en: "Key Control" },
  "Recepcion, citas, disponibilidad y coordinacion de visitas por propiedad.": {
    es: "Recepcion, citas, disponibilidad y coordinacion de visitas por propiedad.",
    en: "Front desk, appointments, availability and visit coordination by property."
  },
  "Abrir control": { es: "Abrir control", en: "Open control" },
  "Operacion de campo sin friccion.": { es: "Operacion de campo sin friccion.", en: "Low-friction field operations." },
  "Asesores, guardias, recorridos y comisiones alineados en un mismo entorno operativo.": {
    es: "Asesores, guardias, recorridos y comisiones alineados en un mismo entorno operativo.",
    en: "Agents, shifts, field routes and commissions aligned in one operational environment."
  },
  "Clase A y M, participacion por contexto y visibilidad del equipo comercial.": {
    es: "Clase A y M, participacion por contexto y visibilidad del equipo comercial.",
    en: "Class A and M, contextual participation and visibility across the commercial team."
  },
  "Ver asesores": { es: "Ver asesores", en: "View agents" },
  "Direccion y equipo en la misma vista.": { es: "Direccion y equipo en la misma vista.", en: "Leadership and team in one view." },
  "Guardias": { es: "Guardias", en: "Shifts" },
  "Cobertura comercial y continuidad de atencion con foco en recepcion y respuesta.": {
    es: "Cobertura comercial y continuidad de atencion con foco en recepcion y respuesta.",
    en: "Commercial coverage and continuity of attention focused on front desk and response."
  },
  "Ver guardias": { es: "Ver guardias", en: "View shifts" },
  "Cobertura del dia.": { es: "Cobertura del dia.", en: "Daily coverage." },
  "Comisiones": { es: "Comisiones", en: "Commissions" },
  "Politica, monto y control interno visibles para asesores y administracion.": {
    es: "Politica, monto y control interno visibles para asesores y administracion.",
    en: "Policy, amount and internal control visible for agents and administration."
  },
  "Ver comisiones": { es: "Ver comisiones", en: "View commissions" },
  "Mas claridad para todo el equipo.": { es: "Mas claridad para todo el equipo.", en: "More clarity for the whole team." },
  "Recorridos": { es: "Recorridos", en: "Field Routes" },
  "Seguimiento de campo para visitas, cierres y cobertura por zona.": {
    es: "Seguimiento de campo para visitas, cierres y cobertura por zona.",
    en: "Field tracking for visits, closings and zone coverage."
  },
  "Ver recorridos": { es: "Ver recorridos", en: "View routes" },
  "Campo y coordinacion conectados.": { es: "Campo y coordinacion conectados.", en: "Field work and coordination connected." },
  "Comunicados, minutas, reporte ejecutivo y arquitectura del producto en una sola lectura.": {
    es: "Comunicados, minutas, reporte ejecutivo y arquitectura del producto en una sola lectura.",
    en: "Communications, minutes, executive reporting and product architecture in one view."
  },
  "Bitacora de altas, bajas y cancelaciones con vista previa y estado.": {
    es: "Bitacora de altas, bajas y cancelaciones con vista previa y estado.",
    en: "Log of onboarding, offboarding and cancellations with preview and status."
  },
  "Ver comunicados": { es: "Ver comunicados", en: "View communications" },
  "Historial centralizado.": { es: "Historial centralizado.", en: "Centralized history." },
  "Minutas": { es: "Minutas", en: "Minutes" },
  "Cambios comerciales vinculados a valores, cierres y salida administrativa.": {
    es: "Cambios comerciales vinculados a valores, cierres y salida administrativa.",
    en: "Commercial changes linked to values, closings and administrative offboarding."
  },
  "Ver minutas": { es: "Ver minutas", en: "View minutes" },
  "Menos friccion documental.": { es: "Menos friccion documental.", en: "Less documentation friction." },
  "Reporte de cartera": { es: "Reporte de cartera", en: "Portfolio Report" },
  "Inventario, procesos abiertos, actividad y estado comercial del mes.": {
    es: "Inventario, procesos abiertos, actividad y estado comercial del mes.",
    en: "Inventory, open processes, activity and monthly commercial status."
  },
  "Ver reporte": { es: "Ver reporte", en: "View report" },
  "Vista para direccion.": { es: "Vista para direccion.", en: "Leadership view." },
  "Arquitectura web": { es: "Arquitectura web", en: "Web Architecture" },
  "Astro, Supabase, Railway y evolucion futura a app movil conectada.": {
    es: "Astro, Supabase, Railway y evolucion futura a app movil conectada.",
    en: "Astro, Supabase, Railway and future evolution toward a connected mobile app."
  },
  "Ver arquitectura": { es: "Ver arquitectura", en: "View architecture" },
  "Operacion centralizada": { es: "Operacion centralizada", en: "Centralized operations" },
  "Propiedades, asesores, propietarios, visitas y cierres trabajan sobre la misma base operativa.": {
    es: "Propiedades, asesores, propietarios, visitas y cierres trabajan sobre la misma base operativa.",
    en: "Properties, agents, owners, visits and closings all run on the same operational base."
  },
  "Lectura ejecutiva": { es: "Lectura ejecutiva", en: "Executive visibility" },
  "Direccion y coordinacion comercial ven pipeline, actividad y alertas en una vista unica.": {
    es: "Direccion y coordinacion comercial ven pipeline, actividad y alertas en una vista unica.",
    en: "Leadership and commercial coordination see pipeline, activity and alerts in one unified view."
  },
  "Roadmap movil concreto": { es: "Roadmap movil concreto", en: "Concrete mobile roadmap" },
  "La etapa web resuelve control hoy y la etapa movil acelera al asesor en campo.": {
    es: "La etapa web resuelve control hoy y la etapa movil acelera al asesor en campo.",
    en: "The web stage solves control today and the mobile stage accelerates field agent productivity."
  },
  "Capa inteligente util": { es: "Capa inteligente util", en: "Useful intelligent layer" },
  "Hugging Face ayuda a priorizar seguimientos y detectar riesgo comercial real.": {
    es: "Hugging Face ayuda a priorizar seguimientos y detectar riesgo comercial real.",
    en: "Hugging Face helps prioritize follow-ups and detect real commercial risk."
  },
  "Revision de valores y comunicado de salida": { es: "Revision de valores y comunicado de salida", en: "Value review and offboarding communication" },
  "Confirmar ultimo valor y emitir comunicado interno": { es: "Confirmar ultimo valor y emitir comunicado interno", en: "Confirm latest value and issue internal communication" },
  "En revision": { es: "En revision", en: "In review" },
  "Registro, asesores y condicion de comision": { es: "Registro, asesores y condicion de comision", en: "Record, agents and commission condition" },
  "Validar cancelacion y confirmar salida operativa": { es: "Validar cancelacion y confirmar salida operativa", en: "Validate cancellation and confirm operational offboarding" },
  "Listo para comunicado": { es: "Listo para comunicado", en: "Ready for communication" },
  "Visitas, propietarios y control de agenda": { es: "Visitas, propietarios y control de agenda", en: "Visits, owners and schedule control" },
  "Actualizar visitas activas y feedback del cliente": { es: "Actualizar visitas activas y feedback del cliente", en: "Update active visits and client feedback" },
  "En seguimiento": { es: "En seguimiento", en: "Under follow-up" },
  "Nueva alta": { es: "Nueva alta", en: "New onboarding" },
  "Abrir un expediente desde clave hasta ficha tecnica.": {
    es: "Abrir un expediente desde clave hasta ficha tecnica.",
    en: "Open a property record from key generation to technical sheet."
  },
  "Operacion": { es: "Operacion", en: "Operations" },
  "Presentar la etapa 2 para asesores en campo.": {
    es: "Presentar la etapa 2 para asesores en campo.",
    en: "Present stage 2 for field agents."
  },
  "Mobile": { es: "Mobile", en: "Mobile" },
  "Dashboard del asesor": { es: "Dashboard del asesor", en: "Agent Dashboard" },
  "Buenos dias, Carlos": { es: "Buenos dias, Carlos", en: "Good morning, Carlos" },
  "Visitas hoy": { es: "Visitas hoy", en: "Visits today" },
  "Seguimientos pendientes": { es: "Seguimientos pendientes", en: "Pending follow-ups" },
  "Enfoque del dia: 2 visitas activas y 1 cierre por destrabar.": {
    es: "Enfoque del dia: 2 visitas activas y 1 cierre por destrabar.",
    en: "Focus for today: 2 active visits and 1 closing to unlock."
  },
  "Registrar visita": { es: "Registrar visita", en: "Log visit" },
  "Subir evidencia": { es: "Subir evidencia", en: "Upload evidence" },
  "Contactar cliente": { es: "Contactar cliente", en: "Contact client" },
  "Agenda de visitas": { es: "Agenda de visitas", en: "Visit Schedule" },
  "Agenda de hoy": { es: "Agenda de hoy", en: "Today's schedule" },
  Confirmada: { es: "Confirmada", en: "Confirmed" },
  "Ruta lista": { es: "Ruta lista", en: "Route ready" },
  "Ruta optimizada para cubrir zona poniente y cierre de campo antes de las 18:00.": {
    es: "Ruta optimizada para cubrir zona poniente y cierre de campo antes de las 18:00.",
    en: "Route optimized to cover the west zone and complete field work before 6:00 PM."
  },
  "Iniciar ruta": { es: "Iniciar ruta", en: "Start route" },
  "Marcar llegada": { es: "Marcar llegada", en: "Mark arrival" },
  "Ficha de propiedad": { es: "Ficha de propiedad", en: "Property Profile" },
  Direccion: { es: "Direccion", en: "Address" },
  Propietario: { es: "Propietario", en: "Owner" },
  "Asesor asignado": { es: "Asesor asignado", en: "Assigned agent" },
  Estado: { es: "Estado", en: "Status" },
  "Alta iniciada": { es: "Alta iniciada", en: "Onboarding started" },
  "Cliente interesado en agendar visita de seguimiento y revisar acceso para citas.": {
    es: "Cliente interesado en agendar visita de seguimiento y revisar acceso para citas.",
    en: "Client interested in scheduling a follow-up visit and reviewing access for appointments."
  },
  Llamar: { es: "Llamar", en: "Call" },
  "Abrir mapa": { es: "Abrir mapa", en: "Open map" },
  "Seguimiento de prospecto": { es: "Seguimiento de prospecto", en: "Prospect Follow-up" },
  Origen: { es: "Origen", en: "Source" },
  Interes: { es: "Interes", en: "Interest" },
  "Ultima interaccion": { es: "Ultima interaccion", en: "Last interaction" },
  "Proximo recordatorio": { es: "Proximo recordatorio", en: "Next reminder" },
  "Referido digital": { es: "Referido digital", en: "Digital referral" },
  "Casa familiar zona poniente": { es: "Casa familiar zona poniente", en: "Family home in the west zone" },
  "WhatsApp hace 2h": { es: "WhatsApp hace 2h", en: "WhatsApp 2h ago" },
  "Hoy 16:30": { es: "Hoy 16:30", en: "Today 4:30 PM" },
  "Prospecto activo; valora rapidez en respuesta y comparativo de precio por zona.": {
    es: "Prospecto activo; valora rapidez en respuesta y comparativo de precio por zona.",
    en: "Active prospect; values fast response and price comparisons by area."
  },
  Llamada: { es: "Llamada", en: "Call" },
  Correo: { es: "Correo", en: "Email" },
  "Actualizar estatus": { es: "Actualizar estatus", en: "Update status" },
  "Pensado para asesores en movimiento: visitas, seguimiento, contacto y operacion rapida desde el telefono.": {
    es: "Pensado para asesores en movimiento: visitas, seguimiento, contacto y operacion rapida desde el telefono.",
    en: "Built for agents on the move: visits, follow-up, contact and fast operations from the phone."
  },
  "Plataforma ejecutiva": { es: "Plataforma ejecutiva", en: "Executive Platform" },
  "Un cockpit de pilotaje inmobiliario con foco en operacion, ritmo comercial, alertas y capacidad de respuesta del equipo.": {
    es: "Un cockpit de pilotaje inmobiliario con foco en operacion, ritmo comercial, alertas y capacidad de respuesta del equipo.",
    en: "A real estate command cockpit focused on operations, commercial pace, alerts and team responsiveness."
  },
  "Corte operativo": { es: "Corte operativo", en: "Operational cut-off" },
  "25 de marzo de 2026": { es: "25 de marzo de 2026", en: "March 25, 2026" },
  "Operacion estable con actividad comercial alta, seguimiento prioritario visible y cierres por destrabar.": {
    es: "Operacion estable con actividad comercial alta, seguimiento prioritario visible y cierres por destrabar.",
    en: "Stable operations with strong commercial activity, visible priority follow-up and closings to unlock."
  },
  "Altas, cierres y seguimiento en curso.": { es: "Altas, cierres y seguimiento en curso.", en: "Onboarding, closings and follow-up currently in progress." },
  "Seguimientos criticos": { es: "Seguimientos criticos", en: "Critical follow-ups" },
  "Casos que requieren accion inmediata.": { es: "Casos que requieren accion inmediata.", en: "Cases requiring immediate action." },
  "Actividad comercial del mes": { es: "Actividad comercial del mes", en: "Commercial activity this month" },
  "Valores y comunicados con movimiento real.": { es: "Valores y comunicados con movimiento real.", en: "Values and communications with real movement." },
  "Equipo operativo en accion": { es: "Equipo operativo en accion", en: "Operating team in action" },
  "Direccion, staff, recepcion y asesores activos.": { es: "Direccion, staff, recepcion y asesores activos.", en: "Leadership, staff, front desk and active agents." },
  Activas: { es: "Activas", en: "Active" },
  Cerradas: { es: "Cerradas", en: "Closed" },
  Canceladas: { es: "Canceladas", en: "Cancelled" },
  "Procesos criticos del dia": { es: "Procesos criticos del dia", en: "Critical processes today" },
  "Resumen del pipeline comercial": { es: "Resumen del pipeline comercial", en: "Commercial pipeline summary" },
  "Alertas y seguimiento prioritario": { es: "Alertas y seguimiento prioritario", en: "Alerts & priority follow-up" },
  "Alertas ejecutivas": { es: "Alertas ejecutivas", en: "Executive alerts" },
  "Cliente sensible por precio": { es: "Cliente sensible por precio", en: "Price-sensitive client" },
  "Cancelacion pendiente de validacion": { es: "Cancelacion pendiente de validacion", en: "Cancellation pending validation" },
  "Cierre esperando comunicado": { es: "Cierre esperando comunicado", en: "Closing awaiting communication" },
  "Seguimiento vencido": { es: "Seguimiento vencido", en: "Overdue follow-up" },
  "Propiedad con visitas activas sin actualizacion": { es: "Propiedad con visitas activas sin actualizacion", en: "Property with active visits and no update" },
  "Disenada para direccion, coordinacion y control comercial con una lectura mas clara, rapida y accionable.": {
    es: "Disenada para direccion, coordinacion y control comercial con una lectura mas clara, rapida y accionable.",
    en: "Designed for leadership, coordination and commercial control with a clearer, faster and more actionable view."
  },
  "Ver Kanban": { es: "Ver Kanban", en: "View Kanban" },
  "Ver Lista": { es: "Ver Lista", en: "View List" },
  "Comunicado ALTA": { es: "Comunicado ALTA", en: "Onboarding communication" },
  "Comunicado BAJA": { es: "Comunicado BAJA", en: "Offboarding communication" },
  "Comunicado CANCELACION": { es: "Comunicado CANCELACION", en: "Cancellation communication" },
  "Actualizacion de valor": { es: "Actualizacion de valor", en: "Value update" },
  "Flujo ALTA de propiedad": { es: "Flujo ALTA de propiedad", en: "Property Onboarding Flow" },
  "Proceso de Baja / cierre": { es: "Proceso de Baja / cierre", en: "Closing / Offboarding Process" },
  "Proceso de Cancelacion": { es: "Proceso de Cancelacion", en: "Cancellation Process" },
  "Regresar a menú": { es: "Regresar a menú", en: "Back to menu" },
  "Ir a Baja": { es: "Ir a Baja", en: "Go to closing" },
  "Ir a Cancelacion": { es: "Ir a Cancelacion", en: "Go to cancellation" },
  "Ver bitacora": { es: "Ver bitacora", en: "View log" },
  "Registro de baja": { es: "Registro de baja", en: "Closing record" },
  "Revision de valores": { es: "Revision de valores", en: "Value review" },
  "Asesores de baja": { es: "Asesores de baja", en: "Closing agents" },
  "Registro de cancelacion": { es: "Registro de cancelacion", en: "Cancellation record" },
  "Asesores de cancelacion": { es: "Asesores de cancelacion", en: "Cancellation agents" }
});

export function normalizeRemaxLanguage(value?: string | null): RemaxLanguage {
  return value === "en" ? "en" : "es";
}

export function rt(language: RemaxLanguage, text: string): string {
  const normalized = text.replaceAll("RE/MAX", "REMAX");
  const entry = copy[normalized];
  return entry ? entry[language] : normalized;
}

export function translatePropertyStatus(language: RemaxLanguage, status: RemaxPropertyStatus): string {
  const map = {
    Activa: { es: "Activa", en: "Active" },
    Cerrada: { es: "Cerrada", en: "Closed" },
    Cancelada: { es: "Cancelada", en: "Cancelled" }
  } as const;

  return map[status][language];
}

export function translateCommunicationStatus(language: RemaxLanguage, status: RemaxCommunicationStatus): string {
  const map = {
    enviado: { es: "enviado", en: "sent" },
    borrador: { es: "borrador", en: "draft" },
    archivado: { es: "archivado", en: "archived" }
  } as const;

  return map[status][language];
}

export function translateCommunicationType(language: RemaxLanguage, type: string): string {
  const map: Record<string, { es: string; en: string }> = {
    ALTA: { es: "ALTA", en: "ONBOARDING" },
    BAJA: { es: "BAJA", en: "OFFBOARDING" },
    CANCELACION: { es: "CANCELACION", en: "CANCELLATION" }
  };

  return map[type]?.[language] ?? type;
}

export function translatePipelineStage(language: RemaxLanguage, stage: string): string {
  const map: Record<string, { es: string; en: string }> = {
    "Nuevo lead": { es: "Nuevo lead", en: "New lead" },
    Contactado: { es: "Contactado", en: "Contacted" },
    Evaluacion: { es: "Evaluacion", en: "Evaluation" },
    "Alta iniciada": { es: "Alta iniciada", en: "Onboarding started" },
    Publicado: { es: "Publicado", en: "Published" },
    Visitas: { es: "Visitas", en: "Visits" },
    Negociacion: { es: "Negociacion", en: "Negotiation" },
    Cierre: { es: "Cierre", en: "Closing" },
    Cancelado: { es: "Cancelado", en: "Cancelled" }
  };

  return map[stage]?.[language] ?? stage;
}

export function translatePriority(language: RemaxLanguage, priority: RemaxPriorityLevel): string {
  const map = {
    alta: { es: "alta", en: "high" },
    media: { es: "media", en: "medium" },
    baja: { es: "baja", en: "low" }
  } as const;

  return map[priority][language];
}

export function translateSentiment(language: RemaxLanguage, sentiment: RemaxSentimentLabel): string {
  const map = {
    positivo: { es: "positivo", en: "positive" },
    neutro: { es: "neutro", en: "neutral" },
    "sensible / en riesgo": { es: "sensible / en riesgo", en: "sensitive / at risk" }
  } as const;

  return map[sentiment][language];
}

export function translateOperation(language: RemaxLanguage, operation: RemaxOperation): string {
  return operation === "Venta"
    ? language === "es"
      ? "Venta"
      : "Sale"
    : language === "es"
      ? "Renta"
      : "Lease";
}

export function translateStaffType(language: RemaxLanguage, type: RemaxStaffType): string {
  const map = {
    asesor: { es: "asesor", en: "agent" },
    direccion: { es: "direccion", en: "leadership" },
    administrativo: { es: "administrativo", en: "administrative" },
    recepcion: { es: "recepcion", en: "front desk" }
  } as const;

  return map[type][language];
}

export function getRemaxDemoNavigation(language: RemaxLanguage): NavSection[] {
  return [
    {
      title: rt(language, "Inicio"),
      items: [{ label: rt(language, "Plataforma ejecutiva"), href: "/remax-demo" }]
    },
    {
      title: rt(language, "Operacion"),
      items: [
        { label: rt(language, "Alta"), href: "/remax-demo/alta" },
        { label: rt(language, "Bajas / cierres"), href: "/remax-demo/baja" },
        { label: rt(language, "Cancelacion"), href: "/remax-demo/cancelacion" }
      ]
    },
    {
      title: rt(language, "Gestion"),
      items: [
        { label: rt(language, "Propiedades"), href: "/remax-demo/propiedades" },
        { label: rt(language, "Valores"), href: "/remax-demo/valores" },
        { label: rt(language, "Asesores"), href: "/remax-demo/asesores" },
        { label: rt(language, "Propietarios"), href: "/remax-demo/propietarios" },
        { label: rt(language, "Comunicados"), href: "/remax-demo/comunicados" }
      ]
    },
    {
      title: rt(language, "Inteligencia"),
      items: [
        { label: rt(language, "Analisis inteligente"), href: "/remax-demo/analisis" },
        { label: rt(language, "Pipeline operativo"), href: "/remax-demo/pipeline" }
      ]
    },
    {
      title: rt(language, "Roadmap"),
      items: [{ label: rt(language, "Arquitectura Astro"), href: "/remax-demo/arquitectura" }]
    }
  ];
}
