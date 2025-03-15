const {
    getAllIncidencias,
    getIncidencia,
    createIncidencia,
    updateIncidencia,
    deleteIncidencia
} = require("../controllers/incidenciaController");

// Handler para obtener todas las incidencias
const getAllIncidenciasHandler = async (req, res) => {
    const { page = 1, limit = 20 } = req.query;
    const errores = [];

    if (isNaN(page) || page <= 0) errores.push("El page debe ser un número mayor a 0");
    if (isNaN(limit) || limit <= 0) errores.push("El limit debe ser un número mayor a 0");

    if (errores.length > 0) return res.status(400).json({ errores });

    try {
        const response = await getAllIncidencias(Number(page), Number(limit));
        return res.status(200).json({ message: "Incidencias obtenidas correctamente", data: response });
    } catch (error) {
        console.error("Error al obtener incidencias:", error);
        res.status(500).json({ error: "Error interno del servidor al obtener las incidencias." });
    }
};

// Handler para obtener una incidencia por ID
const getIncidenciaHandler = async (req, res) => {
    const { id } = req.params;

    if (!id) return res.status(400).json({ message: "ID inválido" });

    try {
        const incidencia = await getIncidencia(id);
        if (!incidencia) return res.status(404).json({ message: "Incidencia no encontrada" });
        res.status(200).json(incidencia);
    } catch (error) {
        console.error("Error al obtener incidencia:", error);
        res.status(500).json({ error: "Error interno del servidor al obtener la incidencia." });
    }
};

// Handler para crear una incidencia
const createIncidenciaHandler = async (req, res) => {
    const { descripcion, hora, id_codigo, id_camara, id_turno, id_usuario } = req.body;
    const errores = [];

    if (!descripcion || typeof descripcion !== "string") errores.push("El campo descripcion es requerido y debe ser una cadena de texto");
    if (!hora || !/^\d{2}:\d{2}:\d{2}$/.test(hora)) errores.push("El campo hora es requerido y debe tener formato HH:MM:SS");
    if (id_codigo && isNaN(id_codigo)) errores.push("El campo id_codigo debe ser un número");
    if (id_camara && isNaN(id_camara)) errores.push("El campo id_camara debe ser un número");
    if (id_turno && isNaN(id_turno)) errores.push("El campo id_turno debe ser un número");
    if (id_usuario && isNaN(id_usuario)) errores.push("El campo id_usuario debe ser un número");

    if (errores.length > 0) return res.status(400).json({ errores });

    try {
        const response = await createIncidencia({ descripcion, hora, id_codigo, id_camara, id_turno, id_usuario });
        res.status(201).json({ message: "Incidencia creada exitosamente", data: response });
    } catch (error) {
        console.error("Error al crear incidencia:", error);
        res.status(500).json({ error: "Error interno del servidor al crear la incidencia." });
    }
};

// Handler para actualizar una incidencia
const updateIncidenciaHandler = async (req, res) => {
    const { id } = req.params;
    const { descripcion, hora, id_codigo, id_camara, id_turno, id_usuario } = req.body;
    const errores = [];

    if (!id) errores.push("El campo ID es inválido");
    if (descripcion && typeof descripcion !== "string") errores.push("El campo descripcion debe ser una cadena de texto");
    if (hora && !/^\d{2}:\d{2}:\d{2}$/.test(hora)) errores.push("El campo hora debe tener formato HH:MM:SS");
    if (id_codigo && isNaN(id_codigo)) errores.push("El campo id_codigo debe ser un número");
    if (id_camara && isNaN(id_camara)) errores.push("El campo id_camara debe ser un número");
    if (id_turno && isNaN(id_turno)) errores.push("El campo id_turno debe ser un número");
    if (id_usuario && isNaN(id_usuario)) errores.push("El campo id_usuario debe ser un número");

    if (errores.length > 0) return res.status(400).json({ errores });

    try {
        const response = await updateIncidencia(id, { descripcion, hora, id_codigo, id_camara, id_turno, id_usuario });
        if (!response) return res.status(404).json({ message: "Incidencia no encontrada para actualizar" });
        res.status(200).json({ message: "Incidencia actualizada correctamente", data: response });
    } catch (error) {
        console.error("Error al actualizar incidencia:", error);
        res.status(500).json({ error: "Error interno del servidor al actualizar la incidencia." });
    }
};

// Handler para eliminar una incidencia (cambia el estado a false en lugar de eliminar)
const deleteIncidenciaHandler = async (req, res) => {
    const { id } = req.params;

    if (!id) return res.status(400).json({ message: "ID inválido" });

    try {
        const response = await deleteIncidencia(id);
        if (!response) return res.status(404).json({ message: "Incidencia no encontrada para eliminar" });
        res.status(200).json({ message: "Incidencia eliminada exitosamente", data: response });
    } catch (error) {
        console.error("Error al eliminar incidencia:", error);
        res.status(500).json({ error: "Error interno del servidor al eliminar la incidencia." });
    }
};

module.exports = {
    getAllIncidenciasHandler,
    getIncidenciaHandler,
    createIncidenciaHandler,
    updateIncidenciaHandler,
    deleteIncidenciaHandler
};