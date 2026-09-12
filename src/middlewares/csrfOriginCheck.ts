import type { NextFunction, Request, Response } from "express";
import { env } from "../config/env";
import { ApiError } from "../utils/ApiError";

const mutatingMethods = new Set(["POST", "PUT", "PATCH", "DELETE"]);

function isAllowedOrigin(originOrReferer: string): boolean {
  try {
    const incoming = new URL(originOrReferer);
    const allowed = new URL(env.frontendUrl);
    return incoming.origin === allowed.origin;
  } catch {
    return false;
  }
}

export function csrfOriginCheck(req: Request, _res: Response, next: NextFunction): void {
  if (!mutatingMethods.has(req.method)) {
    next();
    return;
  }

  if (!req.headers.cookie) {
    next();
    return;
  }

  const origin = req.headers.origin;
  const referer = req.headers.referer;

  if (origin && isAllowedOrigin(origin)) {
    next();
    return;
  }

  if (!origin && referer && isAllowedOrigin(referer)) {
    next();
    return;
  }

  next(new ApiError(403, "CSRF_ORIGIN_INVALID", "Origen de la solicitud no permitido"));
}
