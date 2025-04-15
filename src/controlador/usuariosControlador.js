const bcrypt = require('bcryptjs');
const db = require('../utilidades/db');
const userService=require('../servicios/userServices');
const multer = require("multer");
const path = require("path");

// Logeo
exports.login = async (req, res, next) => {
  try {
      const { usuario, contrasena } = req.body;
      const data = await userService.login(usuario, contrasena);

      // incluir todos los campos necesarios
      res.status(200).json({
          data: {
              id: data.id,
              nombre: data.nombre,          
              usuario: data.usuario,
              rol_id: data.rol_id,
              id_filial: data.id_filial,
              token: data.token,
              rol_nombre: data.rol_nombre,
              filial_nombre: data.filial_nombre,
              foto: data.foto,
          }
      });
  } catch (error) {
      console.error("Error al iniciar sesión:", error.message);
      res.status(401).json({ message: error.message });
  }
};



// Crear nuevo usuario
exports.createUser = async (req, res) => {
  try {
    const { nombre, usuario, contrasena, rol_id, id_filial } = req.body;

    // Verificar que los campos obligatorios estén presentes
    if (!nombre || !usuario || !contrasena || !rol_id) {
      return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }

    // Solo asignar id_filial si el rol es 'Gerente Filial' (rol_id = 1)
    if (rol_id === 1 && !id_filial) {
      return res.status(400).json({ error: 'El rol Gerente Filial requiere asignación de filial' });
    }

    const hashedPassword = await bcrypt.hash(contrasena, 10);

    // Incluir el campo id_filial en la consulta SQL si es necesario
    const query = 'INSERT INTO usuarios (nombre, usuario, contrasena, rol_id, id_filial) VALUES (?, ?, ?, ?, ?)';
    await db.query(query, [nombre, usuario, hashedPassword, rol_id, rol_id === 1 ? id_filial : null]);

    return res.status(201).json({ message: 'Usuario creado exitosamente' });
  } catch (error) {
    return res.status(500).json({ error: 'Error al registrar el usuario', details: error.message });
  }
};

// Obtener todos los usuarios
exports.getUsuarios = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM usuarios');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los usuarios', error });
  }
};

// Obtener un usuario por ID
exports.getusuarioById = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await db.query('SELECT id, nombre, usuario, rol_id FROM usuarios WHERE id = ?', [id]);

    if (result.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    return res.status(200).json(result[0]);
  } catch (error) {
    return res.status(500).json({ error: 'Error al obtener el usuario', details: error.message });
  }
};

// Actualizar usuario
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, usuario, rol_id } = req.body;

    const query = 'UPDATE usuarios SET nombre = ?, usuario = ?, rol_id = ? WHERE id = ?';
    await db.query(query, [nombre, usuario, rol_id, id]);

    return res.status(200).json({ message: 'Usuario actualizado correctamente' });
  } catch (error) {
    return res.status(500).json({ error: 'Error al actualizar el usuario', details: error.message });
  }
};

// Eliminar usuario (cambio de estado)
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const query = 'UPDATE usuarios SET estado = 0 WHERE id = ?';
    await db.query(query, [id]);

    return res.status(200).json({ message: 'Usuario eliminado exitosamente' });
  } catch (error) {
    return res.status(500).json({ error: 'Error al eliminar el usuario', details: error.message });
  }
};

// Configuración para subir imágenes (foto de perfil)
exports.storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../src/imagenes'));  

  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname); 
    const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1E9) + ext;
    cb(null, uniqueName);
  },
});

// Filtro para solo permitir imágenes
exports.fileFilter = (req, file, cb) => {
  const allowed = ["image/jpeg", "image/png", "image/jpg"];
  if (allowed.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Formato de imagen no permitido."), false);
  }
};

exports.upload = multer({
  storage: exports.storage,
  fileFilter: exports.fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } 
}).single('foto'); 
