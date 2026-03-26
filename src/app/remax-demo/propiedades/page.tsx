import { redirect } from "next/navigation";

import { remaxDemoDefaults } from "@/remax-demo/data";

export default function RemaxPropiedadesAliasPage() {
  redirect(`/remax-demo/alta?step=expediente&propiedad=${remaxDemoDefaults.altaPropertyKey}`);
}
