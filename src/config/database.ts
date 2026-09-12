import { Sequelize } from "sequelize";
import { env, getActiveDatabaseUrl } from "./env";
import { logger } from "./logger";

export const sequelize = new Sequelize(getActiveDatabaseUrl(), {
  dialect: "postgres",
  logging: env.nodeEnv === "development" ? (message) => logger.debug(message) : false,
  timezone: "+00:00",
  define: {
    underscored: true,
    timestamps: true,
  },
});

export async function connectDatabase(): Promise<void> {
  await sequelize.authenticate();
  logger.info("Conexión a PostgreSQL establecida");
}

export async function syncDatabase(): Promise<void> {
  if (env.nodeEnv === "production") {
    throw new Error("sequelize.sync() no está permitido en production");
  }

  if (env.nodeEnv !== "development" && env.nodeEnv !== "test") {
    throw new Error("sequelize.sync() solo puede ejecutarse en development o en el harness de test");
  }

  await sequelize.sync();
  logger.info("Esquema Sequelize sincronizado sin force ni alter");
}

export async function closeDatabase(): Promise<void> {
  await sequelize.close();
}
