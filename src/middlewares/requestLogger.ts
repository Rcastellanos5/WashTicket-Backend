import type { NextFunction, Request, Response } from "express";
import { randomUUID } from "node:crypto";
import { logger } from "../config/logger";

declare module "express-serve-static-core" {
  interface Request {
    requestId?: string;
  }
}

export function requestLogger(req: Request, res: Response, next: NextFunction): void {
  req.requestId = randomUUID();

  res.on("finish", () => {
    logger.info("solicitud", {
      requestId: req.requestId,
      method: req.method,
      path: req.path,
      statusCode: res.statusCode,
    });
  });

  next();
}
