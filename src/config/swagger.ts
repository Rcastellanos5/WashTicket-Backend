import swaggerJsdoc from "swagger-jsdoc";

export const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: "3.0.3",
    info: {
      title: "WashTicket API",
      version: "1.0.0",
      description: "API REST de WashTicket. Fase de base técnica: health y contrato de datos.",
    },
    servers: [{ url: "/api" }],
    paths: {
      "/health": {
        get: {
          summary: "Estado del proceso y de PostgreSQL",
          responses: {
            "200": { description: "API y base de datos disponibles" },
            "503": { description: "API disponible y base de datos no disponible" },
          },
        },
      },
    },
  },
  apis: [],
});
