-- CreateTable
CREATE TABLE "Publicacion" (
    "id" SERIAL NOT NULL,
    "autor" TEXT NOT NULL,
    "contenido" TEXT NOT NULL,
    "likes" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Publicacion_pkey" PRIMARY KEY ("id")
);
