const db = require('../utilidades/db');

// Crear nueva filial
exports.createFilial = async (req, res) => {
    try {
        const { nombre } = req.body;
        if (!nombre) {
            return res.status(400).json({ message: 'El nombre de la filial es requerido' });
        }

        // Aquí debes utilizar el mismo patrón de query que en el controlador de roles
        const [resultado] = await db.query('INSERT INTO filiales (nombre) VALUES (?)', [nombre]);

        res.status(201).json({ message: 'Filial creada exitosamente', id: resultado.insertId });
    } catch (error) {
        console.error('Error al crear la filial:', error);
        res.status(500).json({ message: 'Error al crear la filial', error: error.message });
    }
};

// Obtener todas las filiales
exports.getAllFiliales = async (req, res) => {
    try {
      const [rows] = await db.query('SELECT * FROM filiales');
      res.json(rows);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener las filiales', error });
    }
  };


// Obtener una filial por ID
exports.getFilialById = async (req, res) => {
    try {
      const { id } = req.params;
  
      const [result] = await db.query('SELECT id, nombre FROM filiales WHERE id = ?', [id]);
  
      if (result.length === 0) {
        return res.status(404).json({ message: 'Filial no encontrada' });
      }
  
      return res.status(200).json(result[0]);
    } catch (error) {
      return res.status(500).json({ error: 'Error al obtener la filial', details: error.message });
    }
  };

  // Obtener una filial por nombre
exports.getFilialByNombre = async (req, res) => {
  try {
    const { nombre } = req.params;

    const [result] = await db.query('SELECT id, nombre FROM filiales WHERE nombre = ?', [nombre]);

    if (result.length === 0) {
      return res.status(404).json({ message: 'Filial no encontrada' });
    }

    return res.status(200).json(result[0]);
  } catch (error) {
    return res.status(500).json({ error: 'Error al obtener la filial por nombre', details: error.message });
  }
};

  


