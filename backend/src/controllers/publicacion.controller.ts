import { Request, Response, NextFunction } from "express";
import { logger } from "../utils/logger";
import { prisma } from "../config/prisma";

// GET /api/posts
export const obtenerPublicaciones = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const publicaciones = await prisma.publicacion.findMany({
      orderBy: { id: "desc" }
    });

    logger.info("Solicitud GET - Listar publicaciones", { total: publicaciones.length });
    res.json(publicaciones);
  } catch (error) {
    logger.error("Error al obtener publicaciones", error);
    next(error);
  }
};

// POST /api/posts
export const crearPublicacion = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { autor, contenido } = req.body;

    if (!autor || !contenido) {
      logger.warn("Crear publicación fallida: campos faltantes", { autor, contenido });
      res.status(400).json({ error: "Faltan campos obligatorios" });
      return;
    }

    const nueva = await prisma.publicacion.create({
      data: {
        autor,
        contenido,
        likes: 0
      }
    });

    logger.info("Publicación creada correctamente", nueva);
    res.status(201).json(nueva);
  } catch (error) {
    logger.error("Error al crear publicación", error);
    next(error);
  }
};

// POST /api/posts/:id/like
export const darLike = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = parseInt(req.params.id);

    const pub = await prisma.publicacion.findUnique({ where: { id } });

    if (!pub) {
      logger.warn("Like fallido: publicación no encontrada", { id });
      res.status(404).json({ error: "Publicación no encontrada" });
      return;
    }

    const actualizada = await prisma.publicacion.update({
      where: { id },
      data: { likes: { increment: 1 } }
    });

    logger.info("Like registrado correctamente", { id, likes: actualizada.likes });
    res.json({ mensaje: "Like añadido", likes: actualizada.likes });
  } catch (error) {
    logger.error("Error al registrar like", error);
    next(error);
  }
};