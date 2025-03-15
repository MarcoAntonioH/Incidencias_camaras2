const argon2 = require("argon2");
const { Usuario } = require("../db.connection");

// Obtener todos los usuarios (solo activos)
const getAllUsuarios = async (page = 1, limit = 20) => {
    const offset = (page - 1) * limit;
    try {
        const response = await Usuario.findAndCountAll({
            where: { state: true },
            limit,
            offset,
            order: [["id", "ASC"]],
        });
        return { totalCount: response.count, data: response.rows, currentPage: page } || null;
    } catch (error) {
        console.error("Error en el controlador al traer todos los Usuarios:", error);
        return false;
    }
};

// Obtener un usuario por ID (solo si está activo)
const getUsuario = async (id) => {
    try {
        const response = await Usuario.findOne({ where: { id, state: true } });
        return response || null;
    } catch (error) {
        console.error("Error en el controlador al traer el Usuario:", error);
        return false;
    }
};

// Crear un nuevo usuario con contraseña hasheada
const createUsuario = async ({ nombre, email, password, rol }) => {
    try {
        const hashedPassword = await argon2.hash(password);
        const response = await Usuario.create({ nombre, email, password: hashedPassword, rol, state: true });
        return response || null;
    } catch (error) {
        console.error("Error en el controlador al crear el Usuario:", error);
        return false;
    }
};

// Verificar la contraseña del usuario
const verifyUsuario = async (email, password) => {
    try {
        const usuario = await Usuario.findOne({ where: { email, state: true } });
        if (!usuario) return null;

        const isValid = await argon2.verify(usuario.password, password);
        return isValid ? usuario : null;
    } catch (error) {
        console.error("Error al verificar el Usuario:", error);
        return false;
    }
};

// Actualizar un usuario (sin modificar la contraseña directamente)
const updateUsuario = async (id, datos) => {
    try {
        const usuario = await getUsuario(id);
        if (!usuario) return null;

        // Si se quiere actualizar la contraseña, se debe hashear primero
        if (datos.password) {
            datos.password = await argon2.hash(datos.password);
        }
        
        await usuario.update(datos);
        return usuario;
    } catch (error) {
        console.error("Error al modificar el Usuario en el controlador:", error);
        return false;
    }
};

// Eliminar un usuario (cambia el estado a false en lugar de eliminar)
const deleteUsuario = async (id) => {
    try {
        const usuario = await Usuario.findByPk(id);

        if (!usuario) {
            console.error("Usuario no encontrado");
            return null;
        }

        usuario.state = false;
        await usuario.save();
        return usuario;
    } catch (error) {
        console.error("Error al eliminar el Usuario:", error);
        return false;
    }
};

module.exports = {
    getAllUsuarios,
    getUsuario,
    createUsuario,
    verifyUsuario,
    updateUsuario,
    deleteUsuario,
};
