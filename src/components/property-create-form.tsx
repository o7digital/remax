"use client";

import { useMemo, useState } from "react";

import type {
  PropertyFormAdvisorOption,
  PropertyFormAuxiliaryOption,
  PropertyFormLocationOption
} from "@/lib/remax-app-data";

const STATUS_OPTIONS = [
  { value: "draft", label: "Borrador" },
  { value: "active", label: "Activa" },
  { value: "under_offer", label: "En oferta" },
  { value: "closed", label: "Cerrada" },
  { value: "cancelled", label: "Cancelada" },
  { value: "inactive", label: "Inactiva" },
  { value: "archived", label: "Archivada" }
];

const CATEGORY_OPTIONS = [
  { value: "exclusive", label: "Exclusiva" },
  { value: "option", label: "Opcion" },
  { value: "coop", label: "Cooperacion" },
  { value: "other", label: "Otra" }
];

const BUSINESS_LINE_OPTIONS = [
  { value: "residential", label: "Residencial" },
  { value: "commercial", label: "Comercial" },
  { value: "industrial", label: "Industrial" },
  { value: "land", label: "Terreno" },
  { value: "other", label: "Otro" }
];

const OPERATION_OPTIONS = [
  { value: "sale", label: "Venta" },
  { value: "rent", label: "Renta" },
  { value: "transfer", label: "Traspaso" },
  { value: "other", label: "Otra" }
];

const DOCUMENT_OPTIONS = [
  "Contrato firmado",
  "Identificacion propietario",
  "Escritura / titulo",
  "Predial",
  "Recibo agua",
  "Plano / croquis",
  "Fotografias",
  "Llaves"
];

export function PropertyCreateForm({
  action,
  locations,
  advisors,
  auxiliaries
}: {
  action: (formData: FormData) => void | Promise<void>;
  locations: PropertyFormLocationOption[];
  advisors: PropertyFormAdvisorOption[];
  auxiliaries: PropertyFormAuxiliaryOption[];
}) {
  const [selectedState, setSelectedState] = useState(locations[0]?.state ?? "");
  const [selectedAdvisorId, setSelectedAdvisorId] = useState("");
  const selectedAdvisor = advisors.find((advisor) => advisor.id === selectedAdvisorId);
  const municipalities = useMemo(
    () => locations.find((location) => location.state === selectedState)?.municipalities ?? [],
    [locations, selectedState]
  );

  return (
    <form id="nueva-propiedad" action={action} className="form-grid">
      <div className="field field-full">
        <strong>1. Asignacion de clave</strong>
        <span className="muted">Categoria, giro, tipo y operacion son obligatorios en el alta original.</span>
      </div>
      <label className="field">
        <span className="field-label">Clave propiedad</span>
        <input name="propertyKey" placeholder="RTV-2001" required />
      </label>
      <label className="field">
        <span className="field-label">Categoria</span>
        <select name="listingCategory" defaultValue="option" required>
          {CATEGORY_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
      <label className="field">
        <span className="field-label">Giro</span>
        <select name="businessLine" defaultValue="residential">
          {BUSINESS_LINE_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
      <label className="field">
        <span className="field-label">Operacion</span>
        <select name="operationType" defaultValue="sale">
          {OPERATION_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>

      <div className="field field-full">
        <strong>2. Expediente fisico</strong>
        <span className="muted">Documentos recibidos, fecha de entrega, estatus y usuario que registra el alta.</span>
      </div>
      <label className="field">
        <span className="field-label">Fecha expediente</span>
        <input name="expedienteReceivedOn" type="date" />
      </label>
      <label className="field">
        <span className="field-label">Estatus expediente</span>
        <select name="expedienteStatus" defaultValue="Activo">
          <option value="Activo">Activo</option>
          <option value="Destruido">Destruido</option>
          <option value="Muerto">Muerto</option>
        </select>
      </label>
      <label className="field">
        <span className="field-label">Registra alta</span>
        <select name="registeredBy" defaultValue="">
          <option value="">Seleccionar auxiliar</option>
          {auxiliaries.map((auxiliary) => (
            <option key={auxiliary.id} value={auxiliary.displayName}>
              {auxiliary.displayName} · {auxiliary.roleLabel}
            </option>
          ))}
        </select>
      </label>
      <div className="field field-full">
        <span className="field-label">Documentos incluidos</span>
        <div className="button-row">
          {DOCUMENT_OPTIONS.map((documentName) => (
            <label key={documentName} className="badge badge-neutral">
              <input name="documents" type="checkbox" value={documentName} style={{ minHeight: "auto", width: "auto" }} />
              {documentName}
            </label>
          ))}
        </div>
      </div>

      <div className="field field-full">
        <strong>3. Registro y caracteristicas</strong>
        <span className="muted">Origen, fechas comerciales, estatus activo y datos principales del inmueble.</span>
      </div>
      <label className="field">
        <span className="field-label">Titulo</span>
        <input name="title" placeholder="Casa en Zapopan" required />
      </label>
      <label className="field">
        <span className="field-label">Origen</span>
        <input name="sourcePrimary" placeholder="Referido, portal, asesor, oficina" />
      </label>
      <label className="field">
        <span className="field-label">Fecha contrato</span>
        <input name="contractSignedOn" type="date" />
      </label>
      <label className="field">
        <span className="field-label">Alta portales</span>
        <input name="promotionStartedOn" type="date" />
      </label>
      <label className="field">
        <span className="field-label">Fecha listado</span>
        <input name="listedOn" type="date" />
      </label>
      <label className="field">
        <span className="field-label">Estado propiedad</span>
        <select name="propertyStatus" defaultValue="active">
          {STATUS_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
      <label className="field">
        <span className="field-label">Estado</span>
        <select name="state" value={selectedState} onChange={(event) => setSelectedState(event.target.value)}>
          {locations.map((location) => (
            <option key={location.state} value={location.state}>
              {location.state}
            </option>
          ))}
        </select>
      </label>
      <label className="field">
        <span className="field-label">Municipio</span>
        <select name="municipality" defaultValue="">
          <option value="">Seleccionar municipio</option>
          {municipalities.map((municipality) => (
            <option key={municipality} value={municipality}>
              {municipality}
            </option>
          ))}
        </select>
      </label>
      <label className="field">
        <span className="field-label">Terreno m2</span>
        <input name="lotAreaM2" type="number" min="0" step="0.01" />
      </label>
      <label className="field">
        <span className="field-label">Construccion m2</span>
        <input name="constructionAreaM2" type="number" min="0" step="0.01" />
      </label>
      <label className="field field-full">
        <span className="field-label">Direccion</span>
        <input name="fullAddress" placeholder="Calle, colonia, ciudad" />
      </label>

      <div className="field field-full">
        <strong>4. Condiciones de operacion</strong>
        <span className="muted">Comision, politica vigente o antigua, monto minimo y condiciones de renta si aplica.</span>
      </div>
      <label className="field">
        <span className="field-label">% comision operacion</span>
        <input name="commissionPercent" type="number" min="0" max="100" step="0.01" placeholder="6" />
      </label>
      <label className="field">
        <span className="field-label">Politica</span>
        <select name="policyType" defaultValue="actual">
          <option value="actual">Politica actual</option>
          <option value="antigua">Politica antigua</option>
          <option value="excepcion">Excepcion / monto minimo</option>
        </select>
      </label>
      <label className="field">
        <span className="field-label">Depositos renta</span>
        <input name="rentDeposits" type="number" min="0" step="1" />
      </label>
      <label className="field">
        <span className="field-label">Rentas adelantadas</span>
        <input name="rentAdvanceMonths" type="number" min="0" step="1" />
      </label>
      <label className="field field-full">
        <span className="field-label">Nota monto minimo / politica</span>
        <input name="minimumAmountNote" placeholder="Aclaracion operativa" />
      </label>

      <div className="field field-full">
        <strong>5. Valor de propiedad</strong>
        <span className="muted">Precio inicial con fecha y moneda. Queda historizado en property_values.</span>
      </div>
      <label className="field">
        <span className="field-label">Precio lista</span>
        <input name="listPrice" type="number" min="0" step="0.01" placeholder="3500000" />
      </label>
      <label className="field">
        <span className="field-label">Fecha precio</span>
        <input name="priceDate" type="date" />
      </label>
      <label className="field">
        <span className="field-label">Moneda</span>
        <select name="currencyCode" defaultValue="MXN">
          <option value="MXN">MXN</option>
          <option value="USD">USD</option>
        </select>
      </label>

      <div className="field field-full">
        <strong>6. Asesor de alta</strong>
        <span className="muted">Selecciona un asesor activo; el nivel y porcentaje sugerido se completan automaticamente.</span>
      </div>
      <label className="field">
        <span className="field-label">Asesor</span>
        <select name="advisorName" value={selectedAdvisor?.displayName ?? ""} onChange={(event) => setSelectedAdvisorId(event.target.selectedOptions[0]?.dataset.advisorId ?? "")}>
          <option value="">Seleccionar asesor</option>
          {advisors.map((advisor) => (
            <option key={advisor.id} value={advisor.displayName} data-advisor-id={advisor.id}>
              {advisor.displayName}
            </option>
          ))}
        </select>
      </label>
      <label className="field">
        <span className="field-label">Nivel asesor</span>
        <input name="advisorLevel" value={selectedAdvisor?.advisorClass ?? ""} readOnly placeholder="A, M, Staff" />
      </label>
      <label className="field">
        <span className="field-label">% comision asesor</span>
        <input
          key={selectedAdvisor?.id ?? "advisor-commission"}
          name="advisorParticipationPercent"
          type="number"
          min="0"
          max="100"
          step="0.01"
          defaultValue={selectedAdvisor?.commissionPercent ?? ""}
        />
      </label>
      <label className="field">
        <span className="field-label">Monto fijo</span>
        <input name="advisorFixedAmount" type="number" min="0" step="0.01" />
      </label>

      <div className="field field-full">
        <strong>7. Registro propietario</strong>
        <span className="muted">Nombre, correo y telefono son obligatorios como en el proceso original.</span>
      </div>
      <label className="field">
        <span className="field-label">Propietario principal</span>
        <input name="ownerName" placeholder="Nombre completo" required />
      </label>
      <label className="field">
        <span className="field-label">Correo propietario</span>
        <input name="ownerEmail" type="email" placeholder="propietario@correo.com" required />
      </label>
      <label className="field">
        <span className="field-label">Telefono propietario</span>
        <input name="ownerPhone" placeholder="+52..." required />
      </label>

      <div className="field field-full">
        <strong>8. Ficha tecnica</strong>
        <span className="muted">Residencial, comercial o industrial; foto fachada y croquis quedan como URL temporal.</span>
      </div>
      <label className="field">
        <span className="field-label">Tipo ficha</span>
        <select name="technicalSheetType" defaultValue="residential">
          <option value="residential">Residencial</option>
          <option value="commercial">Comercial</option>
          <option value="industrial">Industrial</option>
        </select>
      </label>
      <label className="field">
        <span className="field-label">Recamaras</span>
        <input name="bedrooms" type="number" min="0" step="1" />
      </label>
      <label className="field">
        <span className="field-label">Banos</span>
        <input name="bathrooms" type="number" min="0" step="1" />
      </label>
      <label className="field">
        <span className="field-label">Estacionamientos</span>
        <input name="parkingSpaces" type="number" min="0" step="1" />
      </label>
      <label className="field">
        <span className="field-label">Forma terreno</span>
        <input name="landShape" />
      </label>
      <label className="field">
        <span className="field-label">Topografia</span>
        <input name="landTopography" />
      </label>
      <label className="field">
        <span className="field-label">Uso suelo</span>
        <input name="landUse" />
      </label>
      <label className="field">
        <span className="field-label">Foto fachada URL</span>
        <input name="facadePhotoUrl" type="url" />
      </label>
      <label className="field">
        <span className="field-label">Croquis URL</span>
        <input name="croquisUrl" type="url" />
      </label>
      <label className="field field-full">
        <span className="field-label">Descripcion</span>
        <textarea name="description" placeholder="Notas iniciales de captacion" />
      </label>
      <div className="field" style={{ alignSelf: "end" }}>
        <button type="submit" className="button">Crear propiedad</button>
      </div>
    </form>
  );
}
