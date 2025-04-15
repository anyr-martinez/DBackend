const mysql = require('mysql2');
const pool = require('../utilidades/db'); 


  const User = {
    // Obtener un usuario por Usuario
    getByUser: async (usuario) => {
        const query = `
            SELECT 
                u.id, 
                u.nombre, 
                u.usuario, 
                u.contrasena, 
                u.rol_id, 
                u.id_filial, 
                u.estado,
                u.foto,
                r.nombre AS rol_nombre,       -- Alias para el nombre del rol
                f.nombre AS filial_nombre     -- Alias para el nombre de la filial
            FROM usuarios u
            JOIN roles r ON u.rol_id = r.id
            LEFT JOIN filiales f ON u.id_filial = f.id  -- Usar LEFT JOIN por si el usuario no tiene filial
            WHERE BINARY u.usuario = ?`;

        // Ejecutar la consulta
        const [rows] = await pool.execute(query, [usuario]);
        return rows[0]; 
    }
};

module.exports = User;
