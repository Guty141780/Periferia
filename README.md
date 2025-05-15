# 🧑‍🤝Red Social Full Stack - Periferia

Este proyecto es una red social básica desarrollada como parte de una prueba técnica. Permite a los usuarios autenticarse, crear publicaciones y dar likes, todo bajo una arquitectura moderna basada en microservicios y contenedores.

## Tecnologías Utilizadas

- **Frontend:** React + TypeScript
- **Backend:** Express + TypeScript
- **ORM:** Prisma
- **Base de Datos:** PostgreSQL
- **Autenticación:** JWT
- **Documentación:** Swagger
- **Orquestación:** Docker & Docker Compose
- **Logger:** Personalizado con formato estructurado

## Estructura del Proyecto

```
/Periferia
├── backend
│   ├── src
│   ├── prisma
│   ├── .env
│   └── Dockerfile
├── frontend
│   ├── src
│   ├── public
│   ├── .env.production
│   └── Dockerfile
├── docker-compose.yml
└── README.md
```

## Configuración Local

1. Clona el repositorio:
   ```bash
   git clone https://github.com/Guty141780/Periferia.git
   
   ```

2. Configura los entornos:

   - **backend/.env**
     ```
     PORT=4000
     JWT_SECRET=secreto_super_seguro
     DATABASE_URL=postgresql://usuario:clave123@localhost:5432/publicaciones_db
     ```

   - **frontend/.env**
     ```
     REACT_APP_API_URL=http://localhost:4000/api
     ```

3. Instala dependencias:
   ```bash
   cd backend && npm install
   cd ../frontend && npm install
   ```

4. Ejecuta Prisma localmente:
   ```bash
   cd backend
   npx prisma migrate dev
   npm run prisma-seed
   ```

5. Levanta ambos servicios:
   ```bash
   # Terminal 1
   cd backend && npm run dev

   # Terminal 2
   cd frontend && npm start
   ```

## Uso con Docker

### Construir e iniciar

```bash
docker compose up --build
```

> Esto levanta:
> - PostgreSQL en el puerto `5432`
> - Backend (Express) en el puerto `4000`
> - Frontend (React + Nginx) en el puerto `3000`

### Apagar

```bash
docker compose down -v --remove-orphans
```

## Usuario de Prueba

```json
{
  "alias": "juan123",
  "password": "123456"
}
```

## Endpoints principales

| Método | Ruta                     | Descripción               |
|--------|--------------------------|---------------------------|
| POST   | `/api/auth/login`        | Inicia sesión             |
| GET    | `/api/posts`             | Lista publicaciones       |
| POST   | `/api/posts`             | Crea nueva publicación    |
| POST   | `/api/posts/:id/like`    | Agrega un like            |

## Documentación Swagger

Disponible en:  
[http://localhost:4000/api/docs](http://localhost:4000/api/docs)
