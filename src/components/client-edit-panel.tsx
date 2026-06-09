"use client";

import { useState } from "react";

import { SectionCard } from "@/components/section-card";
import { StatusBadge } from "@/components/status-badge";

type ClientEditRecord = {
  fullName: string;
  contactKind: string;
  email: string | null;
  phone: string | null;
  propertyCount: number;
  primaryLocation: string;
  portfolioStatus: string;
};

export function ClientEditPanel({ client }: { client: ClientEditRecord }) {
  const [record, setRecord] = useState(client);
  const [editing, setEditing] = useState(false);

  function save(formData: FormData) {
    setRecord({
      ...record,
      fullName: String(formData.get("fullName") ?? record.fullName).trim(),
      email: String(formData.get("email") ?? "").trim() || null,
      phone: String(formData.get("phone") ?? "").trim() || null,
      primaryLocation: String(formData.get("primaryLocation") ?? record.primaryLocation).trim(),
      portfolioStatus: String(formData.get("portfolioStatus") ?? record.portfolioStatus)
    });
    setEditing(false);
  }

  return (
    <SectionCard title="Resumen" description={editing ? "Editando datos del cliente para esta sesion." : undefined}>
      {editing ? (
        <form action={save} className="form-grid">
          <label className="field"><span className="field-label">Nombre</span><input name="fullName" defaultValue={record.fullName} required /></label>
          <label className="field"><span className="field-label">Email</span><input name="email" type="email" defaultValue={record.email ?? ""} /></label>
          <label className="field"><span className="field-label">Telefono</span><input name="phone" defaultValue={record.phone ?? ""} /></label>
          <label className="field"><span className="field-label">Ubicacion</span><input name="primaryLocation" defaultValue={record.primaryLocation} /></label>
          <label className="field">
            <span className="field-label">Estado cartera</span>
            <select name="portfolioStatus" defaultValue={record.portfolioStatus}>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Blocked">Blocked</option>
            </select>
          </label>
          <div className="field" style={{ alignSelf: "end" }}>
            <button className="button" type="submit">Guardar</button>
          </div>
        </form>
      ) : (
        <div className="two-columns">
          <div><p className="field-label">Tipo</p><StatusBadge value={record.contactKind === "owner" ? "Propietario" : "Comprador"} /></div>
          <div><p className="field-label">Email</p><p>{record.email ?? "Sin email"}</p></div>
          <div><p className="field-label">Telefono</p><p>{record.phone ?? "Sin telefono"}</p></div>
          <div><p className="field-label">Propiedades</p><p>{record.propertyCount}</p></div>
          <div><p className="field-label">Ubicacion</p><p>{record.primaryLocation}</p></div>
          <div><p className="field-label">Estado cartera</p><StatusBadge value={record.portfolioStatus} /></div>
          <div><button className="button" type="button" onClick={() => setEditing(true)}>Editar cliente</button></div>
        </div>
      )}
    </SectionCard>
  );
}
