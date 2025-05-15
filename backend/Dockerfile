# Etapa 1: Build de TypeScript y dependencias
FROM node:18-alpine AS builder

WORKDIR /app

# Instala TODAS las dependencias (incluyendo dev)
COPY package*.json ./
RUN npm install

# Copia el código fuente
COPY . .

# Generar Prisma Client e interfaces
RUN npx prisma generate

# Transpila TypeScript a JavaScript
RUN npm run build

# Etapa 2: Imagen final de producción
FROM node:18-alpine

WORKDIR /app

# Solo copiamos node_modules de builder que ya tiene ts-node y prisma
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/package*.json ./

# Prisma requiere su cliente generado y variables de entorno
ENV NODE_ENV=production

# Ejecutamos migraciones, seed, y luego backend
CMD sh -c "npx prisma migrate deploy && npm run prisma-seed && node dist/src/index.js"