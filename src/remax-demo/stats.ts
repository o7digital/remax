import {
  remaxDemoAdvisors,
  remaxDemoCommunications,
  remaxDemoPipelineItems,
  remaxDemoProperties,
  remaxDemoSentimentInsights,
  remaxPipelineStages
} from "@/remax-demo/data";
import type {
  RemaxAdvisor,
  RemaxAdvisorAssignment,
  RemaxCommunication,
  RemaxCommunicationType,
  RemaxPipelineItem,
  RemaxPipelineStage,
  RemaxPriorityLevel,
  RemaxProperty,
  RemaxPropertyStatus,
  RemaxSentimentInsight,
  RemaxSentimentLabel,
  RemaxValueHistory
} from "@/remax-demo/types";

const advisorMap = new Map(remaxDemoAdvisors.map((advisor) => [advisor.id, advisor]));
const propertyMap = new Map(remaxDemoProperties.map((property) => [property.clave, property]));
const communicationMap = new Map(
  remaxDemoCommunications.map((communication) => [communication.id, communication])
);

export function getAdvisorById(id: string): RemaxAdvisor | undefined {
  return advisorMap.get(id);
}

export function getPropertyByClave(clave: string): RemaxProperty | undefined {
  return propertyMap.get(clave);
}

export function getCommunicationById(id: string): RemaxCommunication | undefined {
  return communicationMap.get(id);
}

export function getCurrentValue(property: RemaxProperty): number {
  return property.historialValores[property.historialValores.length - 1]?.valor ?? 0;
}

export function getPropertiesByStatus(status: RemaxPropertyStatus): RemaxProperty[] {
  return remaxDemoProperties.filter((property) => property.estatus === status);
}

export function getAllValueHistory(): RemaxValueHistory[] {
  return remaxDemoProperties
    .flatMap((property) => property.historialValores)
    .sort((left, right) => right.fecha.localeCompare(left.fecha));
}

export function getPropertyValueHistory(clave: string): RemaxValueHistory[] {
  return getPropertyByClave(clave)?.historialValores ?? [];
}

export function getPropertyCommunications(clave: string): RemaxCommunication[] {
  return remaxDemoCommunications
    .filter((communication) => communication.propiedadClave === clave)
    .sort((left, right) => right.fecha.localeCompare(left.fecha));
}

export function getMenuStats() {
  const active = getPropertiesByStatus("Activa").length;
  const closed = getPropertiesByStatus("Cerrada").length;
  const cancelled = getPropertiesByStatus("Cancelada").length;

  return {
    active,
    closed,
    cancelled,
    communications: remaxDemoCommunications.length,
    advisorsA: remaxDemoAdvisors.filter((advisor) => advisor.clase === "A").length,
    advisorsM: remaxDemoAdvisors.filter((advisor) => advisor.clase === "M").length
  };
}

export function getPortfolioSummary() {
  return {
    alta: remaxDemoProperties.filter((property) => property.estatus === "Activa").length,
    baja: remaxDemoProperties.filter((property) => property.baja).length,
    cancelacion: remaxDemoProperties.filter((property) => property.cancelacion).length
  };
}

export function getAdvisorsByIds(ids: string[]): RemaxAdvisor[] {
  return ids
    .map((id) => advisorMap.get(id))
    .filter((advisor): advisor is RemaxAdvisor => Boolean(advisor));
}

function getPropertyAssignments(
  property: RemaxProperty
): Array<RemaxAdvisorAssignment & { advisor: RemaxAdvisor }> {
  return [...property.asesoresAlta, ...property.asesoresBaja, ...property.asesoresCancelacion]
    .map((assignment) => ({
      ...assignment,
      advisor: advisorMap.get(assignment.advisorId)
    }))
    .filter(
      (assignment): assignment is RemaxAdvisorAssignment & { advisor: RemaxAdvisor } =>
        Boolean(assignment.advisor)
    );
}

export function getPropertyRoleMatrix(property: RemaxProperty) {
  const roleMap = new Map<string, { advisor: RemaxAdvisor; roles: string[] }>();

  for (const assignment of getPropertyAssignments(property)) {
    const existing = roleMap.get(assignment.advisor.id);

    if (existing) {
      existing.roles.push(assignment.contexto);
      continue;
    }

    roleMap.set(assignment.advisor.id, {
      advisor: assignment.advisor,
      roles: [assignment.contexto]
    });
  }

  return [...roleMap.values()].map((item) => ({
    advisor: item.advisor,
    roles: [...new Set(item.roles)]
  }));
}

export function getPropertiesWithMultipleRoles() {
  return remaxDemoProperties.filter((property) =>
    getPropertyRoleMatrix(property).some((item) => item.roles.length > 1)
  );
}

export function getAdviserSummaryRows() {
  return remaxDemoAdvisors
    .map((advisor) => {
      const alta = remaxDemoProperties.filter((property) =>
        property.asesoresAlta.some((assignment) => assignment.advisorId === advisor.id)
      );
      const baja = remaxDemoProperties.filter((property) =>
        property.asesoresBaja.some((assignment) => assignment.advisorId === advisor.id)
      );
      const cancelacion = remaxDemoProperties.filter((property) =>
        property.asesoresCancelacion.some((assignment) => assignment.advisorId === advisor.id)
      );

      return {
        advisor,
        alta,
        baja,
        cancelacion,
        total: new Set([...alta, ...baja, ...cancelacion].map((property) => property.clave)).size
      };
    })
    .filter((row) => row.total > 0 || row.advisor.tipoPersonal !== "asesor");
}

export function getOwnerRows() {
  return remaxDemoProperties.flatMap((property) =>
    property.propietarios.map((owner, index) => ({
      owner,
      property,
      no: index + 1
    }))
  );
}

export function getCommunicationsByType(type: RemaxCommunicationType) {
  return remaxDemoCommunications.filter((communication) => communication.tipo === type);
}

export function getSearchableProperties() {
  return remaxDemoProperties.map((property) => ({
    clave: property.clave,
    colonia: property.address.colonia,
    domicilio: `${property.address.calle} ${property.address.noExt}`,
    coto: property.address.coto ?? "",
    fraccionamiento: property.address.fraccionamiento ?? "",
    asesor:
      getAdvisorById(property.asesoresAlta[0]?.advisorId ?? "")?.nombre ??
      getAdvisorById(property.asesoresCancelacion[0]?.advisorId ?? "")?.nombre ??
      "",
    precio: getCurrentValue(property),
    estatus: property.estatus
  }));
}

export function getSentimentInsights(): RemaxSentimentInsight[] {
  return [...remaxDemoSentimentInsights].sort((left, right) => right.createdAt.localeCompare(left.createdAt));
}

export function getSentimentSummary() {
  const insights = getSentimentInsights();

  return {
    total: insights.length,
    positive: insights.filter((item) => item.sentiment === "positivo").length,
    neutral: insights.filter((item) => item.sentiment === "neutro").length,
    risk: insights.filter((item) => item.sentiment === "sensible / en riesgo").length,
    highPriority: insights.filter((item) => item.priority === "alta").length
  };
}

export function getSentimentCountsByPriority() {
  return {
    alta: remaxDemoSentimentInsights.filter((item) => item.priority === "alta").length,
    media: remaxDemoSentimentInsights.filter((item) => item.priority === "media").length,
    baja: remaxDemoSentimentInsights.filter((item) => item.priority === "baja").length
  };
}

export function getSentimentActionQueue() {
  const priorityRank: Record<RemaxPriorityLevel, number> = { alta: 0, media: 1, baja: 2 };
  const sentimentRank: Record<RemaxSentimentLabel, number> = {
    "sensible / en riesgo": 0,
    positivo: 1,
    neutro: 2
  };

  return getSentimentInsights().sort((left, right) => {
    const priorityDelta = priorityRank[left.priority] - priorityRank[right.priority];
    if (priorityDelta !== 0) {
      return priorityDelta;
    }

    return sentimentRank[left.sentiment] - sentimentRank[right.sentiment];
  });
}

export function getPipelineItems(): RemaxPipelineItem[] {
  return [...remaxDemoPipelineItems].sort((left, right) => right.updatedAt.localeCompare(left.updatedAt));
}

export function getPipelineStages(): readonly RemaxPipelineStage[] {
  return remaxPipelineStages;
}

export function getPipelineColumns() {
  return remaxPipelineStages.map((stage) => ({
    stage,
    items: remaxDemoPipelineItems.filter((item) => item.stage === stage)
  }));
}

export function getPipelineSummary() {
  const items = remaxDemoPipelineItems;

  return {
    total: items.length,
    active: items.filter((item) => item.stage !== "Cancelado").length,
    highPriority: items.filter((item) => item.priority === "alta").length,
    risk: items.filter((item) => item.sentiment === "sensible / en riesgo").length
  };
}
