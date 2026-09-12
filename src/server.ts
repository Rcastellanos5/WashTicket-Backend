import { createApp } from "./app";
import { connectDatabase, syncDatabase } from "./config/database";
import { env } from "./config/env";
import { logger } from "./config/logger";
import { seedDevelopmentData } from "./config/seed";
import "./models";

async function start(): Promise<void> {
  try {
    await connectDatabase();

    if (env.nodeEnv === "development") {
      await syncDatabase();
      await seedDevelopmentData();
    }

    const app = createApp();
    app.listen(env.port, () => {
      logger.info(`WashTicket API escuchando en el puerto ${env.port}`);
    });
  } catch (error) {
    logger.error("No se pudo iniciar el servidor", {
      message: error instanceof Error ? error.message : "unknown",
    });
    process.exitCode = 1;
  }
}

void start();
