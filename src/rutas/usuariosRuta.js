const express = require('express');
const router = express.Router();
const usuariosControlador = require('../controlador/usuariosControlador');
const db = require('../utilidades/db');

/**
 * @swagger
 * tags:
 *   name: Usuarios
 *   
 */


//logear usuario
/**
 * @swagger
 * /api/usuarios/login:
 *   post:
 *     summary: Iniciar sesión
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               usuario:
 *                 type: string
 *               contrasena:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login exitoso, devuelve datos del usuario y token JWT
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       description: El ID del usuario
 *                     nombre:
 *                       type: string
 *                       description: El nombre del usuario
 *                     usuario:
 *                       type: string
 *                       description: El nombre de usuario
 *                     rol_nombre:
 *                       type: string
 *                       description: El nombre del rol del usuario
 *                     rol_id:
 *                       type: integer
 *                       description: El ID del rol
 *                     filial_nombre:
 *                       type: string
 *                       description: El nombre de la filial
 *                     id_filial:
 *                       type: integer
 *                       description: El ID de la filial
 *                     
 *                     token:
 *                       type: string
 *                       description: El token JWT que debe ser usado para autenticar futuras solicitudes
 *       401:
 *         description: Credenciales incorrectas
 *       500:
 *         description: Error del servidor
 */
router.post('/login',  usuariosControlador.login);

//Crear usuario
/**
 * @swagger
 * /api/usuarios/create:
 *   post:
 *     summary: Crear un nuevo usuario
 *     description: Crea un nuevo usuario y asigna un rol. Si el rol es 'Gerente Filial', se requiere asignar una filial.
 *     tags:
 *       - Usuarios
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               usuario:
 *                 type: string
 *               contrasena:
 *                 type: string
 *               rol_id:
 *                 type: integer
 *               id_filial:
 *                 type: integer
 *                 description: "El ID de la filial (obligatorio solo si el rol es 'Gerente Filial')."
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 *       400:
 *         description: El campo 'id_filial' es obligatorio para el rol 'Gerente Filial' o falta algún campo obligatorio.
 *       500:
 *         description: Error al registrar el usuario
 */
router.post('/create', usuariosControlador.createUser);

/**
 * @swagger
 * /api/usuarios/get:
 *   get:
 *     summary: Obtener todos los usuarios
 *     tags: [Usuarios]
 *     responses:
 *       200:
 *         description: Lista de usuarios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: ID del usuario
 *                   nombre:
 *                     type: string
 *                     description: Nombre del usuario
 *                   usuario:
 *                     type: string
 *                     description: Nombre de usuario
 *                   rol_id:
 *                     type: integer
 *                     description: ID del rol asignado
 *                   filial_id:
 *                     type: integer
 *                     description: ID de la filial (puede ser nulo)
 *               example:
 *                 - id: 1
 *                   nombre: "Juan Pérez"
 *                   usuario: "juanperez"
 *                   rol_id: 2
 *                   filial_id: null
 *                 - id: 2
 *                   nombre: "María López"
 *                   usuario: "marialopez"
 *                   rol_id: 1
 *                   filial_id: 3
 *       500:
 *         description: Error al obtener los usuarios
 */
router.get('/get', usuariosControlador.getUsuarios);

/**
 * @swagger
 * /api/usuarios/obtener/{id}:
 *   get:
 *     summary: Obtener un usuario por ID
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error al obtener el usuario
 */
router.get('/obtener/:id', usuariosControlador.getusuarioById);

/**
 * @swagger
 * /api/usuarios/actualizar/{id}:
 *   put:
 *     summary: Actualizar un usuario
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *               - usuario
 *               - rol_id       
 *             properties:
 *               nombre:
 *                 type: string
 *               usuario:
 *                 type: string
 *               rol_id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Usuario actualizado correctamente
 *       500:
 *         description: Error al actualizar el usuario
 */
router.put('/actualizar/:id', usuariosControlador.updateUser);

/**
 * @swagger
 * /api/usuarios/eliminar/{id}:
 *   delete:
 *     summary: Eliminar un usuario
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Usuario eliminado exitosamente
 *       500:
 *         description: Error al eliminar el usuario
 */
router.delete('/eliminar/:id', usuariosControlador.deleteUser);


// Subir foto de perfil
/**
 * @swagger
 * /api/usuarios/subir-foto:
 *   post:
 *     summary: Sube la foto de perfil de un usuario
 *     tags:
 *       - Usuarios
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               foto:
 *                 type: string
 *                 format: binary
 *                 description: Imagen del usuario (.jpg, .jpeg, .png)
 *               id:
 *                 type: integer
 *                 description: ID del usuario
 *     responses:
 *       200:
 *         description: Imagen subida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 filename:
 *                   type: string
 *       400:
 *         description: No se subió ninguna imagen o el formato es incorrecto
 *       404:
 *         description: Usuario no encontrado
 */
router.post('/subir-foto', usuariosControlador.upload, async (req, res) => {
    try {
        const { id } = req.body;
    
        if (!req.file) {
            return res.status(400).json({ error: 'No se subió ninguna imagen' });
        }
    
        // Verificar si el id_usuario está presente
        if (!id) {
            return res.status(400).json({ error: 'Debe proporcionar el ID del usuario' });
        }
    
        // Verificar si el usuario existe y está inactivo (estado = 0)
        const [usuario] = await db.query('SELECT id, estado FROM usuarios WHERE id = ?', [id]);
    
        if (usuario.length === 0) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
    
        if (usuario[0].estado === 0) {
            return res.status(400).json({ error: 'El usuario está inactivo, no se puede subir la imagen' });
        }
    
        const filename = req.file.filename;
    
        // Asociar la foto con el usuario en la BD
        const query = 'UPDATE usuarios SET foto = ? WHERE id = ?';
        await db.query(query, [filename, id]);
    
        res.status(200).json({
            message: 'Imagen subida y asociada correctamente',
            filename,
        });
    } catch (error) {
        res.status(500).json({ error: 'Error al subir la imagen', details: error.message });
    }
    
  });
  

module.exports = router;
