import { logger } from "./logger";
import { WashLocation } from "../models/WashLocation";

export async function seedDevelopmentData(): Promise<void> {
  const [location, created] = await WashLocation.findOrCreate({
    where: { name: "Lavadero principal" },
    defaults: {
      name: "Lavadero principal",
      address: "Por definir",
      phone: "Por definir",
      email: "admin@washticket.local",
      timezone: "America/Bogota",
      modificationLimitMinutes: 60,
      cancellationLimitMinutes: 60,
      active: true,
    },
  });

  logger.info(created ? "WashLocation semilla creada" : "WashLocation semilla ya existía", {
    washLocationId: location.id,
  });
}
