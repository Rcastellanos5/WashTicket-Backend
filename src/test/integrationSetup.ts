import { syncDatabase } from "../config/database";
import { sequelize } from "../config/database";
import { ensureTestDatabase } from "./ensureTestDatabase";
import { env } from "../config/env";

export async function setupIntegrationDatabase(): Promise<void> {
  if (env.nodeEnv !== "test") {
    throw new Error("El setup de integración solo puede ejecutarse con NODE_ENV=test");
  }

  await ensureTestDatabase();
  await syncDatabase();
}

export async function resetIntegrationDatabase(): Promise<void> {
  await sequelize.truncate({ cascade: true, restartIdentity: true, force: true });
}
