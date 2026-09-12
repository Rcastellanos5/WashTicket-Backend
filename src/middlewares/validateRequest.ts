import type { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { ApiError } from "../utils/ApiError";

export function validateRequest(req: Request, _res: Response, next: NextFunction): void {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    next(new ApiError(422, "VALIDATION_ERROR", "Los datos enviados no son válidos"));
    return;
  }

  next();
}
