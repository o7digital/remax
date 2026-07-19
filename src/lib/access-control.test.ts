import { describe, expect, it } from "vitest";

import {
  AUTHORIZED_USER_EMAILS,
  MAX_AUTHORIZED_USERS,
  canEmailAccessApp,
  canRoleAccessPath,
  getRoleForEmail
} from "@/lib/access-control";

describe("access-control", () => {
  it("assigns Olivier to the super admin role", () => {
    expect(getRoleForEmail("olivier.steineur@gmail.com")).toBe("super_admin");
  });

  it("assigns the manager to the client admin role", () => {
    expect(getRoleForEmail("christopher.suarez@inmo-o7.com.mx")).toBe("client_admin");
    expect(getRoleForEmail("pedro.leyva@inmo-o7.com.mx")).toBe("client_admin");
    expect(getRoleForEmail("brendac0101@gmail.com")).toBe("client_admin");
    expect(getRoleForEmail("brenda.aguilar@inmo-o7.com.mx")).toBe("client_admin");
  });

  it("keeps Christophe Suarez out of the super admin role", () => {
    expect(getRoleForEmail("christopher.suarez@inmo-o7.com.mx")).not.toBe("super_admin");
  });

  it("limits app access to the 5 authorized user emails", () => {
    expect(AUTHORIZED_USER_EMAILS).toHaveLength(MAX_AUTHORIZED_USERS);
    expect(canEmailAccessApp("olivier.steineur@gmail.com")).toBe(true);
    expect(canEmailAccessApp("christopher.suarez@inmo-o7.com.mx")).toBe(true);
    expect(canEmailAccessApp("pedro.leyva@inmo-o7.com.mx")).toBe(true);
    expect(canEmailAccessApp("brendac0101@gmail.com")).toBe(true);
    expect(canEmailAccessApp("brenda.aguilar@inmo-o7.com.mx")).toBe(true);
  });

  it("does not authorize the Inmo o7 domain or random authenticated users by default", () => {
    expect(canEmailAccessApp("inventario@inmo-o7.com.mx")).toBe(false);
    expect(canEmailAccessApp("asesor@inmo-o7.com.mx")).toBe(false);
    expect(canEmailAccessApp("guest@example.com")).toBe(false);
    expect(getRoleForEmail("inventario@inmo-o7.com.mx")).toBe("asesor");
    expect(getRoleForEmail("asesor@inmo-o7.com.mx")).toBe("asesor");
    expect(getRoleForEmail("guest@example.com")).toBe("asesor");
  });

  it("allows asesores to open properties but not admin settings", () => {
    expect(canRoleAccessPath("asesor", "/app/properties")).toBe(true);
    expect(canRoleAccessPath("asesor", "/app/settings/users")).toBe(false);
    expect(canRoleAccessPath("client_admin", "/app/settings/users")).toBe(true);
    expect(canRoleAccessPath("super_admin", "/app/settings/users")).toBe(true);
  });
});
