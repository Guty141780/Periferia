import { Router } from "express";
import { obtenerPublicaciones, crearPublicacion, darLike } from "../controllers/publicacion.controller";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Publicaciones
 *   description: Gestión de publicaciones
 */

/**
 * @swagger
 * /posts:
 *   get:
 *     summary: Obtener todas las publicaciones
 *     tags: [Publicaciones]
 *     responses:
 *       200:
 *         description: Lista de publicaciones
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   autor:
 *                     type: string
 *                   contenido:
 *                     type: string
 *                   likes:
 *                     type: integer
 */
router.get("/", obtenerPublicaciones);

/**
 * @swagger
 * /posts:
 *   post:
 *     summary: Crear una nueva publicación
 *     tags: [Publicaciones]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - autor
 *               - contenido
 *             properties:
 *               autor:
 *                 type: string
 *                 example: juan123
 *               contenido:
 *                 type: string
 *                 example: ¡Hola desde Swagger!
 *     responses:
 *       201:
 *         description: Publicación creada correctamente
 *       400:
 *         description: Datos inválidos
 */
router.post("/", crearPublicacion);

/**
 * @swagger
 * /posts/{id}/like:
 *   post:
 *     summary: Dar like a una publicación
 *     tags: [Publicaciones]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la publicación
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Like registrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                 likes:
 *                   type: integer
 *       404:
 *         description: Publicación no encontrada
 */
router.post("/:id/like", darLike);

export default router;