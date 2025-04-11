const express = require('express');
const router = express.Router();
const filialControlador = require('../controlador/filialControlador');


//Crear filial
/**
 * @swagger
 * /api/filial/create:
 *   post:
 *     summary: Crear una nueva filial
 *     description: Crea una nueva filial proporcionando su nombre.
 *     tags:
 *      - Filiales
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *     responses:
 *       201:
 *         description: Filial creada exitosamente
 *       500:
 *         description: Error al crear la filial
 */
router.post('/create', filialControlador.createFilial);

/**
 * @swagger
 * /api/filial/listar:
 *   get:
 *     summary: Obtener todas las filiales
 *     description: Devuelve una lista con todas las filiales.
 *     tags:
 *      - Filiales
 *     responses:
 *       200:
 *         description: Lista de filiales
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
 *                 example: "Filial Siguatepeque"
 *       500:
 *         description: Error al obtener las filiales
 */
router.get('/listar', filialControlador.getAllFiliales);

/**
 * @swagger
 * /api/filial/get/{id}:
 *   get:
 *     summary: Obtener una filial por ID
 *     description: Devuelve los detalles de una filial especificada por su ID.
 *     tags: 
 *      - Filiales
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la filial
 *         type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Detalles de la filial
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
router.get('/get/:id', filialControlador.getFilialById);


/**
 * @swagger
 * /api/filial/getByNombre/{nombre}:
 *   get:
 *     summary: Obtener una filial por nombre
 *     description: Devuelve los detalles de una filial especificada por su nombre.
 *     tags: 
 *      - Filiales
 *     parameters:
 *       - in: path
 *         name: nombre
 *         required: true
 *         description: Nombre de la filial
 *         type: string
 *     responses:
 *       200:
 *         description: Detalles de la filial
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
router.get('/getByNombre/:nombre', filialControlador.getFilialByNombre);


module.exports = router;
