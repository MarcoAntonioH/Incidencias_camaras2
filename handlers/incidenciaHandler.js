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

    if (isNaN(page)) errores.push("El page debe ser un número");
    if (page <= 0) errores.push("El page debe ser mayor a 0");
    if (isNaN(limit)) errores.push("El limit debe ser un número");
    if (limit <= 0) errores.push("El limit debe ser mayor a 0");

    if (errores.length > 0) {
        return res.status(400).json({ errores });
    }

    try {
        const response = await getAllIncidencias(Number(page), Number(limit));

        if (!response || response.data.length === 0) {
            return res.status(200).json({
                message: 'Ya no hay más incidencias',
                data: {
                    data: [],
                    totalPage: Number(page),
                    totalCount: 0
                }
            });
        }

        return res.status(200).json({
            message: "Incidencias obtenidas correctamente",
            data: response,
        });
    } catch (error) {
        console.error("Error al obtener incidencias:", error);
        res.status(500).json({ error: "Error interno del servidor al obtener las incidencias." });
    }
};

// Handler para obtener una incidencia por ID
const getIncidenciaHandler = async (req, res) => {
    const id = req.params.id;

    if (!id || isNaN(id)) {
        return res.status(400).json({ message: "ID inválido" });
    }

    try {
        const incidencia = await getIncidencia(id);
        if (!incidencia) {
            return res.status(404).json({ message: "Incidencia no encontrada" });
        }

        res.status(200).json(incidencia);
    } catch (error) {
        console.error("Error al obtener incidencia:", error);
        res.status(500).json({ error: "Error interno del servidor al obtener la incidencia." });
    }
};

// Handler para crear una incidencia
const createIncidenciaHandler = async (req, res) => {
    const { descripcion, hora, fecha, turno, codigo_Incidencia, id_camara } = req.body;
    const errores = [];

    if (!descripcion || typeof descripcion !== 'string') errores.push("El campo 'descripcion' es obligatorio y debe ser texto.");
    if (!hora || typeof hora !== 'string') errores.push("El campo 'hora' es obligatorio.");
    if (!fecha || typeof fecha !== 'string') errores.push("El campo 'fecha' es obligatorio.");
    if (!turno || !['MAÑANA', 'TARDE', 'NOCHE'].includes(turno)) errores.push("El campo 'turno' debe ser 'MAÑANA', 'TARDE' o 'NOCHE'.");
    if (!codigo_Incidencia || typeof codigo_Incidencia !== 'string') errores.push("El campo 'codigo_Incidencia' es obligatorio y debe ser texto.");
    if (!id_camara || isNaN(id_camara)) errores.push("El campo 'id_camara' es obligatorio y debe ser un número.");

    if (errores.length > 0) {
        return res.status(400).json({ message: "Errores de validación", errores });
    }

    try {
        const response = await createIncidencia({ descripcion, hora, fecha, turno, codigo_Incidencia, id_camara });
        if (!response) {
            return res.status(500).json({ message: "Error al crear la incidencia" });
        }

        res.status(201).json({
            message: "Incidencia creada exitosamente",
            data: response
        });
    } catch (error) {
        console.error("Error al crear incidencia:", error);
        res.status(500).json({ error: "Error interno del servidor al crear la incidencia." });
    }
};

// Handler para actualizar una incidencia
const updateIncidenciaHandler = async (req, res) => {
    const id = req.params.id;
    const { descripcion, hora, fecha, turno, codigo_Incidencia, id_camara } = req.body;
    const errores = [];

    if (!id || isNaN(id)) errores.push("El ID es inválido.");
    if (!descripcion || typeof descripcion !== 'string') errores.push("El campo 'descripcion' es obligatorio y debe ser texto.");
    if (!hora || typeof hora !== 'string') errores.push("El campo 'hora' es obligatorio.");
    if (!fecha || typeof fecha !== 'string') errores.push("El campo 'fecha' es obligatorio.");
    if (!turno || !['MAÑANA', 'TARDE', 'NOCHE'].includes(turno)) errores.push("El campo 'turno' debe ser 'MAÑANA', 'TARDE' o 'NOCHE'.");
    if (!codigo_Incidencia || typeof codigo_Incidencia !== 'string') errores.push("El campo 'codigo_Incidencia' es obligatorio y debe ser texto.");
    if (!id_camara || isNaN(id_camara)) errores.push("El campo 'id_camara' es obligatorio y debe ser un número.");

    if (errores.length > 0) {
        return res.status(400).json({ message: "Errores de validación", errores });
    }

    try {
        const response = await updateIncidencia(id, { descripcion, hora, fecha, turno, codigo_Incidencia, id_camara });
        if (!response) {
            return res.status(404).json({ message: "Incidencia no encontrada para actualizar" });
        }

        res.status(200).json({
            message: "Incidencia actualizada correctamente",
            data: response
        });
    } catch (error) {
        console.error("Error al actualizar incidencia:", error);
        res.status(500).json({ error: "Error interno del servidor al actualizar la incidencia." });
    }
};

// Handler para eliminar una incidencia (cambio de estado)
const deleteIncidenciaHandler = async (req, res) => {
    const id = req.params.id;

    if (!id || isNaN(id)) {
        return res.status(400).json({ message: "ID inválido" });
    }

    try {
        const response = await deleteIncidencia(id);
        if (!response) {
            return res.status(404).json({ message: "Incidencia no encontrada para eliminar" });
        }

        res.status(200).json({
            message: "Incidencia eliminada exitosamente",
            data: response
        });
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
    deleteIncidenciaHandler,
};
