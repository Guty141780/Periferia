import swaggerJSDoc from "swagger-jsdoc";

const isProd = process.env.NODE_ENV === "production";

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API - Red Social",
      version: "1.0.0",
      description: "Documentación de la API para la red social",
    },
    servers: [
      {
        url: "http://localhost:4000/api",
      },
    ],
  },
  apis: isProd
    ? ["./dist/src/routes/*.js", "./dist/src/controllers/*.js"]
    : ["./src/routes/*.ts", "./src/controllers/*.ts"],
};

export const swaggerSpec = swaggerJSDoc(options);