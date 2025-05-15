import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes";
import { errorHandler } from "./middleware/error.middleware";
import { logger } from "./utils/logger";
import publicacionRoutes from "./routes/publicacion.routes";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./docs/swagger";

dotenv.config();

const app = express();

// Middlewares base
app.use(cors());
app.use(express.json());

// Rutas
app.use("/api/auth", authRoutes);
logger.info("Ruta /api/auth cargada");

app.use("/api/posts", publicacionRoutes);
logger.info("Ruta /api/posts cargada");

app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Middleware global para errores
app.use(errorHandler);

// Inicio del servidor
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  logger.info(`Servidor Express iniciado en puerto ${PORT}`);
});