import { Request, Response, NextFunction } from "express";
import { logger } from "../utils/logger";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error("Error no controlado", {
    message: err.message,
    stack: err.stack
  });

  res.status(500).json({ error: "Error interno del servidor" });
};