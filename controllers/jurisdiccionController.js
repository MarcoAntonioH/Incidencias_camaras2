const { Jurisdiccion } = require("../db.connection");

// Obtener todas las jurisdicciones (solo activas)
const getAllJurisdicciones = async (page = 1, limit = 20) => {
    const offset = (page - 1) * limit;
    try {
        const response = await Jurisdiccion.findAndCountAll({
            where: { state: true },
            limit,
            offset,
            order: [["id", "ASC"]],
        });
        return { totalCount: response.count, data: response.rows, currentPage: page } || null;
    } catch (error) {
        console.error("Error en el controlador al traer todas las Jurisdicciones:", error);
        return false;
    }
};

// Obtener una jurisdicción por ID (solo si está activa)
const getJurisdiccion = async (id) => {
    try {
        const response = await Jurisdiccion.findOne({ where: { id, state: true } });
        return response || null;
    } catch (error) {
        console.error("Error en el controlador al traer la Jurisdicción:", error);
        return false;
    }
};

// Crear una nueva jurisdicción
const createJurisdiccion = async ({ nombre }) => {
    try {
        const response = await Jurisdiccion.create({ nombre, state: true });
        return response || null;
    } catch (error) {
        console.error("Error en el controlador al crear la Jurisdicción:", error);
        return false;
    }
};

// Actualizar una jurisdicción
const updateJurisdiccion = async (id, datos) => {
    try {
        const jurisdiccion = await getJurisdiccion(id);
        if (jurisdiccion) await jurisdiccion.update(datos);
        return jurisdiccion || null;
    } catch (error) {
        console.error("Error al modificar la Jurisdicción en el controlador:", error);
        return false;
    }
};

// Eliminar una jurisdicción (cambia el estado a false en lugar de eliminar)
const deleteJurisdiccion = async (id) => {
    try {
        const jurisdiccion = await Jurisdiccion.findByPk(id);

        if (!jurisdiccion) {
            console.error("Jurisdicción no encontrada");
            return null;
        }

        jurisdiccion.state = false;
        await jurisdiccion.save();
        return jurisdiccion;
    } catch (error) {
        console.error("Error al eliminar la Jurisdicción:", error);
        return false;
    }
};

module.exports = {
    getAllJurisdicciones,
    getJurisdiccion,
    createJurisdiccion,
    updateJurisdiccion,
    deleteJurisdiccion,
};
