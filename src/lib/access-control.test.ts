import { describe, expect, it } from "vitest";

import { canRoleAccessPath, getRoleForEmail } from "@/lib/access-control";

describe("access-control", () => {
  it("assigns Olivier to the super admin role", () => {
    expect(getRoleForEmail("olivier.steineur@gmail.com")).toBe("super_admin");
  });

  it("assigns the manager to the client admin role", () => {
    expect(getRoleForEmail("christopher.suarez@remax-activa.com.mx")).toBe("client_admin");
    expect(getRoleForEmail("pedro.leyva@remax-activa.com.mx")).toBe("client_admin");
    expect(getRoleForEmail("brendac0101@gmail.com")).toBe("client_admin");
    expect(getRoleForEmail("brenda.aguilar@remax-activa.com.mx")).toBe("client_admin");
  });

  it("assigns REMAX Activa users and other authenticated users to asesor by default", () => {
    expect(getRoleForEmail("inventario@remax-activa.com.mx")).toBe("asesor");
    expect(getRoleForEmail("asesor@remax-activa.com.mx")).toBe("asesor");
    expect(getRoleForEmail("guest@example.com")).toBe("asesor");
  });

  it("allows asesores to open properties but not admin settings", () => {
    expect(canRoleAccessPath("asesor", "/app/properties")).toBe(true);
    expect(canRoleAccessPath("asesor", "/app/settings/users")).toBe(false);
    expect(canRoleAccessPath("client_admin", "/app/settings/users")).toBe(true);
    expect(canRoleAccessPath("super_admin", "/app/settings/users")).toBe(true);
  });
});
