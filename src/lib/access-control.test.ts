import { describe, expect, it } from "vitest";

import { canRoleAccessPath, getRoleForEmail } from "@/lib/access-control";

describe("access-control", () => {
  it("assigns invited REMAX Activa users to the operational sales role", () => {
    expect(getRoleForEmail("inventario@remax-activa.com.mx")).toBe("sales_admin");
    expect(getRoleForEmail("brenda@remax-activa.com.mx")).toBe("sales_admin");
  });

  it("keeps unknown external users in viewer mode", () => {
    expect(getRoleForEmail("guest@example.com")).toBe("viewer");
  });

  it("allows sales admins to open properties", () => {
    expect(canRoleAccessPath("sales_admin", "/app/properties")).toBe(true);
    expect(canRoleAccessPath("viewer", "/app/properties")).toBe(false);
  });
});
