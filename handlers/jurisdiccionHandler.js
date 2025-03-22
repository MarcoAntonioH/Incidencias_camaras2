const {
    getAllJurisdicciones,
    getJurisdiccion,
    createJurisdiccion,
    updateJurisdiccion,
    deleteJurisdiccion
} = require("../controllers/jurisdiccionController");

// Handler para obtener todas las jurisdicciones con paginación
const getAllJurisdiccionesHandler = async (req, res) => {
    const { page = 1, limit = 20 } = req.query;
    const errores = [];

    if (isNaN(Number(page)) || Number(page) <= 0) errores.push("El 'page' debe ser un número mayor a 0.");
    if (isNaN(Number(limit)) || Number(limit) <= 0) errores.push("El 'limit' debe ser un número mayor a 0.");

    if (errores.length > 0) {
        return res.status(400).json({ message: "Errores de validación", errores });
    }

    try {
        const response = await getAllJurisdicciones(Number(page), Number(limit));

        if (!response || response.data.length === 0) {
            return res.status(200).json({
                message: "No hay jurisdicciones disponibles",
                data: { totalCount: 0, data: [], currentPage: page }
            });
        }

        return res.status(200).json({
            message: "Jurisdicciones obtenidas correctamente",
            data: response,
        });
    } catch (error) {
        console.error("Error al obtener jurisdicciones:", error);
        res.status(500).json({ error: "Error interno del servidor al obtener las jurisdicciones." });
    }
};

// Handler para obtener una jurisdicción por ID
const getJurisdiccionHandler = async (req, res) => {
    const id = Number(req.params.id);

    if (isNaN(id) || id <= 0) {
        return res.status(400).json({ message: "ID inválido" });
    }

    try {
        const jurisdiccion = await getJurisdiccion(id);
        if (!jurisdiccion) {
            return res.status(404).json({ message: "Jurisdicción no encontrada" });
        }

        res.status(200).json(jurisdiccion);
    } catch (error) {
        console.error("Error al obtener jurisdicción:", error);
        res.status(500).json({ error: "Error interno del servidor al obtener la jurisdicción." });
    }
};

// Handler para crear una jurisdicción
const createJurisdiccionHandler = async (req, res) => {
    let { nombre } = req.body;
    const errores = [];

    if (!nombre || typeof nombre !== 'string' || !nombre.trim()) {
        errores.push("El campo 'nombre' es obligatorio y debe ser una cadena de texto válida.");
    } else {
        nombre = nombre.trim();
    }

    if (errores.length > 0) {
        return res.status(400).json({ message: "Se encontraron los siguientes errores", errores });
    }

    try {
        const response = await createJurisdiccion({ nombre });
        if (!response) {
            return res.status(500).json({ message: "Error al crear la jurisdicción" });
        }

        res.status(201).json({
            message: "Jurisdicción creada exitosamente",
            data: response
        });
    } catch (error) {
        console.error("Error al crear jurisdicción:", error);
        res.status(500).json({ error: "Error interno del servidor al crear la jurisdicción." });
    }
};

// Handler para actualizar una jurisdicción
const updateJurisdiccionHandler = async (req, res) => {
    const id = Number(req.params.id);
    let { nombre } = req.body;
    const errores = [];

    if (isNaN(id) || id <= 0) errores.push("El 'id' es inválido.");
    if (nombre !== undefined && (typeof nombre !== 'string' || !nombre.trim())) errores.push("El 'nombre' debe ser una cadena de texto válida.");

    if (nombre) {
        nombre = nombre.trim();
    }

    if (errores.length > 0) {
        return res.status(400).json({ message: "Se encontraron los siguientes errores", errores });
    }

    try {
        const response = await updateJurisdiccion(id, { nombre });
        if (!response) {
            return res.status(404).json({ message: "Jurisdicción no encontrada para actualizar" });
        }

        res.status(200).json({
            message: "Jurisdicción actualizada correctamente",
            data: response
        });
    } catch (error) {
        console.error("Error al actualizar jurisdicción:", error);
        res.status(500).json({ error: "Error interno del servidor al actualizar la jurisdicción." });
    }
};

// Handler para eliminar una jurisdicción (cambia el estado a false)
const deleteJurisdiccionHandler = async (req, res) => {
    const id = Number(req.params.id);

    if (isNaN(id) || id <= 0) {
        return res.status(400).json({ message: "ID inválido" });
    }

    try {
        const response = await deleteJurisdiccion(id);
        if (!response) {
            return res.status(404).json({ message: "Jurisdicción no encontrada para eliminar" });
        }

        res.status(200).json({
            message: "Jurisdicción eliminada exitosamente",
            data: response
        });
    } catch (error) {
        console.error("Error al eliminar jurisdicción:", error);
        res.status(500).json({ error: "Error interno del servidor al eliminar la jurisdicción." });
    }
};

module.exports = {
    getAllJurisdiccionesHandler,
    getJurisdiccionHandler,
    createJurisdiccionHandler,
    updateJurisdiccionHandler,
    deleteJurisdiccionHandler
};
