const db = require('../utilidades/db');

// Obtener todos los roles
exports.getRoles = async (req, res) => {
    try {
      const [rows] = await db.query('SELECT * FROM roles');
      res.json(rows);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener los roles', error });
    }
  };


// Crear un nuevo rol
exports.createRole = async (req, res) => {
    try {
      const { nombre } = req.body;
      if (!nombre) {
        return res.status(400).json({ message: 'El nombre del rol es requerido' });
      }
  
      const [resultado] = await db.query('INSERT INTO roles (nombre) VALUES (?)', [nombre]);
      res.status(201).json({ message: 'Rol creado correctamente', id: resultado.insertId });
    } catch (error) {
      console.error('Error al crear rol:', error);
      res.status(500).json({ message: 'Error del servidor' });
    }
  };

  // Obtener una rol por ID
exports.getRolById = async (req, res) => {
    try {
      const { id } = req.params;
  
      const [result] = await db.query('SELECT id, nombre FROM roles WHERE id = ?', [id]);
  
      if (result.length === 0) {
        return res.status(404).json({ message: 'Rol no encontrada' });
      }
  
      return res.status(200).json(result[0]);
    } catch (error) {
      return res.status(500).json({ error: 'Error al obtener el rol', details: error.message });
    }
  };
  
