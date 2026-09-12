import express from "express";
import request from "supertest";
import { csrfOriginCheck } from "./csrfOriginCheck";
import { errorHandler } from "./errorHandler";

function createCsrfApp() {
  const app = express();
  app.use(express.json());
  app.use(csrfOriginCheck);
  app.post("/api/demo", (_req, res) => {
    res.status(200).json({ success: true, message: "ok", data: {} });
  });
  app.use(errorHandler);
  return app;
}

describe("csrfOriginCheck", () => {
  const app = createCsrfApp();

  it("permite mutaciones sin cookie", async () => {
    const response = await request(app).post("/api/demo");
    expect(response.status).toBe(200);
  });

  it("rechaza mutaciones autenticadas por cookie con origen inválido", async () => {
    const response = await request(app)
      .post("/api/demo")
      .set("Cookie", "session=test")
      .set("Origin", "https://malicious.example");

    expect(response.status).toBe(403);
    expect(response.body).toMatchObject({
      success: false,
      error: "CSRF_ORIGIN_INVALID",
    });
  });

  it("permite mutaciones con cookie y origen del frontend", async () => {
    const response = await request(app)
      .post("/api/demo")
      .set("Cookie", "session=test")
      .set("Origin", "http://localhost:3000");

    expect(response.status).toBe(200);
  });
});
