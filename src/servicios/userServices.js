const jwt = require('jsonwebtoken');
const config=require('../config/config');
const bcrypt=require('bcryptjs');
const pool = require('../utilidades/db');
const User=require('../modelos/usuarioModelo');


// Servicio de login
exports.login = async (usuario, contrasena) => {
    try {
        const user = await User.getByUser(usuario); 

        if (!user) {
            throw new Error("Usuario o contraseña incorrecto");
        }

        if (user.estado === 0) {
            throw new Error("El usuario está inactivo");
        }

        const isMatch = await bcrypt.compare(contrasena, user.contrasena);
        if (!isMatch) {
            throw new Error("Contraseña incorrecta");
        }

        if (user.rol_id === 1 && !user.id_filial) {
            throw new Error("El usuario no tiene filial asignada.");
        }

        // Generar el token JWT
        const token = jwt.sign(
            { id: user.id, nombre: user.nombre, usuario: user.usuario, rol: user.rol_id, filial: user.id_filial },
            process.env.JWT_SECRET,
            { expiresIn: "4h" }
        );

        return {
            id: user.id,
            nombre: user.nombre,        
            usuario: user.usuario,
            rol_id: user.rol_id,
            id_filial: user.id_filial,
            token,
            rol_nombre: user.rol_nombre,
            filial_nombre: user.filial_nombre,
            foto: user.foto,
        };
    } catch (error) {
        console.error("Error en login:", error.message);
        throw new Error(error.message);
    }
};


