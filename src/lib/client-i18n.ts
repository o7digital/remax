import { translateText, type DemoLocale } from "@/lib/demo-locale";

export function clientTxt(locale: DemoLocale, value: string) {
  return translateText(locale, value);
}

export function clientLocaleTag(locale: DemoLocale) {
  return locale === "en" ? "en-US" : "es-MX";
}
