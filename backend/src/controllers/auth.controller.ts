import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { users } from "../models/user.model";
import { logger } from "../utils/logger";

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { alias, password } = req.body;

  logger.info("Intento de login", { alias });

  const user = users.find(u => u.alias === alias);
  if (!user) {
    logger.warn("Usuario no encontrado", alias);
    res.status(401).json({ error: "Usuario no encontrado" });
    return;
  }

  try {
    const validPassword = await bcrypt.compare(password, user.password);
    logger.info("¿Contraseña válida?", { resultado: validPassword });

    if (!validPassword) {
      logger.warn("Contraseña incorrecta para alias", alias);
      res.status(401).json({ error: "Contraseña incorrecta" });
      return;
    }

    const token = jwt.sign(
      { id: user.id, alias: user.alias },
      process.env.JWT_SECRET!,
      { expiresIn: "1h" }
    );

    logger.info("Login exitoso", alias);
    res.json({ token, alias: user.alias });
  } catch (error) {
    logger.error("Error inesperado en login", error);
    next(error);
  }
};