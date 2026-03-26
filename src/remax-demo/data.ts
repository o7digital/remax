import type {
  RemaxAdvisor,
  RemaxCommunication,
  RemaxPipelineItem,
  RemaxProperty,
  RemaxSentimentInsight,
  RemaxSelectOption
} from "@/remax-demo/types";

export const remaxCategoryOptions: RemaxSelectOption[] = [
  { label: "Exclusiva", code: "EX" },
  { label: "Opcion", code: "OP" },
  { label: "Coop", code: "CO" },
  { label: "Otro", code: "OT" }
];

export const remaxGiroOptions: RemaxSelectOption[] = [
  { label: "Residencial", code: "R" },
  { label: "Comercial", code: "C" },
  { label: "Industrial", code: "I" }
];

export const remaxTipoOptions: RemaxSelectOption[] = [
  { label: "Casa", code: "C" },
  { label: "Departamento", code: "D" },
  { label: "Bodega", code: "B" },
  { label: "Local", code: "L" },
  { label: "Terreno", code: "T" },
  { label: "Oficina", code: "O" }
];

export const remaxOperacionOptions: RemaxSelectOption[] = [
  { label: "Venta", code: "V" },
  { label: "Renta", code: "R" }
];

export const remaxDemoNotice = "Entorno demo con informacion ficticia";

export const remaxDemoDefaults = {
  altaPropertyKey: "REM-1012",
  bajaPropertyKey: "REM-2044",
  cancelacionPropertyKey: "REM-3308",
  featuredCancellationPropertyKey: "REM-4417",
  ownersPropertyKey: "REM-5521",
  officeClosurePropertyKey: "REM-6684",
  featuredCommunicationId: "com-cancel-rem-4417",
  defaultAdvisorId: "mariana-fuentes"
} as const;

export const remaxDemoAdvisors: RemaxAdvisor[] = [
  {
    id: "mariana-fuentes",
    nombre: "Mariana Fuentes",
    clase: "A",
    tipoPersonal: "direccion",
    rol: "Directora general / Asesora A",
    comisionRate: 0.075,
    activo: true
  },
  {
    id: "carlos-herrera",
    nombre: "Carlos Herrera",
    clase: "A",
    tipoPersonal: "asesor",
    rol: "Lider comercial corporativo",
    comisionRate: 0.07,
    activo: true
  },
  {
    id: "alejandra-rios",
    nombre: "Alejandra Rios",
    clase: "A",
    tipoPersonal: "asesor",
    rol: "Captacion residencial premium",
    comisionRate: 0.07,
    activo: true
  },
  {
    id: "julieta-mora",
    nombre: "Julieta Mora",
    clase: "A",
    tipoPersonal: "asesor",
    rol: "Cierres y negociacion",
    comisionRate: 0.07,
    activo: true
  },
  {
    id: "andrea-lozano",
    nombre: "Andrea Lozano",
    clase: "A",
    tipoPersonal: "asesor",
    rol: "Inventario residencial",
    comisionRate: 0.07,
    activo: true
  },
  {
    id: "ricardo-salinas",
    nombre: "Ricardo Salinas",
    clase: "M",
    tipoPersonal: "asesor",
    rol: "Prospeccion zona sur",
    comisionRate: 0.045,
    activo: true
  },
  {
    id: "sofia-cardenas",
    nombre: "Sofia Cardenas",
    clase: "M",
    tipoPersonal: "asesor",
    rol: "Seguimiento comercial",
    comisionRate: 0.045,
    activo: true
  },
  {
    id: "luis-navarro",
    nombre: "Luis Navarro",
    clase: "M",
    tipoPersonal: "asesor",
    rol: "Cobertura y visitas",
    comisionRate: 0.045,
    activo: true
  },
  {
    id: "valeria-mendoza",
    nombre: "Asesor Demo Norte",
    clase: "M",
    tipoPersonal: "asesor",
    rol: "Control de cartera",
    comisionRate: 0.0425,
    activo: true
  },
  {
    id: "diego-romero",
    nombre: "Asesor Demo Poniente",
    clase: "M",
    tipoPersonal: "asesor",
    rol: "Rentas residenciales",
    comisionRate: 0.045,
    activo: true
  },
  {
    id: "karla-ortega",
    nombre: "Agenda Demo",
    clase: "M",
    tipoPersonal: "asesor",
    rol: "Agenda y recorridos",
    comisionRate: 0.04,
    activo: true
  },
  {
    id: "tomas-aguilar",
    nombre: "Inventario Demo",
    clase: "M",
    tipoPersonal: "asesor",
    rol: "Inventario y llaves",
    comisionRate: 0.04,
    activo: true
  },
  {
    id: "patricia-solis",
    nombre: "Operaciones Demo",
    clase: null,
    tipoPersonal: "administrativo",
    rol: "Coordinacion operativa",
    comisionRate: null,
    activo: true
  },
  {
    id: "erika-navarro",
    nombre: "Comisiones Demo",
    clase: null,
    tipoPersonal: "administrativo",
    rol: "Control de comisiones",
    comisionRate: null,
    activo: true
  },
  {
    id: "leonor-paz",
    nombre: "Backoffice Demo",
    clase: null,
    tipoPersonal: "administrativo",
    rol: "Backoffice de captacion",
    comisionRate: null,
    activo: true
  },
  {
    id: "susana-vega",
    nombre: "Contratos Demo",
    clase: null,
    tipoPersonal: "administrativo",
    rol: "Expedientes y contratos",
    comisionRate: null,
    activo: true
  },
  {
    id: "gabriela-duarte",
    nombre: "Recepcion Demo",
    clase: null,
    tipoPersonal: "recepcion",
    rol: "Recepcion y agenda comercial",
    comisionRate: null,
    activo: true
  }
];

const defaultResidentialSheet = {
  estilo: "Contemporaneo",
  proyecto: "Remax Activa Residencial",
  acabados: "Piso porcelanato y carpinteria en maple",
  conservacion: "Muy buena",
  fachada: "Moderna",
  ventanas: "Aluminio",
  cristales: "Templado",
  carpinteria: "Encino",
  puertas: "Madera solida",
  otro: "Preparacion para minisplit",
  amenidades: ["Salon de TV", "Lavanderia", "Jardin"],
  espacios: [
    { nombre: "Sala", nivel: "PB", banos: 0, acabados: "Piso marmol" },
    { nombre: "Comedor", nivel: "PB", banos: 0, acabados: "Muro decorativo" },
    { nombre: "Rec principal", nivel: "PA", banos: 1, acabados: "Vestidor y terraza" }
  ]
};

const defaultCommercialSheet = {
  categoria: "Industrial",
  clasificacion: "Bodega operativa",
  vigilancia: true,
  telefonos: true,
  lineas: "2",
  iluminacion: "LED",
  banios: 2,
  elevador: false,
  estacionamiento: "33 cajones",
  observaciones: "Espacio listo para operacion con acceso de trailers."
};

export const remaxDemoCommunications: RemaxCommunication[] = [
  {
    id: "com-alta-rem-1012",
    tipo: "ALTA",
    propiedadClave: "REM-1012",
    fecha: "2026-03-21",
    asunto: "COMUNICADO INTERNO: ALTA DE PROPIEDAD, REM-1012.",
    destinatarios: ["inventario@remax-demo.test", "recepcion@remax-demo.test"],
    estado: "enviado",
    resumen: "Se informa el alta demo de REM-1012 y la apertura del expediente operativo.",
    remitente: "Inventario REMAX Demo",
    firma: "Operaciones Demo | Coordinacion operativa"
  },
  {
    id: "com-baja-rem-2044",
    tipo: "BAJA",
    propiedadClave: "REM-2044",
    fecha: "2026-03-18",
    asunto: "COMUNICADO INTERNO: BAJA / CIERRE DE PROPIEDAD, REM-2044.",
    destinatarios: ["comisiones@remax-demo.test", "operaciones@remax-demo.test"],
    estado: "enviado",
    resumen: "REM-2044 pasa a cerrada y se activa el circuito interno de comisiones demo.",
    remitente: "Inventario REMAX Demo",
    firma: "Comisiones Demo | Control de comisiones"
  },
  {
    id: "com-cancel-rem-3308",
    tipo: "CANCELACION",
    propiedadClave: "REM-3308",
    fecha: "2026-03-24",
    asunto: "COMUNICADO INTERNO: CANCELACION DE PROPIEDAD, REM-3308.",
    destinatarios: ["direccion.demo@remax-demo.test", "inventario@remax-demo.test"],
    estado: "borrador",
    resumen: "Se documenta la cancelacion demo de REM-3308 con motivo registrado por operaciones.",
    remitente: "Inventario REMAX Demo",
    firma: "Operaciones Demo | Coordinacion operativa"
  },
  {
    id: "com-cancel-rem-4417",
    tipo: "CANCELACION",
    propiedadClave: "REM-4417",
    fecha: "2026-03-24",
    asunto: "COMUNICADO INTERNO: CANCELACION DE PROPIEDAD, REM-4417.",
    destinatarios: ["todos@remax-demo.test"],
    estado: "enviado",
    resumen: "Se informa la salida de REM-4417 del inventario demo y el cierre administrativo del expediente.",
    remitente: "Inventario REMAX Demo",
    firma: "Operaciones Demo | Coordinacion operativa"
  },
  {
    id: "com-alta-rem-5521",
    tipo: "ALTA",
    propiedadClave: "REM-5521",
    fecha: "2026-02-12",
    asunto: "COMUNICADO INTERNO: ALTA DE PROPIEDAD, REM-5521.",
    destinatarios: ["inventario@remax-demo.test", "recepcion@remax-demo.test"],
    estado: "enviado",
    resumen: "Nueva captacion residencial demo lista para publicacion y agenda de visitas.",
    remitente: "Inventario REMAX Demo",
    firma: "Recepcion Demo | Recepcion"
  },
  {
    id: "com-baja-rem-6684",
    tipo: "BAJA",
    propiedadClave: "REM-6684",
    fecha: "2026-02-28",
    asunto: "COMUNICADO INTERNO: BAJA DE PROPIEDAD, REM-6684.",
    destinatarios: ["comisiones@remax-demo.test", "operaciones@remax-demo.test"],
    estado: "archivado",
    resumen: "La oficina demo REM-6684 se marca como cerrada por firma del contrato ejecutivo.",
    remitente: "Inventario REMAX Demo",
    firma: "Operaciones Demo | Coordinacion operativa"
  }
];

export const remaxDemoSentimentInsights: RemaxSentimentInsight[] = [
  {
    id: "insight-rem-1012",
    sourceLabel: "REM-1012 · Alta iniciada",
    advisorId: "mariana-fuentes",
    propertyClave: "REM-1012",
    clientName: "Andrea Lozano",
    createdAt: "2026-03-24",
    note: "Cliente interesada, pero quiere revisar precio la proxima semana.",
    sentiment: "neutro",
    priority: "alta",
    suggestedAction: "seguimiento inmediato",
    nextFollowUp: "Hoy 17:00",
    commercialSignal: "Interes activo con decision condicionada al ajuste de propuesta."
  },
  {
    id: "insight-rem-2044",
    sourceLabel: "REM-2044 · Cierre en revision",
    advisorId: "julieta-mora",
    propertyClave: "REM-2044",
    clientName: "Arboledas Oficinas Demo",
    createdAt: "2026-03-22",
    note: "Propietario abierto a negociar tiempos de cierre.",
    sentiment: "positivo",
    priority: "media",
    suggestedAction: "recontactar en 48h",
    nextFollowUp: "26/03/2026 · 11:30",
    commercialSignal: "Buen escenario para cerrar si se define el calendario final."
  },
  {
    id: "insight-rem-3308",
    sourceLabel: "REM-3308 · Cancelacion documentada",
    advisorId: "sofia-cardenas",
    propertyClave: "REM-3308",
    clientName: "Alejandra Rios",
    createdAt: "2026-03-24",
    note: "Seguimiento pendiente despues de visita y el propietario ya considera pausar la venta.",
    sentiment: "sensible / en riesgo",
    priority: "alta",
    suggestedAction: "seguimiento inmediato",
    nextFollowUp: "Hoy 14:00",
    commercialSignal: "Riesgo comercial elevado por perdida de confianza en el seguimiento."
  },
  {
    id: "insight-rem-4417",
    sourceLabel: "REM-4417 · Seguimiento comercial",
    advisorId: "ricardo-salinas",
    propertyClave: "REM-4417",
    clientName: "Residencial Altaria Demo",
    createdAt: "2026-03-23",
    note: "Responden lento y piden frenar publicaciones hasta validar estrategia familiar.",
    sentiment: "sensible / en riesgo",
    priority: "media",
    suggestedAction: "oportunidad fria",
    nextFollowUp: "29/03/2026 · Revisar reactivacion",
    commercialSignal: "Interes bajo y riesgo de salida si no hay nuevo detonador comercial."
  },
  {
    id: "insight-rem-5521",
    sourceLabel: "REM-5521 · Publicacion lista",
    advisorId: "alejandra-rios",
    propertyClave: "REM-5521",
    clientName: "Mariana Fuentes y Ricardo Salinas",
    createdAt: "2026-03-21",
    note: "Oportunidad con interes alto y respuesta rapida.",
    sentiment: "positivo",
    priority: "media",
    suggestedAction: "recontactar en 48h",
    nextFollowUp: "26/03/2026 · 09:00",
    commercialSignal: "Buen momento para empujar visibilidad y activar agenda de visitas."
  },
  {
    id: "insight-rem-6684",
    sourceLabel: "REM-6684 · Seguimiento post cierre",
    advisorId: "carlos-herrera",
    propertyClave: "REM-6684",
    clientName: "Torre Central 402 Demo",
    createdAt: "2026-03-20",
    note: "Cliente satisfecho con el cierre demo, sin nuevas necesidades para este trimestre.",
    sentiment: "neutro",
    priority: "baja",
    suggestedAction: "oportunidad fria",
    nextFollowUp: "05/04/2026 · Seguimiento relacional",
    commercialSignal: "Relacion sana, aunque sin urgencia comercial inmediata."
  },
  {
    id: "insight-lead-verde",
    sourceLabel: "Lead comprador · Bosque Verde",
    advisorId: "luis-navarro",
    clientName: "Andrea Lozano",
    createdAt: "2026-03-25",
    note: "Solicita visita esta semana, comparte presupuesto y responde rapido por WhatsApp.",
    sentiment: "positivo",
    priority: "alta",
    suggestedAction: "seguimiento inmediato",
    nextFollowUp: "Hoy 12:30",
    commercialSignal: "Lead caliente con buena velocidad de respuesta y agenda disponible."
  }
];

export const remaxPipelineStages = [
  "Nuevo lead",
  "Contactado",
  "Evaluacion",
  "Alta iniciada",
  "Publicado",
  "Visitas",
  "Negociacion",
  "Cierre",
  "Cancelado"
] as const;

export const remaxDemoPipelineItems: RemaxPipelineItem[] = [
  {
    id: "pipe-001",
    stage: "Nuevo lead",
    itemLabel: "Andrea Lozano · Bosque Verde",
    advisorId: "luis-navarro",
    clientName: "Andrea Lozano",
    status: "Busca casa en zona poniente y quiere visita esta semana",
    nextAction: "Llamar hoy 16:30 para validar presupuesto y tiempos",
    sentiment: "positivo",
    priority: "alta",
    commercialReference: "Presupuesto MXN 7.2M",
    updatedAt: "2026-03-25"
  },
  {
    id: "pipe-002",
    stage: "Contactado",
    itemLabel: "REM-5521",
    advisorId: "alejandra-rios",
    propertyClave: "REM-5521",
    clientName: "Mariana Fuentes y Ricardo Salinas",
    status: "Propietarios alineados con lanzamiento comercial demo",
    nextAction: "Confirmar calendario de publicaciones en 48h",
    sentiment: "neutro",
    priority: "media",
    commercialReference: "Salida MXN 8.35M",
    updatedAt: "2026-03-24"
  },
  {
    id: "pipe-003",
    stage: "Evaluacion",
    itemLabel: "Lead corporativo · Arboledas Oficinas",
    advisorId: "carlos-herrera",
    clientName: "Arboledas Oficinas Demo",
    status: "Requiere 900 m2 y 18 cajones",
    nextAction: "Cruzar inventario y enviar shortlist comercial",
    sentiment: "positivo",
    priority: "alta",
    commercialReference: "Renta objetivo MXN 185k",
    updatedAt: "2026-03-24"
  },
  {
    id: "pipe-004",
    stage: "Alta iniciada",
    itemLabel: "REM-1012",
    advisorId: "mariana-fuentes",
    propertyClave: "REM-1012",
    clientName: "Bosque Verde Demo",
    status: "Expediente y condiciones en captura",
    nextAction: "Cerrar propietarios y ficha tecnica hoy",
    sentiment: "positivo",
    priority: "alta",
    commercialReference: "Referencia REM-1012",
    updatedAt: "2026-03-24"
  },
  {
    id: "pipe-005",
    stage: "Publicado",
    itemLabel: "REM-4417",
    advisorId: "ricardo-salinas",
    propertyClave: "REM-4417",
    clientName: "Residencial Altaria Demo",
    status: "Publicacion activa con respuesta irregular",
    nextAction: "Revisar material visual y relanzar anuncio",
    sentiment: "sensible / en riesgo",
    priority: "media",
    commercialReference: "Campana activa 10 dias",
    updatedAt: "2026-03-23"
  },
  {
    id: "pipe-006",
    stage: "Visitas",
    itemLabel: "Lead comprador · Vista Encino",
    advisorId: "julieta-mora",
    clientName: "Sofia Cardenas",
    status: "Dos visitas confirmadas para esta semana",
    nextAction: "Coordinar acceso, llaves y feedback comercial",
    sentiment: "positivo",
    priority: "alta",
    commercialReference: "Meta de cierre MXN 8.1M",
    updatedAt: "2026-03-22"
  },
  {
    id: "pipe-007",
    stage: "Negociacion",
    itemLabel: "REM-6684",
    advisorId: "carlos-herrera",
    propertyClave: "REM-6684",
    clientName: "Torre Central 402 Demo",
    status: "Condiciones economicas en revision final",
    nextAction: "Alinear mantenimiento y vigencia antes del viernes",
    sentiment: "sensible / en riesgo",
    priority: "alta",
    commercialReference: "Renta anual MXN 118k",
    updatedAt: "2026-03-21"
  },
  {
    id: "pipe-008",
    stage: "Cierre",
    itemLabel: "Jardines Premier",
    advisorId: "mariana-fuentes",
    clientName: "Jardines Premier Demo",
    status: "Firma operativa y comisiones por validar",
    nextAction: "Confirmar minuta y liberar comunicado interno",
    sentiment: "neutro",
    priority: "media",
    commercialReference: "Ingreso estimado MXN 82k",
    updatedAt: "2026-03-20"
  },
  {
    id: "pipe-009",
    stage: "Cancelado",
    itemLabel: "REM-3308",
    advisorId: "sofia-cardenas",
    propertyClave: "REM-3308",
    clientName: "Alejandra Rios",
    status: "Salida de cartera con observacion de servicio",
    nextAction: "Cerrar seguimiento y documentar aprendizajes",
    sentiment: "sensible / en riesgo",
    priority: "baja",
    commercialReference: "Caso archivado demo",
    updatedAt: "2026-03-24"
  }
];

export const remaxDemoProperties: RemaxProperty[] = [
  {
    id: "prop-rem-1012",
    folio: 1012,
    clave: "REM-1012",
    categoria: "Opcion",
    categoriaCode: "OP",
    giro: "Industrial",
    giroCode: "I",
    tipo: "Bodega",
    tipoCode: "B",
    operacion: "Renta",
    operacionCode: "R",
    exclusividad: "Opcion",
    estatus: "Activa",
    altaBaja: "Alta",
    descripcionCorta: "Circuito Bosque Verde 128, Nave 4, Parque Vista Encino",
    address: {
      calle: "Circuito Bosque Verde",
      noExt: "128",
      noInt: "Nave 4",
      edificio: "",
      piso: "PB",
      entreCalles: "Av. Logistica y Blvd. Altaria",
      colonia: "Vista Encino",
      coto: "Parque industrial",
      fraccionamiento: "Bosque Verde",
      municipio: "Zapopan",
      cp: "45130",
      entidad: "Jalisco",
      coordenadasGuiaRoji: "BV-12"
    },
    agenda: {
      condicionesVisitas: "Citas",
      cajaNo: "",
      disponibilidadVisitas: "Disponible",
      estatusLlaves: "Control digital",
      telCitas: "33 0000 1012",
      contactoCitas: "Agenda Demo",
      origen: "Referido",
      origenDetalle: "Red de inversionistas demo"
    },
    fechas: {
      alta: "2026-03-21",
      aviso: "2026-03-21",
      contrato: "2026-03-21",
      inicioPromo: "2026-03-21"
    },
    referidos: {
      idRef: "REM-REF-12",
      nombre: "Ricardo Salinas",
      empresa: "Bosque Verde Demo"
    },
    ids: {
      ampi: "REM1012",
      remax: "RMX-REM1012",
      catastral: "DEMO-BV-1012"
    },
    visitaRecorrido: "Programada",
    comoLlegar: {
      ligasA: "REMAX Demo y mapa interno",
      remax: "demo.remax.test/rem-1012",
      googleMap: "maps.demo.test/rem-1012",
      googleEarth: "earth.demo.test/rem-1012",
      ampi: "ampi.demo.test/rem-1012",
      fichaArchivo: "REM-1012-demo",
      ftPdf: "REM-1012.pdf",
      comentarios: "Expediente demo completo y listo para checklist."
    },
    caracteristicas: {
      supTerreno: 620,
      supConstruccion: 4400,
      frente: 34,
      fondo: 110,
      frentes: 1,
      recamaras: 0,
      banos: 2,
      medioBanos: 0,
      jardin: false,
      estacionamientosCubiertos: 0,
      estacionamientosDescubiertos: 18,
      nivel: "PB",
      pisosTotales: 1,
      exteriorInterior: "Exterior",
      noUnidades: 1,
      vistaA: "Patio de maniobra",
      elevadores: 0,
      edad: 3,
      formaTerreno: "Regular",
      inclinacion: "Plano",
      ubicacion: "Esquina",
      usoSuelo: "Industrial",
      restricciones: "Reglamento de parque",
      descripcion: "Bodega operativa con patio de maniobra y oficinas integradas.",
      categoria: "Industrial",
      notas: "Material visual demo y checklist juridico completos.",
      servicios: ["Transportes", "Parques", "Comercios", "Bancos"],
      superficiesValores: [
        { concepto: "Terreno", metros: 620, valor: 0, total: 0 },
        { concepto: "Nave principal", metros: 4400, valor: 42, total: 184800 },
        { concepto: "Oficinas", metros: 180, valor: 15, total: 2700 }
      ]
    },
    condicionesOperacion: {
      modoComision: "politica",
      porcentaje: 100,
      monto: 0,
      politicaVigente: "Politica demo de renta vigente",
      aplicaExcepcion: false,
      politicaAnterior: "",
      datosConfirmados: true,
      comentarios: "Registro demo validado con propietario y direccion comercial."
    },
    condicionesRenta: {
      anos: 2,
      formaPago: "Mensual",
      rentaAdelantada: true,
      rentaDeposito: true,
      aplicaFianza: false,
      afianzadora: "",
      montoFianza: 0,
      fiadorSolidario: true,
      fiadorBienRaiz: false,
      contratoTransaccion: true,
      vigencia: "24 meses",
      contratoIntermediacion: true,
      seguroDanios: true,
      seguroResponsabilidadCivil: true,
      investigacion: true,
      costoInvestigacion: 2800,
      investigador: "Control Demo",
      herramientaJuridica: "Convenio interno",
      abogado: "Juridico Demo",
      notario: "N/A",
      empresa: "REMAX Demo",
      aplicaMantenimiento: true,
      montoMantenimiento: 12500,
      periodoMantenimiento: "Mensual",
      observaciones: "Contrato demo con mantenimiento y validacion previa."
    },
    propietarios: [
      {
        id: "owner-rem-1012-1",
        nombre: "Alejandra Rios",
        telefono: "33 0000 1112",
        correo: "owner.demo.a@remax-demo.test",
        principal: true
      }
    ],
    asesoresAlta: [
      {
        advisorId: "mariana-fuentes",
        nivel: "A",
        comisionTipo: "%",
        participacionPorcentaje: 70,
        monto: 131250,
        tipoIntervencion: "Alta",
        contexto: "Alta"
      },
      {
        advisorId: "luis-navarro",
        nivel: "M",
        comisionTipo: "%",
        participacionPorcentaje: 30,
        monto: 56250,
        tipoIntervencion: "Seguimiento inicial",
        contexto: "Alta"
      }
    ],
    asesoresBaja: [],
    asesoresCancelacion: [],
    fichaTecnica: {
      residencial: {
        ...defaultResidentialSheet,
        estilo: "Industrial adaptable",
        proyecto: "Bosque Verde demo",
        acabados: "Muros reforzados y piso pulido",
        conservacion: "Muy buena",
        fachada: "Nave contemporanea",
        ventanas: "Fijas",
        cristales: "Templado",
        carpinteria: "Metalica",
        puertas: "Cortina industrial",
        otro: "Anden de carga y acceso trailer",
        amenidades: ["Patio", "Oficinas", "Comedor"],
        espacios: [
          { nombre: "Oficina interna", nivel: "PB", banos: 1, acabados: "Yeso y pintura" },
          { nombre: "Area operativa", nivel: "PB", banos: 1, acabados: "Piso pulido" },
          { nombre: "Patio de maniobras", nivel: "PB", banos: 0, acabados: "Concreto" }
        ]
      },
      comercial: {
        ...defaultCommercialSheet,
        categoria: "Industrial",
        clasificacion: "Bodega operativa demo",
        estacionamiento: "18 cajones descubiertos",
        observaciones: "Espacio demo listo para operacion con acceso de proveedores."
      }
    },
    historialValores: [
      {
        id: "vh-rem-1012-1",
        propiedadClave: "REM-1012",
        fecha: "2026-03-21",
        valor: 192000,
        moneda: "Pesos",
        posicion: "",
        motivoCambio: "Alta inicial",
        motivoMinuta: "Alta de propiedad",
        usuario: "Mariana Fuentes"
      },
      {
        id: "vh-rem-1012-2",
        propiedadClave: "REM-1012",
        fecha: "2026-03-24",
        valor: 187500,
        moneda: "Pesos",
        posicion: "Ultimo",
        motivoCambio: "Ajuste demo por estrategia comercial",
        motivoMinuta: "Cambio de precio",
        usuario: "Luis Navarro"
      }
    ]
  },
  {
    id: "prop-rem-2044",
    folio: 2044,
    clave: "REM-2044",
    categoria: "Coop",
    categoriaCode: "CO",
    giro: "Comercial",
    giroCode: "C",
    tipo: "Local",
    tipoCode: "L",
    operacion: "Renta",
    operacionCode: "R",
    exclusividad: "Coop",
    estatus: "Cerrada",
    altaBaja: "Baja",
    descripcionCorta: "Boulevard Jardines Premier 2044, Local 3",
    address: {
      calle: "Boulevard Jardines Premier",
      noExt: "2044",
      noInt: "Local 3",
      edificio: "",
      piso: "PB",
      entreCalles: "Av. Central y Paseo Altaria",
      colonia: "Jardines Premier",
      coto: "",
      fraccionamiento: "",
      municipio: "Guadalajara",
      cp: "44680",
      entidad: "Jalisco",
      coordenadasGuiaRoji: "JP-20"
    },
    agenda: {
      condicionesVisitas: "Citas",
      cajaNo: "14",
      disponibilidadVisitas: "Disponible",
      estatusLlaves: "Activas",
      telCitas: "33 0000 2044",
      contactoCitas: "Recepcion Demo",
      origen: "Portal",
      origenDetalle: "Campana demo"
    },
    fechas: {
      alta: "2025-11-13",
      aviso: "2025-11-13",
      contrato: "2025-11-14",
      inicioPromo: "2025-11-18"
    },
    referidos: {
      idRef: "REM-REF-20",
      nombre: "Julieta Mora",
      empresa: "Jardines Premier Demo"
    },
    ids: {
      ampi: "REM2044",
      remax: "RMX-REM2044",
      catastral: "DEMO-JP-2044"
    },
    visitaRecorrido: "Visitada",
    comoLlegar: {
      ligasA: "Mapa interno y AMPI demo",
      remax: "demo.remax.test/rem-2044",
      googleMap: "maps.demo.test/rem-2044",
      googleEarth: "",
      ampi: "ampi.demo.test/rem-2044",
      fichaArchivo: "REM-2044",
      ftPdf: "REM-2044.pdf",
      comentarios: "Historial de valores demo revisado antes del cierre."
    },
    caracteristicas: {
      supTerreno: 420,
      supConstruccion: 310,
      frente: 16,
      fondo: 25,
      frentes: 1,
      recamaras: 0,
      banos: 2,
      medioBanos: 1,
      jardin: false,
      estacionamientosCubiertos: 2,
      estacionamientosDescubiertos: 6,
      nivel: "PB",
      pisosTotales: 1,
      exteriorInterior: "Exterior",
      noUnidades: 1,
      vistaA: "Corredor comercial",
      elevadores: 0,
      edad: 4,
      formaTerreno: "Regular",
      inclinacion: "Plano",
      ubicacion: "Esquina",
      usoSuelo: "Comercial",
      restricciones: "Horarios de plaza",
      descripcion: "Local comercial demo cerrado por firma anual.",
      categoria: "Comercial",
      notas: "Se ajusto valor previo a la firma final.",
      servicios: ["Transportes", "Comercios", "Bancos"],
      superficiesValores: [
        { concepto: "Terreno", metros: 420, valor: 0, total: 0 },
        { concepto: "Local comercial", metros: 310, valor: 264.5, total: 81995 }
      ]
    },
    condicionesOperacion: {
      modoComision: "monto",
      porcentaje: 0,
      monto: 82000,
      politicaVigente: "Monto fijo de colocacion demo",
      aplicaExcepcion: true,
      politicaAnterior: "Politica demo anterior",
      datosConfirmados: true,
      comentarios: "Cierre demo con excepcion autorizada por direccion."
    },
    condicionesRenta: {
      anos: 2,
      formaPago: "Mensual",
      rentaAdelantada: false,
      rentaDeposito: true,
      aplicaFianza: false,
      afianzadora: "",
      montoFianza: 0,
      fiadorSolidario: true,
      fiadorBienRaiz: false,
      contratoTransaccion: true,
      vigencia: "24 meses",
      contratoIntermediacion: false,
      seguroDanios: true,
      seguroResponsabilidadCivil: true,
      investigacion: false,
      costoInvestigacion: 0,
      investigador: "",
      herramientaJuridica: "Contrato privado",
      abogado: "Juridico Demo",
      notario: "",
      empresa: "Jardines Premier Demo",
      aplicaMantenimiento: false,
      montoMantenimiento: 0,
      periodoMantenimiento: "",
      observaciones: "Contrato demo firmado y propiedad marcada como cerrada."
    },
    propietarios: [
      {
        id: "owner-rem-2044-1",
        nombre: "Julieta Mora",
        telefono: "33 0000 2244",
        correo: "owner.demo.b@remax-demo.test",
        principal: true
      }
    ],
    asesoresAlta: [
      {
        advisorId: "alejandra-rios",
        nivel: "A",
        comisionTipo: "%",
        participacionPorcentaje: 70,
        monto: 57400,
        tipoIntervencion: "Alta",
        contexto: "Alta"
      },
      {
        advisorId: "sofia-cardenas",
        nivel: "M",
        comisionTipo: "%",
        participacionPorcentaje: 30,
        monto: 24600,
        tipoIntervencion: "Apoyo de alta",
        contexto: "Alta"
      }
    ],
    asesoresBaja: [
      {
        advisorId: "julieta-mora",
        nivel: "A",
        comisionTipo: "%",
        participacionPorcentaje: 60,
        monto: 49200,
        tipoIntervencion: "Cierre",
        contexto: "Baja / cierre"
      },
      {
        advisorId: "mariana-fuentes",
        nivel: "A",
        comisionTipo: "%",
        participacionPorcentaje: 40,
        monto: 32800,
        tipoIntervencion: "Validacion final",
        contexto: "Baja / cierre"
      }
    ],
    asesoresCancelacion: [],
    fichaTecnica: {
      residencial: defaultResidentialSheet,
      comercial: {
        ...defaultCommercialSheet,
        categoria: "Comercial",
        clasificacion: "Local comercial demo"
      }
    },
    historialValores: [
      {
        id: "vh-rem-2044-1",
        propiedadClave: "REM-2044",
        fecha: "2025-11-13",
        valor: 91000,
        moneda: "Pesos",
        posicion: "",
        motivoCambio: "Alta inicial",
        motivoMinuta: "Alta",
        usuario: "Alejandra Rios"
      },
      {
        id: "vh-rem-2044-2",
        propiedadClave: "REM-2044",
        fecha: "2026-01-09",
        valor: 86000,
        moneda: "Pesos",
        posicion: "",
        motivoCambio: "Cambio de precio",
        motivoMinuta: "Cambio de precio",
        usuario: "Alejandra Rios"
      },
      {
        id: "vh-rem-2044-3",
        propiedadClave: "REM-2044",
        fecha: "2026-03-18",
        valor: 82000,
        moneda: "Pesos",
        posicion: "Ultimo",
        motivoCambio: "Ajuste final",
        motivoMinuta: "Cambio de precio",
        usuario: "Julieta Mora"
      }
    ],
    baja: {
      fechaBaja: "2026-03-18",
      tipoCierre: "Cerrada",
      condicionCierre: "Contrato demo firmado a 24 meses",
      personaRegistra: "Comisiones Demo",
      comentarios: "Listo para minuta interna y liberacion de comisiones demo.",
      comunicadoId: "com-baja-rem-2044"
    }
  },
  {
    id: "prop-rem-3308",
    folio: 3308,
    clave: "REM-3308",
    categoria: "Exclusiva",
    categoriaCode: "EX",
    giro: "Residencial",
    giroCode: "R",
    tipo: "Terreno",
    tipoCode: "T",
    operacion: "Venta",
    operacionCode: "V",
    exclusividad: "Exclusiva",
    estatus: "Cancelada",
    altaBaja: "Baja",
    descripcionCorta: "Paseo Puerta del Sol 77, Puerta del Sol",
    address: {
      calle: "Paseo Puerta del Sol",
      noExt: "77",
      noInt: "",
      edificio: "",
      piso: "",
      entreCalles: "Av. Sendero y Calle Horizonte",
      colonia: "Puerta del Sol",
      coto: "",
      fraccionamiento: "",
      municipio: "Guadalajara",
      cp: "44520",
      entidad: "Jalisco",
      coordenadasGuiaRoji: ""
    },
    agenda: {
      condicionesVisitas: "Citas",
      cajaNo: "",
      disponibilidadVisitas: "Disponible",
      estatusLlaves: "",
      telCitas: "33 0000 3308",
      contactoCitas: "Alejandra Rios",
      origen: "Personal",
      origenDetalle: ""
    },
    fechas: {
      alta: "2025-08-07",
      aviso: "2025-08-07",
      contrato: "2025-08-07",
      inicioPromo: "2025-08-11"
    },
    referidos: {
      idRef: "",
      nombre: "",
      empresa: ""
    },
    ids: {
      ampi: "REM3308",
      remax: "RMX-REM3308",
      catastral: "DEMO-PS-3308"
    },
    visitaRecorrido: "Por visitar",
    comoLlegar: {
      ligasA: "Mapa interno",
      remax: "demo.remax.test/rem-3308",
      googleMap: "maps.demo.test/rem-3308",
      googleEarth: "",
      ampi: "",
      fichaArchivo: "REM-3308",
      ftPdf: "REM-3308.pdf",
      comentarios: "Expediente demo de cancelacion con motivo documentado."
    },
    caracteristicas: {
      supTerreno: 340,
      supConstruccion: 0,
      frente: 13,
      fondo: 26,
      frentes: 1,
      recamaras: 0,
      banos: 0,
      medioBanos: 0,
      jardin: false,
      estacionamientosCubiertos: 0,
      estacionamientosDescubiertos: 0,
      nivel: "PB",
      pisosTotales: 0,
      exteriorInterior: "Exterior",
      noUnidades: 0,
      vistaA: "Corredor residencial",
      elevadores: 0,
      edad: 0,
      formaTerreno: "Regular",
      inclinacion: "Plano",
      ubicacion: "Medianero",
      usoSuelo: "Habitacional",
      restricciones: "",
      descripcion: "Terreno urbano demo listo para desarrollo habitacional.",
      categoria: "Residencial",
      notas: "Cancelada para replantear estrategia de venta.",
      servicios: ["Escuelas", "Comercios"],
      superficiesValores: [{ concepto: "Terreno", metros: 340, valor: 14000, total: 4760000 }]
    },
    condicionesOperacion: {
      modoComision: "politica",
      porcentaje: 6,
      monto: 0,
      politicaVigente: "Venta residencial demo 6%",
      aplicaExcepcion: false,
      politicaAnterior: "",
      datosConfirmados: true,
      comentarios: "Sin excepciones de politica."
    },
    propietarios: [
      {
        id: "owner-rem-3308-1",
        nombre: "Alejandra Rios",
        telefono: "33 0000 3301",
        correo: "owner.demo.a@remax-demo.test",
        principal: true
      }
    ],
    asesoresAlta: [
      {
        advisorId: "valeria-mendoza",
        nivel: "M",
        comisionTipo: "%",
        participacionPorcentaje: 100,
        monto: 4760000,
        tipoIntervencion: "Alta",
        contexto: "Alta"
      }
    ],
    asesoresBaja: [],
    asesoresCancelacion: [
      {
        advisorId: "mariana-fuentes",
        nivel: "A",
        comisionTipo: "%",
        participacionPorcentaje: 50,
        monto: 2380000,
        tipoIntervencion: "Cancelacion",
        contexto: "Cancelacion"
      },
      {
        advisorId: "valeria-mendoza",
        nivel: "M",
        comisionTipo: "%",
        participacionPorcentaje: 50,
        monto: 2380000,
        tipoIntervencion: "Seguimiento cancelacion",
        contexto: "Cancelacion"
      }
    ],
    fichaTecnica: {
      residencial: {
        ...defaultResidentialSheet,
        estilo: "Terreno",
        proyecto: "Lote urbano demo",
        acabados: "Sin aplicar",
        conservacion: "No aplica",
        fachada: "No aplica",
        ventanas: "No aplica",
        cristales: "No aplica",
        carpinteria: "No aplica",
        puertas: "No aplica",
        otro: "Documentacion urbana",
        amenidades: ["Jardin"],
        espacios: [{ nombre: "Terreno", nivel: "PB", banos: 0, acabados: "Libre" }]
      },
      comercial: {
        ...defaultCommercialSheet,
        categoria: "Lote",
        clasificacion: "Terreno",
        banios: 0,
        estacionamiento: "No aplica"
      }
    },
    historialValores: [
      {
        id: "vh-rem-3308-1",
        propiedadClave: "REM-3308",
        fecha: "2025-08-07",
        valor: 4830000,
        moneda: "Pesos",
        posicion: "",
        motivoCambio: "Alta inicial",
        motivoMinuta: "Alta",
        usuario: "Asesor Demo Norte"
      },
      {
        id: "vh-rem-3308-2",
        propiedadClave: "REM-3308",
        fecha: "2026-02-14",
        valor: 4760000,
        moneda: "Pesos",
        posicion: "Ultimo",
        motivoCambio: "Ajuste por mercado",
        motivoMinuta: "Cambio de precio",
        usuario: "Mariana Fuentes"
      }
    ],
    cancelacion: {
      fechaAvisoRecepcion: "2026-03-24",
      fechaCancelacion: "2026-04-08",
      motivo: "El propietario decide pausar la venta para replantear estrategia familiar.",
      aplicaComision: true,
      personaRegistra: "Operaciones Demo",
      bajaPor: "Cancelacion",
      comentarios: "Caso demo documentado con comision aplicable por gestion comercial.",
      comunicadoId: "com-cancel-rem-3308"
    }
  },
  {
    id: "prop-rem-4417",
    folio: 4417,
    clave: "REM-4417",
    categoria: "Exclusiva",
    categoriaCode: "EX",
    giro: "Residencial",
    giroCode: "R",
    tipo: "Casa",
    tipoCode: "C",
    operacion: "Venta",
    operacionCode: "V",
    exclusividad: "Exclusiva",
    estatus: "Cancelada",
    altaBaja: "Baja",
    descripcionCorta: "Paseo Residencial Altaria 4417, Residencial Altaria",
    address: {
      calle: "Paseo Residencial Altaria",
      noExt: "4417",
      noInt: "",
      edificio: "",
      piso: "",
      entreCalles: "Av. Encino y Sendero Verde",
      colonia: "Residencial Altaria",
      coto: "",
      fraccionamiento: "",
      municipio: "Monterrey",
      cp: "64989",
      entidad: "Nuevo Leon",
      coordenadasGuiaRoji: ""
    },
    agenda: {
      condicionesVisitas: "Citas",
      cajaNo: "",
      disponibilidadVisitas: "Disponible",
      estatusLlaves: "",
      telCitas: "81 0000 4417",
      contactoCitas: "Andrea Lozano",
      origen: "Referido",
      origenDetalle: "Campana residencial demo"
    },
    fechas: {
      alta: "2025-09-02",
      aviso: "2025-09-02",
      contrato: "2025-09-02",
      inicioPromo: "2025-09-04"
    },
    referidos: {
      idRef: "REM-REF-44",
      nombre: "Carlos Herrera",
      empresa: "Residencial Altaria Demo"
    },
    ids: {
      ampi: "REM4417",
      remax: "RMX-REM4417",
      catastral: "DEMO-ALT-4417"
    },
    visitaRecorrido: "Visitada",
    comoLlegar: {
      ligasA: "Google Map demo",
      remax: "demo.remax.test/rem-4417",
      googleMap: "maps.demo.test/rem-4417",
      googleEarth: "",
      ampi: "",
      fichaArchivo: "REM-4417",
      ftPdf: "REM-4417.pdf",
      comentarios: "Comunicado demo enviado a todo el equipo."
    },
    caracteristicas: {
      supTerreno: 260,
      supConstruccion: 340,
      frente: 13,
      fondo: 20,
      frentes: 1,
      recamaras: 4,
      banos: 3,
      medioBanos: 1,
      jardin: true,
      estacionamientosCubiertos: 2,
      estacionamientosDescubiertos: 0,
      nivel: "PB-PA",
      pisosTotales: 2,
      exteriorInterior: "Exterior",
      noUnidades: 1,
      vistaA: "Parque interior",
      elevadores: 0,
      edad: 6,
      formaTerreno: "Regular",
      inclinacion: "Plano",
      ubicacion: "Medianero",
      usoSuelo: "Habitacional",
      restricciones: "",
      descripcion: "Casa familiar demo en entorno residencial premium.",
      categoria: "Residencial",
      notas: "Cancelada para relanzar mas adelante con nueva estrategia.",
      servicios: ["Parques", "Escuelas", "Comercios"],
      superficiesValores: [
        { concepto: "Terreno", metros: 260, valor: 13000, total: 3380000 },
        { concepto: "Construccion", metros: 340, valor: 8060, total: 2740400 }
      ]
    },
    condicionesOperacion: {
      modoComision: "politica",
      porcentaje: 6,
      monto: 0,
      politicaVigente: "Venta residencial demo 6%",
      aplicaExcepcion: false,
      politicaAnterior: "",
      datosConfirmados: true,
      comentarios: "Operacion demo sin excepciones."
    },
    propietarios: [
      {
        id: "owner-rem-4417-1",
        nombre: "Andrea Lozano",
        telefono: "81 0000 4411",
        correo: "owner.demo.c@remax-demo.test",
        principal: true
      }
    ],
    asesoresAlta: [
      {
        advisorId: "andrea-lozano",
        nivel: "A",
        comisionTipo: "%",
        participacionPorcentaje: 80,
        monto: 4896000,
        tipoIntervencion: "Alta",
        contexto: "Alta"
      },
      {
        advisorId: "ricardo-salinas",
        nivel: "M",
        comisionTipo: "%",
        participacionPorcentaje: 20,
        monto: 1224000,
        tipoIntervencion: "Prospeccion",
        contexto: "Alta"
      }
    ],
    asesoresBaja: [],
    asesoresCancelacion: [
      {
        advisorId: "andrea-lozano",
        nivel: "A",
        comisionTipo: "%",
        participacionPorcentaje: 50,
        monto: 3060000,
        tipoIntervencion: "Cancelacion",
        contexto: "Cancelacion"
      },
      {
        advisorId: "mariana-fuentes",
        nivel: "A",
        comisionTipo: "%",
        participacionPorcentaje: 50,
        monto: 3060000,
        tipoIntervencion: "Validacion direccion",
        contexto: "Cancelacion"
      }
    ],
    fichaTecnica: {
      residencial: defaultResidentialSheet,
      comercial: {
        ...defaultCommercialSheet,
        categoria: "Residencial",
        clasificacion: "Casa",
        banios: 4,
        estacionamiento: "2 cajones"
      }
    },
    historialValores: [
      {
        id: "vh-rem-4417-1",
        propiedadClave: "REM-4417",
        fecha: "2025-09-02",
        valor: 6280000,
        moneda: "Pesos",
        posicion: "",
        motivoCambio: "Alta inicial",
        motivoMinuta: "Alta",
        usuario: "Andrea Lozano"
      },
      {
        id: "vh-rem-4417-2",
        propiedadClave: "REM-4417",
        fecha: "2026-01-12",
        valor: 6120000,
        moneda: "Pesos",
        posicion: "Ultimo",
        motivoCambio: "Ajuste comercial",
        motivoMinuta: "Cambio de precio",
        usuario: "Mariana Fuentes"
      }
    ],
    cancelacion: {
      fechaAvisoRecepcion: "2026-03-24",
      fechaCancelacion: "2026-03-24",
      motivo: "Cliente retira la propiedad para replantear tiempos de salida.",
      aplicaComision: false,
      personaRegistra: "Operaciones Demo",
      bajaPor: "Cancelacion",
      comentarios: "Comunicado demo ya enviado al equipo completo.",
      comunicadoId: "com-cancel-rem-4417"
    }
  },
  {
    id: "prop-rem-5521",
    folio: 5521,
    clave: "REM-5521",
    categoria: "Exclusiva",
    categoriaCode: "EX",
    giro: "Residencial",
    giroCode: "R",
    tipo: "Casa",
    tipoCode: "C",
    operacion: "Venta",
    operacionCode: "V",
    exclusividad: "Exclusiva",
    estatus: "Activa",
    altaBaja: "Alta",
    descripcionCorta: "Calle Vista Encino 52, Casa 1, Bosque Verde",
    address: {
      calle: "Calle Vista Encino",
      noExt: "52",
      noInt: "Casa 1",
      edificio: "",
      piso: "",
      entreCalles: "Paseo del Roble y Av. Jardines",
      colonia: "Vista Encino",
      coto: "Coto 5",
      fraccionamiento: "Bosque Verde",
      municipio: "Monterrey",
      cp: "64984",
      entidad: "Nuevo Leon",
      coordenadasGuiaRoji: "VE-55"
    },
    agenda: {
      condicionesVisitas: "Citas",
      cajaNo: "9",
      disponibilidadVisitas: "Disponible",
      estatusLlaves: "En recepcion",
      telCitas: "81 0000 5521",
      contactoCitas: "Recepcion Demo",
      origen: "Referido",
      origenDetalle: "Cliente demo"
    },
    fechas: {
      alta: "2026-02-12",
      aviso: "2026-02-12",
      contrato: "2026-02-12",
      inicioPromo: "2026-02-16"
    },
    referidos: {
      idRef: "REM-REF-55",
      nombre: "Luis Navarro",
      empresa: "REMAX Demo"
    },
    ids: {
      ampi: "REM5521",
      remax: "RMX-REM5521",
      catastral: "DEMO-VE-5521"
    },
    visitaRecorrido: "Programada",
    comoLlegar: {
      ligasA: "REMAX Demo y Google Map",
      remax: "demo.remax.test/rem-5521",
      googleMap: "maps.demo.test/rem-5521",
      googleEarth: "",
      ampi: "",
      fichaArchivo: "REM-5521",
      ftPdf: "REM-5521.pdf",
      comentarios: "Ficha residencial premium demo con dos propietarios."
    },
    caracteristicas: {
      supTerreno: 290,
      supConstruccion: 365,
      frente: 14,
      fondo: 21,
      frentes: 1,
      recamaras: 4,
      banos: 4,
      medioBanos: 1,
      jardin: true,
      estacionamientosCubiertos: 2,
      estacionamientosDescubiertos: 1,
      nivel: "PB-PA",
      pisosTotales: 2,
      exteriorInterior: "Exterior",
      noUnidades: 1,
      vistaA: "Parque interior",
      elevadores: 0,
      edad: 4,
      formaTerreno: "Regular",
      inclinacion: "Plano",
      ubicacion: "Esquina",
      usoSuelo: "Habitacional",
      restricciones: "Reglamento condominio",
      descripcion: "Residencia demo de alto valor con jardin y acabados premium.",
      categoria: "Residencial",
      notas: "Ficha tecnica rica para demo de propietarios y visitas.",
      servicios: ["Parques", "Escuelas", "Bancos", "Comercios"],
      superficiesValores: [
        { concepto: "Terreno", metros: 290, valor: 15500, total: 4495000 },
        { concepto: "Construccion", metros: 365, valor: 10548, total: 3850020 }
      ]
    },
    condicionesOperacion: {
      modoComision: "politica",
      porcentaje: 6,
      monto: 0,
      politicaVigente: "Venta residencial premium demo 6%",
      aplicaExcepcion: false,
      politicaAnterior: "",
      datosConfirmados: true,
      comentarios: "Checklist demo completo y datos confirmados."
    },
    propietarios: [
      {
        id: "owner-rem-5521-1",
        nombre: "Mariana Fuentes",
        telefono: "81 0000 5522",
        correo: "owner.demo.d@remax-demo.test",
        principal: true
      },
      {
        id: "owner-rem-5521-2",
        nombre: "Ricardo Salinas",
        telefono: "81 0000 5523",
        correo: "owner.demo.e@remax-demo.test",
        principal: false
      }
    ],
    asesoresAlta: [
      {
        advisorId: "alejandra-rios",
        nivel: "A",
        comisionTipo: "%",
        participacionPorcentaje: 70,
        monto: 5845000,
        tipoIntervencion: "Captacion",
        contexto: "Alta"
      },
      {
        advisorId: "luis-navarro",
        nivel: "M",
        comisionTipo: "%",
        participacionPorcentaje: 30,
        monto: 2505000,
        tipoIntervencion: "Prospeccion",
        contexto: "Alta"
      }
    ],
    asesoresBaja: [],
    asesoresCancelacion: [],
    fichaTecnica: {
      residencial: {
        ...defaultResidentialSheet,
        espacios: [
          { nombre: "Sala", nivel: "PB", banos: 0, acabados: "Cantera y madera" },
          { nombre: "Comedor", nivel: "PB", banos: 0, acabados: "Piso porcelanato" },
          { nombre: "Estudio", nivel: "PB", banos: 0, acabados: "Muebles empotrados" },
          { nombre: "Rec principal", nivel: "PA", banos: 1, acabados: "Vestidor y terraza" },
          { nombre: "Rec 2", nivel: "PA", banos: 1, acabados: "Closet" }
        ]
      },
      comercial: {
        ...defaultCommercialSheet,
        categoria: "Residencial",
        clasificacion: "Casa premium",
        banios: 4,
        estacionamiento: "2 cubiertos + 1 descubierto"
      }
    },
    historialValores: [
      {
        id: "vh-rem-5521-1",
        propiedadClave: "REM-5521",
        fecha: "2026-02-12",
        valor: 8530000,
        moneda: "Pesos",
        posicion: "",
        motivoCambio: "Alta inicial",
        motivoMinuta: "Alta",
        usuario: "Alejandra Rios"
      },
      {
        id: "vh-rem-5521-2",
        propiedadClave: "REM-5521",
        fecha: "2026-03-07",
        valor: 8350000,
        moneda: "Pesos",
        posicion: "Ultimo",
        motivoCambio: "Ajuste por open house demo",
        motivoMinuta: "Cambio de precio",
        usuario: "Mariana Fuentes"
      }
    ]
  },
  {
    id: "prop-rem-6684",
    folio: 6684,
    clave: "REM-6684",
    categoria: "Opcion",
    categoriaCode: "OP",
    giro: "Comercial",
    giroCode: "C",
    tipo: "Oficina",
    tipoCode: "O",
    operacion: "Renta",
    operacionCode: "R",
    exclusividad: "Opcion",
    estatus: "Cerrada",
    altaBaja: "Baja",
    descripcionCorta: "Avenida Torre Central 402, Suite 8, Arboledas Oficinas",
    address: {
      calle: "Avenida Torre Central",
      noExt: "402",
      noInt: "Suite 8",
      edificio: "Torre Central",
      piso: "4",
      entreCalles: "Av. Empresarial y Circuito Ejecutivo",
      colonia: "Arboledas Oficinas",
      coto: "",
      fraccionamiento: "",
      municipio: "San Pedro Garza Garcia",
      cp: "66260",
      entidad: "Nuevo Leon",
      coordenadasGuiaRoji: ""
    },
    agenda: {
      condicionesVisitas: "Citas",
      cajaNo: "",
      disponibilidadVisitas: "Disponible",
      estatusLlaves: "Recepcion",
      telCitas: "81 0000 6684",
      contactoCitas: "Recepcion Demo",
      origen: "Personal",
      origenDetalle: ""
    },
    fechas: {
      alta: "2025-12-02",
      aviso: "2025-12-02",
      contrato: "2025-12-03",
      inicioPromo: "2025-12-05"
    },
    referidos: {
      idRef: "",
      nombre: "",
      empresa: ""
    },
    ids: {
      ampi: "",
      remax: "RMX-REM6684",
      catastral: ""
    },
    visitaRecorrido: "Visitada",
    comoLlegar: {
      ligasA: "REMAX Demo",
      remax: "demo.remax.test/rem-6684",
      googleMap: "",
      googleEarth: "",
      ampi: "",
      fichaArchivo: "REM-6684",
      ftPdf: "REM-6684.pdf",
      comentarios: "Caso demo para mostrar asesor con rol en alta y cierre."
    },
    caracteristicas: {
      supTerreno: 180,
      supConstruccion: 180,
      frente: 10,
      fondo: 18,
      frentes: 1,
      recamaras: 0,
      banos: 2,
      medioBanos: 0,
      jardin: false,
      estacionamientosCubiertos: 4,
      estacionamientosDescubiertos: 0,
      nivel: "4",
      pisosTotales: 1,
      exteriorInterior: "Interior",
      noUnidades: 1,
      vistaA: "Zona corporativa",
      elevadores: 2,
      edad: 5,
      formaTerreno: "Regular",
      inclinacion: "Plano",
      ubicacion: "Torre",
      usoSuelo: "Oficina",
      restricciones: "",
      descripcion: "Oficina demo cerrada por contrato ejecutivo.",
      categoria: "Comercial",
      notas: "Mariana Fuentes participa tanto en alta como en cierre.",
      servicios: ["Bancos", "Comercios", "Transportes"],
      superficiesValores: [{ concepto: "Oficina", metros: 180, valor: 655.55, total: 117999 }]
    },
    condicionesOperacion: {
      modoComision: "monto",
      porcentaje: 0,
      monto: 118000,
      politicaVigente: "Monto de colocacion demo",
      aplicaExcepcion: false,
      politicaAnterior: "",
      datosConfirmados: true,
      comentarios: "Monto fijo demo por renta anual."
    },
    condicionesRenta: {
      anos: 2,
      formaPago: "Mensual",
      rentaAdelantada: false,
      rentaDeposito: true,
      aplicaFianza: false,
      afianzadora: "",
      montoFianza: 0,
      fiadorSolidario: true,
      fiadorBienRaiz: false,
      contratoTransaccion: true,
      vigencia: "24 meses",
      contratoIntermediacion: true,
      seguroDanios: false,
      seguroResponsabilidadCivil: true,
      investigacion: false,
      costoInvestigacion: 0,
      investigador: "",
      herramientaJuridica: "Convenio",
      abogado: "Juridico Demo",
      notario: "",
      empresa: "Torre Central 402 Demo",
      aplicaMantenimiento: true,
      montoMantenimiento: 9500,
      periodoMantenimiento: "Mensual",
      observaciones: "Contrato demo cerrado en Q1."
    },
    propietarios: [
      {
        id: "owner-rem-6684-1",
        nombre: "Torre Central 402 Demo",
        telefono: "81 0000 6680",
        correo: "owner.demo.f@remax-demo.test",
        principal: true
      }
    ],
    asesoresAlta: [
      {
        advisorId: "carlos-herrera",
        nivel: "A",
        comisionTipo: "%",
        participacionPorcentaje: 70,
        monto: 82600,
        tipoIntervencion: "Alta",
        contexto: "Alta"
      },
      {
        advisorId: "mariana-fuentes",
        nivel: "A",
        comisionTipo: "%",
        participacionPorcentaje: 30,
        monto: 35400,
        tipoIntervencion: "Direccion comercial",
        contexto: "Alta"
      }
    ],
    asesoresBaja: [
      {
        advisorId: "mariana-fuentes",
        nivel: "A",
        comisionTipo: "%",
        participacionPorcentaje: 100,
        monto: 118000,
        tipoIntervencion: "Cierre",
        contexto: "Baja / cierre"
      }
    ],
    asesoresCancelacion: [],
    fichaTecnica: {
      residencial: defaultResidentialSheet,
      comercial: {
        ...defaultCommercialSheet,
        categoria: "Comercial",
        clasificacion: "Oficina",
        estacionamiento: "4 cajones cubiertos"
      }
    },
    historialValores: [
      {
        id: "vh-rem-6684-1",
        propiedadClave: "REM-6684",
        fecha: "2025-12-02",
        valor: 124000,
        moneda: "Pesos",
        posicion: "",
        motivoCambio: "Alta inicial",
        motivoMinuta: "Alta",
        usuario: "Carlos Herrera"
      },
      {
        id: "vh-rem-6684-2",
        propiedadClave: "REM-6684",
        fecha: "2026-02-14",
        valor: 118000,
        moneda: "Pesos",
        posicion: "Ultimo",
        motivoCambio: "Paquete de cierre demo",
        motivoMinuta: "Cambio de precio",
        usuario: "Mariana Fuentes"
      }
    ],
    baja: {
      fechaBaja: "2026-02-28",
      tipoCierre: "Cerrada",
      condicionCierre: "Contrato ejecutivo demo con mantenimiento incluido",
      personaRegistra: "Operaciones Demo",
      comentarios: "Ejemplo claro del nuevo modelo multirol aplicado al cierre.",
      comunicadoId: "com-baja-rem-6684"
    }
  }
];
