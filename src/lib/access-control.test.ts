import { describe, expect, it } from "vitest";

import { canRoleAccessPath, getRoleForEmail } from "@/lib/access-control";

describe("access-control", () => {
  it("assigns invited REMAX Activa users to the operational sales role", () => {
    expect(getRoleForEmail("inventario@remax-activa.com.mx")).toBe("sales_admin");
    expect(getRoleForEmail("brenda@remax-activa.com.mx")).toBe("sales_admin");
  });

  it("assigns invited authenticated users to the operational sales role by default", () => {
    expect(getRoleForEmail("guest@example.com")).toBe("sales_admin");
  });

  it("allows sales admins to open properties", () => {
    expect(canRoleAccessPath("sales_admin", "/app/properties")).toBe(true);
    expect(canRoleAccessPath("viewer", "/app/properties")).toBe(false);
  });
});
