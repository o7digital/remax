"use client";

import { useState } from "react";

import { SectionCard } from "@/components/section-card";
import { StatusBadge } from "@/components/status-badge";

type ContactEditRecord = {
  fullName: string;
  contactKind: string;
  email: string | null;
  phone: string | null;
  propertyKey: string;
  propertyTitle: string;
  location: string;
  propertyStatus: string;
  isPrimary: boolean;
};

export function ContactEditPanel({ contact }: { contact: ContactEditRecord }) {
  const [record, setRecord] = useState(contact);
  const [editing, setEditing] = useState(false);

  function save(formData: FormData) {
    setRecord({
      ...record,
      fullName: String(formData.get("fullName") ?? record.fullName).trim(),
      email: String(formData.get("email") ?? "").trim() || null,
      phone: String(formData.get("phone") ?? "").trim() || null,
      location: String(formData.get("location") ?? record.location).trim(),
      isPrimary: formData.get("isPrimary") === "on"
    });
    setEditing(false);
  }

  return (
    <>
      <SectionCard
        title="Resumen"
        description={editing ? "Editando datos de contacto para esta sesion." : undefined}
      >
        {editing ? (
          <form action={save} className="form-grid">
            <label className="field">
              <span className="field-label">Nombre</span>
              <input name="fullName" defaultValue={record.fullName} required />
            </label>
            <label className="field">
              <span className="field-label">Email</span>
              <input name="email" type="email" defaultValue={record.email ?? ""} />
            </label>
            <label className="field">
              <span className="field-label">Telefono</span>
              <input name="phone" defaultValue={record.phone ?? ""} />
            </label>
            <label className="field">
              <span className="field-label">Ubicacion</span>
              <input name="location" defaultValue={record.location} />
            </label>
            <label className="badge badge-neutral">
              <input name="isPrimary" type="checkbox" defaultChecked={record.isPrimary} style={{ minHeight: "auto", width: "auto" }} />
              Principal
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
            <div><p className="field-label">Propiedad</p><p><strong>{record.propertyKey}</strong> {record.propertyTitle}</p></div>
            <div><p className="field-label">Ubicacion</p><p>{record.location}</p></div>
            <div><p className="field-label">Estado</p><StatusBadge value={record.propertyStatus} /></div>
            <div><p className="field-label">Perfil</p><StatusBadge value={record.isPrimary ? "Principal" : "Secundario"} /></div>
            <div><button className="button" type="button" onClick={() => setEditing(true)}>Editar contacto</button></div>
          </div>
        )}
      </SectionCard>
    </>
  );
}
