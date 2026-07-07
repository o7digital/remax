import type { DemoLocale } from "@/lib/demo-locale";

export function LanguageSwitcher({ locale: _locale }: { locale: DemoLocale }) {
  return (
    <div className="language-switcher language-switcher-static" aria-label="Idioma de la aplicación: español">
      <span className="language-button active">ES</span>
    </div>
  );
}
