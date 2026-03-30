"use client";

import { useEffect, useMemo, useState, useTransition, type CSSProperties, type ChangeEvent } from "react";
import { useRouter } from "next/navigation";

import {
  defaultRemaxBrandingSettings,
  parseRemaxBrandingSettings,
  REMAX_BRANDING_STORAGE_KEY,
  setBrandingLocaleCookie,
  storeRemaxBrandingSettings,
  type RemaxBrandingSettings
} from "@/lib/remax-branding";
import { demoLocaleOptions } from "@/lib/demo-locale";

function BrandingPreview({ settings }: { settings: RemaxBrandingSettings }) {
  const style = useMemo(
    () =>
      ({
        "--preview-bg": settings.backgroundColor,
        "--preview-surface": settings.surfaceColor,
        "--preview-text": settings.textColor,
        "--preview-muted": settings.mutedColor,
        "--preview-accent": settings.accentColor,
        "--preview-sidebar-start": settings.sidebarStartColor,
        "--preview-sidebar-end": settings.sidebarEndColor
      }) as CSSProperties,
    [settings]
  );

  return (
    <div className="remax-brand-preview" style={style}>
      <div className="remax-brand-preview-shell">
        <div className="remax-brand-preview-sidebar">
          {settings.logoDataUrl ? (
            <img src={settings.logoDataUrl} alt="Vista previa del logo" className="remax-brand-preview-logo" />
          ) : (
            <div className="remax-brand-preview-mark">
              <span>REMAX</span>
              <small>ACTIVA</small>
            </div>
          )}
          <strong>Dashboard</strong>
          <p>Muestra del shell</p>
        </div>

        <div className="remax-brand-preview-body">
          <div className="remax-brand-preview-header">
            <span>Vista previa del tema</span>
            <div className="remax-brand-preview-actions">
              <button type="button">Cancelar</button>
              <button type="button" className="primary">
                Guardar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function RemaxBrandSettings() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [settings, setSettings] = useState<RemaxBrandingSettings>(defaultRemaxBrandingSettings);

  useEffect(() => {
    const stored = window.localStorage.getItem(REMAX_BRANDING_STORAGE_KEY);
    setSettings(parseRemaxBrandingSettings(stored));
  }, []);

  function updateSetting<K extends keyof RemaxBrandingSettings>(key: K, value: RemaxBrandingSettings[K]) {
    setSettings((current) => ({ ...current, [key]: value }));
  }

  function handleLogoUpload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        updateSetting("logoDataUrl", reader.result);
      }
    };
    reader.readAsDataURL(file);
  }

  function handleSave() {
    storeRemaxBrandingSettings(settings);
    setBrandingLocaleCookie(settings.locale);

    startTransition(() => {
      router.refresh();
    });
  }

  function handleReset() {
    setSettings(defaultRemaxBrandingSettings);
    storeRemaxBrandingSettings(defaultRemaxBrandingSettings);
    setBrandingLocaleCookie(defaultRemaxBrandingSettings.locale);

    startTransition(() => {
      router.refresh();
    });
  }

  return (
    <div className="page-stack">
      <div className="form-grid">
        <div className="field field-full">
          <label className="field-label">Idioma de la interfaz</label>
          <select value={settings.locale} onChange={(event) => updateSetting("locale", event.target.value as RemaxBrandingSettings["locale"])}>
            {demoLocaleOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.nativeLabel}
              </option>
            ))}
          </select>
          <p className="helper-text">Define el idioma por defecto visible en el backoffice REMAX.</p>
        </div>

        <div className="field field-full">
          <label className="field-label">Logo REMAX</label>
          <div className="remax-brand-upload-row">
            <input type="file" accept=".png,.jpg,.jpeg,.svg" onChange={handleLogoUpload} />
            <button type="button" className="button button-secondary" onClick={() => updateSetting("logoDataUrl", null)}>
              Eliminar
            </button>
          </div>
          <p className="helper-text">PNG, JPG o SVG. Se aplica en el shell lateral del workspace.</p>
        </div>

        <div className="field">
          <label className="field-label">Color de fondo</label>
          <input type="color" value={settings.backgroundColor} onChange={(event) => updateSetting("backgroundColor", event.target.value)} />
        </div>
        <div className="field">
          <label className="field-label">Superficie</label>
          <input type="color" value={settings.surfaceColor} onChange={(event) => updateSetting("surfaceColor", event.target.value)} />
        </div>
        <div className="field">
          <label className="field-label">Texto principal</label>
          <input type="color" value={settings.textColor} onChange={(event) => updateSetting("textColor", event.target.value)} />
        </div>
        <div className="field">
          <label className="field-label">Texto secundario</label>
          <input type="color" value={settings.mutedColor} onChange={(event) => updateSetting("mutedColor", event.target.value)} />
        </div>
        <div className="field">
          <label className="field-label">Color principal</label>
          <input type="color" value={settings.accentColor} onChange={(event) => updateSetting("accentColor", event.target.value)} />
        </div>
        <div className="field">
          <label className="field-label">Sidebar inicio</label>
          <input type="color" value={settings.sidebarStartColor} onChange={(event) => updateSetting("sidebarStartColor", event.target.value)} />
        </div>
        <div className="field">
          <label className="field-label">Sidebar fin</label>
          <input type="color" value={settings.sidebarEndColor} onChange={(event) => updateSetting("sidebarEndColor", event.target.value)} />
        </div>
      </div>

      <BrandingPreview settings={settings} />

      <div className="button-row">
        <button type="button" className="button button-secondary" onClick={handleReset} disabled={isPending}>
          Restablecer
        </button>
        <button type="button" className="button" onClick={handleSave} disabled={isPending}>
          Guardar ajustes REMAX
        </button>
      </div>
    </div>
  );
}
