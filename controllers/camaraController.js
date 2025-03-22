const { Camara } = require("../db_connection");

// Obtener todas las cámaras activas con paginación
const getAllCamaras = async (page = 1, limit = 20) => {
    const offset = (page - 1) * limit;
    try {
        const response = await Camara.findAndCountAll({
            where: { state: true },
            limit,
            offset,
            order: [["id", "ASC"]],
        });
        return {
            totalCount: response.count,
            data: response.rows,
            currentPage: page,
        } || null;
    } catch (error) {
        console.error("Error en el controlador al traer todas las Cámaras:", error);
        return false;
    }
};

// Obtener una cámara por ID
const getCamara = async (id) => {
    try {
        const response = await Camara.findOne({ where: { id, state: true } });
        return response || null;
    } catch (error) {
        console.error("Error en el controlador al traer la Cámara:", error);
        return false;
    }
};

// Crear una nueva cámara
const createCamara = async ({ nombre, ubicacion, id_Jurisdiccion }) => {
    try {
        const response = await Camara.create({ nombre, ubicacion, id_Jurisdiccion, state: true });
        return response || null;
    } catch (error) {
        console.error("Error en el controlador al crear la Cámara:", error);
        return false;
    }
};

// Actualizar una cámara
const updateCamara = async (id, datos) => {
    try {
        const camara = await getCamara(id);
        if (camara) await camara.update(datos);
        return camara || null;
    } catch (error) {
        console.error("Error al modificar la Cámara en el controlador:", error);
        return false;
    }
};

// Borrado lógico de una cámara
const deleteCamara = async (id) => {
    try {
        const camara = await Camara.findByPk(id);
        if (!camara) return null;

        camara.state = false;
        await camara.save();
        return camara;
    } catch (error) {
        console.error("Error al eliminar la Cámara:", error);
        return false;
    }
};

module.exports = {
    getAllCamaras,
    getCamara,
    createCamara,
    updateCamara,
    deleteCamara,
};
