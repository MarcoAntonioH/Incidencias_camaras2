const { getAllUsuarios, getUsuario, createUsuario, updateUsuario, deleteUsuario } = require("../controllers/usuarioController");

// Obtener todos los usuarios activos
const getAllUsuariosHandler = async (req, res) => {
    try {
        let { page, limit } = req.query;

        // Validaciones de paginación
        page = parseInt(page) || 1;
        limit = parseInt(limit) || 20;

        if (page < 1 || limit < 1) {
            return res.status(400).json({ error: "Los parámetros de paginación deben ser números positivos." });
        }

        const usuarios = await getAllUsuarios(page, limit);
        if (!usuarios) return res.status(404).json({ error: "No se encontraron usuarios activos." });

        res.status(200).json(usuarios);
    } catch (error) {
        console.error("Error en getAllUsuariosHandler:", error);
        res.status(500).json({ error: "Error interno del servidor." });
    }
};

// Obtener un usuario por ID
const getUsuarioHandler = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id || isNaN(id)) {
            return res.status(400).json({ error: "ID inválido." });
        }

        const usuario = await getUsuario(id);
        if (!usuario) return res.status(404).json({ error: "Usuario no encontrado o inactivo." });

        res.status(200).json(usuario);
    } catch (error) {
        console.error("Error en getUsuarioHandler:", error);
        res.status(500).json({ error: "Error interno del servidor." });
    }
};

// Crear un usuario nuevo
const createUsuarioHandler = async (req, res) => {
    try {
        const { nombre, email, password, rol } = req.body;

        // Validaciones de entrada
        if (!nombre || typeof nombre !== "string" || nombre.trim().length < 3) {
            return res.status(400).json({ error: "Nombre inválido. Debe tener al menos 3 caracteres." });
        }

        if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
            return res.status(400).json({ error: "Correo electrónico inválido." });
        }

        if (!password || password.length < 6) {
            return res.status(400).json({ error: "La contraseña debe tener al menos 6 caracteres." });
        }

        if (!rol || typeof rol !== "string") {
            return res.status(400).json({ error: "Rol inválido." });
        }

        const nuevoUsuario = await createUsuario({ nombre, email, password, rol });
        if (!nuevoUsuario) return res.status(500).json({ error: "No se pudo crear el usuario." });

        res.status(201).json(nuevoUsuario);
    } catch (error) {
        console.error("Error en createUsuarioHandler:", error);
        res.status(500).json({ error: "Error interno del servidor." });
    }
};

// Actualizar un usuario
const updateUsuarioHandler = async (req, res) => {
    try {
        const { id } = req.params;
        const datos = req.body;

        if (!id || isNaN(id)) {
            return res.status(400).json({ error: "ID inválido." });
        }

        if (datos.nombre && (typeof datos.nombre !== "string" || datos.nombre.trim().length < 3)) {
            return res.status(400).json({ error: "Nombre inválido." });
        }

        if (datos.email && !/^\S+@\S+\.\S+$/.test(datos.email)) {
            return res.status(400).json({ error: "Correo electrónico inválido." });
        }

        if (datos.password && datos.password.length < 6) {
            return res.status(400).json({ error: "La contraseña debe tener al menos 6 caracteres." });
        }

        const usuarioActualizado = await updateUsuario(id, datos);
        if (!usuarioActualizado) return res.status(404).json({ error: "Usuario no encontrado o inactivo." });

        res.status(200).json(usuarioActualizado);
    } catch (error) {
        console.error("Error en updateUsuarioHandler:", error);
        res.status(500).json({ error: "Error interno del servidor." });
    }
};

// Eliminar un usuario (cambia el estado a false)
const deleteUsuarioHandler = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id || isNaN(id)) {
            return res.status(400).json({ error: "ID inválido." });
        }

        const usuarioEliminado = await deleteUsuario(id);
        if (!usuarioEliminado) return res.status(404).json({ error: "Usuario no encontrado." });

        res.status(200).json({ message: "Usuario eliminado correctamente." });
    } catch (error) {
        console.error("Error en deleteUsuarioHandler:", error);
        res.status(500).json({ error: "Error interno del servidor." });
    }
};

module.exports = {
    getAllUsuariosHandler,
    getUsuarioHandler,
    createUsuarioHandler,
    updateUsuarioHandler,
    deleteUsuarioHandler,
};
