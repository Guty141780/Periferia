import { PrismaClient } from "@prisma/client";
import { logger } from "../src/utils/logger"; // Asegúrate que la ruta sea correcta

const prisma = new PrismaClient();

async function main() {
  logger.info("Iniciando seeding de publicaciones...");

  await prisma.publicacion.createMany({
    data: [
      {
        autor: "juan123",
        contenido: "Mi primera publicación en Prisma",
        likes: 3
      },
      {
        autor: "ana456",
        contenido: "¡Hola desde la base de datos!",
        likes: 1
      },
      {
        autor: "mario789",
        contenido: "¡Qué gran día para programar!",
        likes: 0
      }
    ],
    skipDuplicates: true // Evita error si ya existen
  });

  logger.info("Seeding completado exitosamente con publicaciones");
}

main()
  .catch((error) => {
    logger.error("Error durante el seeding", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    logger.info("Conexión Prisma cerrada");
  });