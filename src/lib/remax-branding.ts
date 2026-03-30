import type { CSSProperties } from "react";

import { DEMO_LOCALE_COOKIE_NAME, demoLocales, type DemoLocale } from "@/lib/demo-locale";

export const REMAX_BRANDING_STORAGE_KEY = "remax-branding-settings";

export interface RemaxBrandingSettings {
  logoDataUrl: string | null;
  backgroundColor: string;
  surfaceColor: string;
  textColor: string;
  mutedColor: string;
  accentColor: string;
  sidebarStartColor: string;
  sidebarEndColor: string;
  locale: DemoLocale;
}

export const defaultRemaxBrandingSettings: RemaxBrandingSettings = {
  logoDataUrl: null,
  backgroundColor: "#eef2f7",
  surfaceColor: "#ffffff",
  textColor: "#1a2433",
  mutedColor: "#63758b",
  accentColor: "#d7433f",
  sidebarStartColor: "#16202f",
  sidebarEndColor: "#1d2a3f",
  locale: "es"
};

function isDemoLocaleValue(value: string): value is DemoLocale {
  return (demoLocales as readonly string[]).includes(value);
}

export function parseRemaxBrandingSettings(value: string | null | undefined): RemaxBrandingSettings {
  if (!value) {
    return defaultRemaxBrandingSettings;
  }

  try {
    const parsed = JSON.parse(value) as Partial<RemaxBrandingSettings>;
    const parsedLocale = parsed.locale;
    const locale = isDemoLocaleValue(parsedLocale ?? "")
      ? (parsedLocale as DemoLocale)
      : defaultRemaxBrandingSettings.locale;

    return {
      ...defaultRemaxBrandingSettings,
      ...parsed,
      locale
    };
  } catch {
    return defaultRemaxBrandingSettings;
  }
}

export function getRemaxBrandingStyle(settings: RemaxBrandingSettings): CSSProperties {
  return {
    ["--remax-bg" as string]: settings.backgroundColor,
    ["--remax-surface" as string]: settings.surfaceColor,
    ["--remax-surface-soft" as string]: settings.surfaceColor,
    ["--remax-text" as string]: settings.textColor,
    ["--remax-muted" as string]: settings.mutedColor,
    ["--remax-red" as string]: settings.accentColor,
    ["--remax-blue" as string]: settings.accentColor,
    ["--remax-sidebar-start" as string]: settings.sidebarStartColor,
    ["--remax-sidebar-end" as string]: settings.sidebarEndColor
  };
}

export function storeRemaxBrandingSettings(settings: RemaxBrandingSettings) {
  window.localStorage.setItem(REMAX_BRANDING_STORAGE_KEY, JSON.stringify(settings));
  window.dispatchEvent(new CustomEvent("remax-branding-updated", { detail: settings }));
}

export function setBrandingLocaleCookie(locale: DemoLocale) {
  document.cookie = `${DEMO_LOCALE_COOKIE_NAME}=${locale}; path=/; max-age=31536000; samesite=lax`;
}
