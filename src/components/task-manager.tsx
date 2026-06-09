"use client";

import { useMemo, useState } from "react";

import { DataTable } from "@/components/data-table";
import { SectionCard } from "@/components/section-card";
import { StatCard } from "@/components/stat-card";
import { StatusBadge } from "@/components/status-badge";

type TaskRecord = {
  id: string;
  title: string;
  client: string;
  owner: string;
  dueDate: string;
  priority: string;
  status: string;
};

const PRIORITIES = ["High", "Medium", "Low"];
const STATUSES = ["Scheduled", "In progress", "Due today", "Blocked", "Done"];

export function TaskManager({ initialTasks }: { initialTasks: TaskRecord[] }) {
  const [tasks, setTasks] = useState(initialTasks);
  const [editingId, setEditingId] = useState<string | null>(null);
  const editingTask = tasks.find((task) => task.id === editingId);
  const dueToday = tasks.filter((task) => task.status === "Due today").length;
  const blocked = tasks.filter((task) => task.status === "Blocked").length;
  const owners = useMemo(() => new Set(tasks.map((task) => task.owner)).size, [tasks]);

  function saveTask(formData: FormData) {
    const id = String(formData.get("id") || `tsk-${Date.now()}`);
    const nextTask = {
      id,
      title: String(formData.get("title") ?? "").trim(),
      client: String(formData.get("client") ?? "").trim(),
      owner: String(formData.get("owner") ?? "").trim(),
      dueDate: String(formData.get("dueDate") ?? "").trim(),
      priority: String(formData.get("priority") ?? "Medium"),
      status: String(formData.get("status") ?? "Scheduled")
    };

    if (!nextTask.title) {
      return;
    }

    setTasks((current) => {
      const exists = current.some((task) => task.id === id);
      return exists ? current.map((task) => (task.id === id ? nextTask : task)) : [nextTask, ...current];
    });
    setEditingId(null);
  }

  return (
    <>
      <div className="stats-grid">
        <StatCard label="Tareas abiertas" value={String(tasks.length)} detail="cola activa" />
        <StatCard label="Vence hoy" value={String(dueToday)} detail="prioridad de ejecucion" />
        <StatCard label="Bloqueado" value={String(blocked)} detail="requiere arbitraje" />
        <StatCard label="Responsables activos" value={String(owners)} detail="sales + ops + finanzas" />
      </div>

      <SectionCard title="Crear / editar tarea" description="Captura rapida para operacion diaria.">
        <form action={saveTask} className="form-grid">
          <input name="id" type="hidden" value={editingTask?.id ?? ""} />
          <label className="field">
            <span className="field-label">Tarea</span>
            <input name="title" key={editingTask?.id ?? "new-title"} defaultValue={editingTask?.title ?? ""} required />
          </label>
          <label className="field">
            <span className="field-label">Cliente</span>
            <input name="client" key={editingTask?.id ?? "new-client"} defaultValue={editingTask?.client ?? ""} />
          </label>
          <label className="field">
            <span className="field-label">Responsable</span>
            <input name="owner" key={editingTask?.id ?? "new-owner"} defaultValue={editingTask?.owner ?? ""} />
          </label>
          <label className="field">
            <span className="field-label">Fecha limite</span>
            <input name="dueDate" type="date" key={editingTask?.id ?? "new-date"} defaultValue={editingTask?.dueDate ?? ""} />
          </label>
          <label className="field">
            <span className="field-label">Prioridad</span>
            <select name="priority" key={editingTask?.id ?? "new-priority"} defaultValue={editingTask?.priority ?? "Medium"}>
              {PRIORITIES.map((priority) => <option key={priority}>{priority}</option>)}
            </select>
          </label>
          <label className="field">
            <span className="field-label">Estado</span>
            <select name="status" key={editingTask?.id ?? "new-status"} defaultValue={editingTask?.status ?? "Scheduled"}>
              {STATUSES.map((status) => <option key={status}>{status}</option>)}
            </select>
          </label>
          <div className="field" style={{ alignSelf: "end" }}>
            <button className="button" type="submit">{editingTask ? "Guardar cambios" : "Crear tarea"}</button>
          </div>
        </form>
      </SectionCard>

      <SectionCard title="Cola operativa" description="Tareas con prioridad, vencimiento y bloqueos.">
        <DataTable
          rows={tasks}
          getRowId={(row) => row.id}
          columns={[
            { key: "title", label: "Tarea", render: (row) => row.title },
            { key: "client", label: "Cliente", render: (row) => row.client },
            { key: "owner", label: "Responsable", render: (row) => row.owner },
            { key: "due", label: "Fecha limite", render: (row) => row.dueDate },
            { key: "priority", label: "Prioridad", render: (row) => <StatusBadge value={row.priority} /> },
            { key: "status", label: "Estado", render: (row) => <StatusBadge value={row.status} /> },
            {
              key: "actions",
              label: "Acciones",
              render: (row) => <button className="button button-secondary" type="button" onClick={() => setEditingId(row.id)}>Editar</button>
            }
          ]}
        />
      </SectionCard>
    </>
  );
}
