import request from "supertest";
import { createApp } from "./app";
import { setupIntegrationDatabase } from "./test/integrationSetup";

describe("GET /api/health", () => {
  const app = createApp();

  beforeAll(async () => {
    await setupIntegrationDatabase();
  }, 30000);

  it("reporta la API y PostgreSQL de test disponibles", async () => {
    const response = await request(app).get("/api/health");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      success: true,
      message: "WashTicket API en ejecución",
      data: { status: "ok", database: "up" },
    });
  });
});
