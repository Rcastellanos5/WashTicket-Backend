import type { NextFunction, Request, Response } from "express";
import { logger } from "../config/logger";
import { ApiError } from "../utils/ApiError";

export function notFoundHandler(_req: Request, res: Response): void {
  res.status(404).json({
    success: false,
    message: "Recurso no encontrado",
    error: "NOT_FOUND",
  });
}

export function errorHandler(
  error: unknown,
  req: Request,
  res: Response,
  _next: NextFunction,
): void {
  if (error instanceof ApiError) {
    res.status(error.statusCode).json({
      success: false,
      message: error.message,
      error: error.errorCode,
    });
    return;
  }

  logger.error("Error no controlado", {
    path: req.path,
    method: req.method,
    requestId: req.requestId,
  });

  res.status(500).json({
    success: false,
    message: "Error interno del servidor",
    error: "INTERNAL_ERROR",
  });
}
