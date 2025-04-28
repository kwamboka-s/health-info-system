import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Health Information Management System API',
      version: '1.0.0',
      description: 'API documentation for Health Information Management System',
    },
    servers: [
      {
        url: '/api',
        description: 'API Server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./routes/index.ts'],
};

export const specs = swaggerJsdoc(options);
