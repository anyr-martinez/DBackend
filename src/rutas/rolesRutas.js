const express = require('express');
const router = express.Router();
const rolesControlador = require('../controlador/rolesControlador');

/**
 * @swagger
 * /api/roles/obtener:
 *   get:
 *     summary: Obtener todos los roles
 *     description: Devuelve una lista de todos los roles existentes.
 *     tags:
 *      - Roles
 *     responses:
 *       200:
 *         description: Lista de roles
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 example: 1
 *               nombre:
 *                 type: string
 *                 example: "Administrador"
 *       500:
 *         description: Error al obtener roles
 */
router.get('/obtener', rolesControlador.getRoles);

/**
 * @swagger
 * /api/roles/create:
 *   post:
 *     summary: Crear un nuevo rol
 *     tags: [Roles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: Administrador
 *     responses:
 *       201:
 *         description: Rol creado exitosamente
 *       400:
 *         description: Datos faltantes
 *       500:
 *         description: Error del servidor
 */
router.post('/create', rolesControlador.createRole);

/**
 * @swagger
 * /api/roles/get/{id}:
 *   get:
 *     summary: Obtener un rol  por ID
 *     description: Devuelve los detalles de una filial especificada por su ID.
 *     tags: 
 *      - Roles
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del rol
 *         type: integer
 *     responses:
 *       200:
 *         description: Detalles del rol
 *         schema:
 *           type: object
 *           properties:
 *             id:
 *               type: integer
 *               example: 1
 *             nombre:
 *               type: string
 *               example: "Filial Siguatepeque"
 *       404:
 *         description: Filial no encontrada
 *       500:
 *         description: Error al obtener la filial
 */
router.get('/get/:id', rolesControlador.getRolById);

module.exports = router;
