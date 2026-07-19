"use client";

import { useEffect, useMemo, useState } from "react";

import { StatusBadge } from "@/components/status-badge";

type Plan = "trial" | "basic" | "standard" | "advanced" | "team";
type CrmMode = "B2B" | "B2C";
type Country = "MX" | "CA" | "FR";
type SubscriptionStatus = "ACTIVE" | "PAUSED" | "CANCELED";

interface SubscriptionRecord {
  id: string;
  customerName: string;
  country: Country;
  address: string;
  contactName: string;
  contactEmail: string;
  plan: Plan;
  seats: number;
  crmMode: CrmMode;
  industry: string;
  tenantId: string;
  status: SubscriptionStatus;
  connectedUsers: number;
  pendingAdmins: string[];
  paymentConfigured: boolean;
  createdAt: string;
  firstAccessAt: string | null;
  lastAccessAt: string | null;
}

const STORAGE_KEY = "inmo-o7-subscriptions";

const planOptions: Array<{ value: Plan; label: string; seats: number }> = [
  { value: "trial", label: "Essai (30 jours)", seats: 1 },
  { value: "basic", label: "Pulse Basic - 1 utilisateur", seats: 1 },
  { value: "standard", label: "Pulse Standard - 3 utilisateurs", seats: 3 },
  { value: "advanced", label: "Pulse Advanced - 5 utilisateurs", seats: 5 },
  { value: "team", label: "Pulse Team - 20 utilisateurs", seats: 20 }
];

const industries = [
  "Immobilier residentiel",
  "Immobilier commercial",
  "Construction",
  "Conseil",
  "Juridique",
  "Services professionnels",
  "Autre"
];

const seedSubscriptions: SubscriptionRecord[] = [
  {
    id: "sub-zevi",
    customerName: "ZEVI CAPITAL",
    country: "MX",
    address: "Mexico",
    contactName: "Eduardo ZEPEDA",
    contactEmail: "edzepedaed@gmail.com",
    plan: "standard",
    seats: 3,
    crmMode: "B2B",
    industry: "Conseil",
    tenantId: "4b715980-e138-4dc4-88ff-6cffd4de3a3",
    status: "ACTIVE",
    connectedUsers: 1,
    pendingAdmins: [],
    paymentConfigured: false,
    createdAt: "2026-06-16",
    firstAccessAt: "2026-06-16T22:14:15",
    lastAccessAt: "2026-06-16T22:14:15"
  },
  {
    id: "sub-scm",
    customerName: "SCM ABOGADOS",
    country: "MX",
    address: "Rio Panuco 43, Col. Renacimiento, Cuauhtemoc, CDMX",
    contactName: "Gil Vazquez",
    contactEmail: "gvm240581@gmail.com",
    plan: "standard",
    seats: 3,
    crmMode: "B2B",
    industry: "Juridique",
    tenantId: "54691445-15d2-495e-8b43-421971cf2e8f",
    status: "ACTIVE",
    connectedUsers: 0,
    pendingAdmins: [],
    paymentConfigured: false,
    createdAt: "2026-05-05",
    firstAccessAt: null,
    lastAccessAt: null
  }
];

function makeId(prefix: string) {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

function getPlanLabel(plan: Plan, seats: number) {
  return planOptions.find((option) => option.value === plan)?.label ?? `Custom - ${seats} utilisateurs`;
}

function formatDate(value: string | null) {
  if (!value) {
    return "-";
  }

  return new Intl.DateTimeFormat("fr-FR", { dateStyle: "short", timeStyle: value.includes("T") ? "medium" : undefined }).format(
    new Date(value)
  );
}

function buildRegistrationLink(subscription: SubscriptionRecord) {
  const origin = typeof window === "undefined" ? "" : window.location.origin;
  const params = new URLSearchParams({
    tenantId: subscription.tenantId,
    tenantName: subscription.customerName,
    country: subscription.country,
    name: subscription.contactName,
    email: subscription.contactEmail
  });

  return `${origin}/register?${params.toString()}`;
}

export function SubscriptionManager() {
  const [subscriptions, setSubscriptions] = useState<SubscriptionRecord[]>(seedSubscriptions);
  const [customerName, setCustomerName] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState<Country>("MX");
  const [plan, setPlan] = useState<Plan>("trial");
  const [seats, setSeats] = useState(1);
  const [crmMode, setCrmMode] = useState<CrmMode>("B2B");
  const [industry, setIndustry] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [adminDrafts, setAdminDrafts] = useState<Record<string, string>>({});
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setSubscriptions(JSON.parse(stored) as SubscriptionRecord[]);
      } catch {
        setSubscriptions(seedSubscriptions);
      }
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(subscriptions));
  }, [subscriptions]);

  const summary = useMemo(
    () => ({
      active: subscriptions.filter((item) => item.status === "ACTIVE").length,
      users: subscriptions.reduce((sum, item) => sum + item.connectedUsers, 0),
      seats: subscriptions.reduce((sum, item) => sum + item.seats, 0)
    }),
    [subscriptions]
  );

  function updatePlan(nextPlan: Plan) {
    setPlan(nextPlan);
    setSeats(planOptions.find((option) => option.value === nextPlan)?.seats ?? 1);
  }

  async function copyLink(subscription: SubscriptionRecord) {
    await navigator.clipboard.writeText(buildRegistrationLink(subscription));
    setMessage("Lien copie.");
  }

  function createSubscription() {
    if (!customerName.trim() || !contactName.trim() || !contactEmail.trim() || !industry) {
      setMessage("Completez client, contact, email et industrie pour creer le lien.");
      return;
    }

    const created: SubscriptionRecord = {
      id: makeId("sub"),
      customerName: customerName.trim().toUpperCase(),
      country,
      address: address.trim(),
      contactName: contactName.trim(),
      contactEmail: contactEmail.trim(),
      plan,
      seats,
      crmMode,
      industry,
      tenantId: makeId("tenant"),
      status: "ACTIVE",
      connectedUsers: 0,
      pendingAdmins: [],
      paymentConfigured: false,
      createdAt: new Date().toISOString(),
      firstAccessAt: null,
      lastAccessAt: null
    };

    setSubscriptions((current) => [created, ...current]);
    setCustomerName("");
    setContactName("");
    setContactEmail("");
    setAddress("");
    setIndustry("");
    setMessage("Souscription creee et lien disponible.");
  }

  function updateSubscription(id: string, patch: Partial<SubscriptionRecord>) {
    setSubscriptions((current) => current.map((item) => (item.id === id ? { ...item, ...patch } : item)));
  }

  function addAdmin(subscription: SubscriptionRecord) {
    const email = (adminDrafts[subscription.id] ?? "").trim();
    if (!email) {
      setMessage("Indiquez un email admin.");
      return;
    }

    updateSubscription(subscription.id, {
      pendingAdmins: [...subscription.pendingAdmins, email]
    });
    setAdminDrafts((current) => ({ ...current, [subscription.id]: "" }));
    setMessage("Admin ajoute aux invitations.");
  }

  return (
    <div className="subscription-stack">
      {message ? <p className="helper-text">{message}</p> : null}

      <div className="stats-grid">
        <article className="stat-card">
          <span className="stat-label">Souscriptions actives</span>
          <strong className="stat-value">{summary.active}</strong>
          <span className="stat-detail">{subscriptions.length} comptes clients</span>
        </article>
        <article className="stat-card">
          <span className="stat-label">Utilisateurs connectes</span>
          <strong className="stat-value">{summary.users}</strong>
          <span className="stat-detail">sur {summary.seats} sieges vendus</span>
        </article>
        <article className="stat-card">
          <span className="stat-label">Paiements</span>
          <strong className="stat-value">{subscriptions.filter((item) => item.paymentConfigured).length}</strong>
          <span className="stat-detail">configures</span>
        </article>
      </div>

      <section className="card">
        <div className="card-header">
          <div>
            <h2>Creer un espace client</h2>
            <p>Genere un lien d'inscription pour un workspace Inmo o7 isole.</p>
          </div>
          <button type="button" className="button" onClick={createSubscription} disabled={!industry}>
            Creer le lien
          </button>
        </div>

        <div className="form-grid">
          <label className="field">
            <span className="field-label">Raison sociale</span>
            <input value={customerName} onChange={(event) => setCustomerName(event.target.value)} placeholder="Nom complet" />
          </label>
          <label className="field">
            <span className="field-label">Contact</span>
            <input value={contactName} onChange={(event) => setContactName(event.target.value)} placeholder="Prenom Nom" />
          </label>
          <label className="field">
            <span className="field-label">Email client</span>
            <input value={contactEmail} onChange={(event) => setContactEmail(event.target.value)} placeholder="utilisateur@entreprise.com" />
          </label>
          <label className="field">
            <span className="field-label">Pays</span>
            <select value={country} onChange={(event) => setCountry(event.target.value as Country)}>
              <option value="MX">Mexique</option>
              <option value="CA">Canada</option>
              <option value="FR">France</option>
            </select>
          </label>
          <label className="field field-full">
            <span className="field-label">Adresse</span>
            <input value={address} onChange={(event) => setAddress(event.target.value)} placeholder="Rue, ville, pays" />
          </label>
          <label className="field">
            <span className="field-label">Abonnement</span>
            <select value={plan} onChange={(event) => updatePlan(event.target.value as Plan)}>
              {planOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
          <label className="field">
            <span className="field-label">Utilisateurs</span>
            <select value={seats} onChange={(event) => setSeats(Number(event.target.value))}>
              {[1, 2, 3, 5, 10, 20, 30].map((count) => (
                <option key={count} value={count}>
                  {count} utilisateurs
                </option>
              ))}
            </select>
          </label>
          <label className="field">
            <span className="field-label">Mode CRM</span>
            <select value={crmMode} onChange={(event) => setCrmMode(event.target.value as CrmMode)}>
              <option value="B2B">B2B</option>
              <option value="B2C">B2C</option>
            </select>
          </label>
          <label className="field">
            <span className="field-label">Industrie</span>
            <select value={industry} onChange={(event) => setIndustry(event.target.value)}>
              <option value="">Selectionnez une industrie</option>
              {industries.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
            {!industry ? <span className="helper-text">Choisissez une industrie pour activer Creer le lien.</span> : null}
          </label>
        </div>
      </section>

      <section className="card">
        <div className="card-header">
          <div>
            <h2>Souscriptions clients</h2>
            <p>Liens d'inscription, activite, admins et paiement.</p>
          </div>
        </div>

        <div className="table-wrap">
          <table className="data-table subscription-table">
            <thead>
              <tr>
                <th>Client</th>
                <th>Statut</th>
                <th>Abonnement</th>
                <th>Lien</th>
                <th>Cree</th>
              </tr>
            </thead>
            <tbody>
              {subscriptions.map((subscription) => {
                const isEditing = editingId === subscription.id;
                const link = buildRegistrationLink(subscription);

                return (
                  <tr key={subscription.id}>
                    <td>
                      {isEditing ? (
                        <div className="subscription-edit-grid">
                          <input
                            value={subscription.customerName}
                            onChange={(event) => updateSubscription(subscription.id, { customerName: event.target.value })}
                          />
                          <input
                            value={subscription.contactName}
                            onChange={(event) => updateSubscription(subscription.id, { contactName: event.target.value })}
                          />
                          <input
                            value={subscription.contactEmail}
                            onChange={(event) => updateSubscription(subscription.id, { contactEmail: event.target.value })}
                          />
                        </div>
                      ) : (
                        <div>
                          <strong>{subscription.customerName}</strong>
                          <div className="muted">
                            {subscription.country} · {subscription.address || "Adresse non renseignee"}
                          </div>
                          <div className="muted">
                            {subscription.contactName} · {subscription.contactEmail}
                          </div>
                        </div>
                      )}
                    </td>
                    <td>
                      <StatusBadge value={subscription.status} />
                      <div className="subscription-meta">
                        {subscription.connectedUsers > 0 ? (
                          <span>{subscription.connectedUsers} utilisateurs connectes</span>
                        ) : (
                          <span className="subscription-warning">Aucune connexion client</span>
                        )}
                        <span>Premier acces : {formatDate(subscription.firstAccessAt)}</span>
                        <span>Dernier acces : {formatDate(subscription.lastAccessAt)}</span>
                      </div>
                    </td>
                    <td>
                      <strong>{getPlanLabel(subscription.plan, subscription.seats)}</strong>
                      <div className="muted">{subscription.seats} utilisateurs</div>
                      <div className={subscription.paymentConfigured ? "subscription-paid" : "subscription-warning"}>
                        {subscription.paymentConfigured ? "Paiement configure" : "Paiement non configure"}
                      </div>
                    </td>
                    <td>
                      <div className="button-row subscription-actions">
                        <button type="button" className="button button-secondary" onClick={() => copyLink(subscription)}>
                          Copier
                        </button>
                        <button
                          type="button"
                          className="button button-secondary"
                          onClick={() => setEditingId(isEditing ? null : subscription.id)}
                        >
                          {isEditing ? "Fermer" : "Editer lien"}
                        </button>
                        <button type="button" className="button button-secondary" onClick={() => addAdmin(subscription)}>
                          Ajouter admin
                        </button>
                        <button
                          type="button"
                          className="button button-secondary"
                          onClick={() => updateSubscription(subscription.id, { paymentConfigured: true })}
                        >
                          Mettre en paiement
                        </button>
                      </div>
                      <input
                        className="subscription-admin-input"
                        value={adminDrafts[subscription.id] ?? ""}
                        onChange={(event) => setAdminDrafts((current) => ({ ...current, [subscription.id]: event.target.value }))}
                        placeholder="admin@entreprise.com"
                      />
                      <code className="subscription-link">{link}</code>
                      {subscription.pendingAdmins.length > 0 ? (
                        <div className="muted">{subscription.pendingAdmins.length} admins en attente</div>
                      ) : null}
                    </td>
                    <td>{formatDate(subscription.createdAt)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
