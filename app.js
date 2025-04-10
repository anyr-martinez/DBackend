const express = require('express');
const cors = require('cors');
const dashboardRoutes = require('./src/rutas/dashboardRutas');
const usuariosRuta  = require('./src/rutas/usuariosRuta');
const rolesRutas = require('./src/rutas/rolesRutas');
const filialRutas = require('./src/rutas/filialesRutas');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const bodyParser = require('body-parser');


const app = express();


// Configuración de CORS y body parser
app.use(cors({
    origin: ['http://localhost:4000', 'http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['Content-Disposition'] // Permite descargar archivos PDF 
  }));
  
app.use(bodyParser.json());


app.use(cors());
app.use(express.json());

app.use('/api/dashboards', dashboardRoutes);

// Opciones para generar la documentación de Swagger con JSDoc
const swaggerOptions = {
    definition: {
      openapi: '3.0.0', // Versión de OpenAPI
      info: {
        title: 'API DE GESTION DE DASHBOARD TI',
        version: '1.0.0',
        description: 'Documentación para la API de manejo de Dashboards.)',
      },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    security: [{
      bearerAuth: []
    }],  
  },
    apis: ['./src/rutas/*.js', './src/controlador/*.js'], // Archivos que contienen las rutas y controladores
};

// Generar la documentación Swagger
const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Ruta para mostrar la documentación Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  
//Rutas
app.use('/api/usuarios',usuariosRuta);
app.use('/api/roles', rolesRutas);
app.use('/api/filial', filialRutas);
//Conexion
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en el puerto ${PORT}`);
  console.log('Accede a la documentación de Swagger en http://localhost:4000/api-docs');
});


