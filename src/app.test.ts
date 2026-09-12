import request from "supertest";
import { createApp } from "./app";

describe("API foundation", () => {
  const app = createApp();

  it("responde 404 con el formato de error acordado", async () => {
    const response = await request(app).get("/api/ruta-inexistente");

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      success: false,
      message: "Recurso no encontrado",
      error: "NOT_FOUND",
    });
  });
});
