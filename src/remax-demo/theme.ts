export type RemaxTheme = "classic" | "cobalt" | "terracotta";

export const REMAX_THEME_STORAGE_KEY = "remax-demo-theme";

export const remaxThemeOptions: Array<{
  id: RemaxTheme;
  label: string;
  description: string;
  swatches: [string, string, string];
}> = [
  {
    id: "classic",
    label: "Classic REMAX",
    description: "Base corporativa azul, rojo y blanco.",
    swatches: ["#16202f", "#d7433f", "#eef2f7"]
  },
  {
    id: "cobalt",
    label: "Cobalt",
    description: "Lectura mas ejecutiva con azul profundo y acero.",
    swatches: ["#102033", "#3e7cbf", "#eaf1f8"]
  },
  {
    id: "terracotta",
    label: "Terracotta",
    description: "Acento mas calido con arena, tinta y ladrillo.",
    swatches: ["#2f2624", "#c8644c", "#f4ede6"]
  }
];

export function isRemaxTheme(value?: string | null): value is RemaxTheme {
  return remaxThemeOptions.some((option) => option.id === value);
}
