const {
    getAllCamaras,
    getCamara,
    createCamara,
    updateCamara,
    deleteCamara
} = require("../controllers/camaraController");

// Handler para obtener todas las cámaras
const getAllCamarasHandler = async (req, res) => {
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
        const response = await getAllCamaras(Number(page), Number(limit));

        if (!response || response.data.length === 0) {
            return res.status(200).json({
                message: 'Ya no hay más cámaras',
                data: {
                    data: [],
                    totalPage: Number(page),
                    totalCount: 0
                }
            });
        }

        return res.status(200).json({
            message: "Cámaras obtenidas correctamente",
            data: response,
        });
    } catch (error) {
        console.error("Error al obtener cámaras:", error);
        res.status(500).json({ error: "Error interno del servidor al obtener las cámaras." });
    }
};
                                           
// Handler para obtener una cámara por ID
const getCamaraHandler = async (req, res) => {
    const id = req.params.id;

    if (!id || isNaN(id)) {
        return res.status(400).json({ message: "ID inválido" });
    }

    try {
        const camara = await getCamara(id);
        if (!camara) {
            return res.status(404).json({ message: "Cámara no encontrada" });
        }

        res.status(200).json(camara);
    } catch (error) {
        console.error("Error al obtener cámara:", error);
        res.status(500).json({ error: "Error interno del servidor al obtener la cámara." });
    }
};

// Handler para crear una cámara
const createCamaraHandler = async (req, res) => {
    const { nombre, ubicacion, id_Jurisdiccion } = req.body;
    const errores = [];

    if (!nombre || typeof nombre !== 'string') errores.push("El campo 'nombre' es obligatorio y debe ser texto.");
    if (!ubicacion || typeof ubicacion !== 'string') errores.push("El campo 'ubicacion' es obligatorio y debe ser texto.");
    if (!id_Jurisdiccion || isNaN(id_Jurisdiccion)) errores.push("El campo 'id_Jurisdiccion' es obligatorio y debe ser un número.");

    if (errores.length > 0) {
        return res.status(400).json({ message: "Errores de validación", errores });
    }

    try {
        const response = await createCamara({ nombre, ubicacion, id_Jurisdiccion });
        if (!response) {
            return res.status(500).json({ message: "Error al crear la cámara" });
        }

        res.status(201).json({
            message: "Cámara creada exitosamente",
            data: response
        });
    } catch (error) {
        console.error("Error al crear cámara:", error);
        res.status(500).json({ error: "Error interno del servidor al crear la cámara." });
    }
};

// Handler para actualizar una cámara
const updateCamaraHandler = async (req, res) => {
    const id = req.params.id;
    const { nombre, ubicacion, id_Jurisdiccion } = req.body;
    const errores = [];

    if (!id || isNaN(id)) errores.push("ID inválido.");
    if (!nombre || typeof nombre !== 'string') errores.push("El campo 'nombre' es obligatorio y debe ser texto.");
    if (!ubicacion || typeof ubicacion !== 'string') errores.push("El campo 'ubicacion' es obligatorio y debe ser texto.");
    if (!id_Jurisdiccion || isNaN(id_Jurisdiccion)) errores.push("El campo 'id_Jurisdiccion' es obligatorio y debe ser un número.");

    if (errores.length > 0) {
        return res.status(400).json({ message: "Errores de validación", errores });
    }

    try {
        const response = await updateCamara(id, { nombre, ubicacion, id_Jurisdiccion });
        if (!response) {
            return res.status(404).json({ message: "Cámara no encontrada para actualizar" });
        }

        res.status(200).json({
            message: "Cámara actualizada correctamente",
            data: response
        });
    } catch (error) {
        console.error("Error al actualizar cámara:", error);
        res.status(500).json({ error: "Error interno del servidor al actualizar la cámara." });
    }
};

// Handler para eliminar una cámara (borrado lógico)
const deleteCamaraHandler = async (req, res) => {
    const id = req.params.id;

    if (!id || isNaN(id)) {
        return res.status(400).json({ message: "ID inválido" });
    }

    try {
        const response = await deleteCamara(id);
        if (!response) {
            return res.status(404).json({ message: "Cámara no encontrada para eliminar" });
        }

        res.status(200).json({
            message: "Cámara eliminada exitosamente",
            data: response
        });
    } catch (error) {
        console.error("Error al eliminar cámara:", error);
        res.status(500).json({ error: "Error interno del servidor al eliminar la cámara." });
    }
};

module.exports = {
    getAllCamarasHandler,
    getCamaraHandler,
    createCamaraHandler,
    updateCamaraHandler,
    deleteCamaraHandler,
};
