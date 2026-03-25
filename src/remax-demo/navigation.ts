import type { NavSection } from "@/lib/nav";

export const remaxDemoNavigation: NavSection[] = [
  {
    title: "Inicio",
    items: [{ label: "Plataforma ejecutiva", href: "/remax-demo" }]
  },
  {
    title: "Operacion",
    items: [
      { label: "Alta", href: "/remax-demo/alta" },
      { label: "Bajas / cierres", href: "/remax-demo/baja" },
      { label: "Cancelacion", href: "/remax-demo/cancelacion" }
    ]
  },
  {
    title: "Gestion",
    items: [
      { label: "Propiedades", href: "/remax-demo/propiedades" },
      { label: "Valores", href: "/remax-demo/valores" },
      { label: "Asesores", href: "/remax-demo/asesores" },
      { label: "Propietarios", href: "/remax-demo/propietarios" },
      { label: "Comunicados", href: "/remax-demo/comunicados" }
    ]
  },
  {
    title: "Inteligencia",
    items: [
      { label: "Analisis inteligente", href: "/remax-demo/analisis" },
      { label: "Pipeline operativo", href: "/remax-demo/pipeline" }
    ]
  },
  {
    title: "Roadmap",
    items: [{ label: "Arquitectura Astro", href: "/remax-demo/arquitectura" }]
  }
];
