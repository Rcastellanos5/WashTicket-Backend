import type { Request, Response } from "express";
import { sequelize } from "../config/database";

export async function getHealth(_req: Request, res: Response): Promise<void> {
  try {
    await sequelize.authenticate();
    res.status(200).json({
      success: true,
      message: "WashTicket API en ejecución",
      data: { status: "ok", database: "up" },
    });
  } catch {
    res.status(503).json({
      success: false,
      message: "WashTicket API en ejecución, pero PostgreSQL no está disponible",
      error: "DATABASE_UNAVAILABLE",
      data: { status: "degraded", database: "down" },
    });
  }
}
