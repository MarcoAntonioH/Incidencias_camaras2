const { Incidencia } = require("../db.connection");

// Obtener todas las incidencias (solo activas)
const getAllIncidencias = async (page = 1, limit = 20) => {
    const offset = (page - 1) * limit;
    try {
        const response = await Incidencia.findAndCountAll({
            where: { state: true },
            limit,
            offset,
            order: [["id", "ASC"]],
        });
        return { totalCount: response.count, data: response.rows, currentPage: page } || null;
    } catch (error) {
        console.error("Error en el controlador al traer todas las Incidencias:", error);
        return false;
    }
};

// Obtener una incidencia por ID (solo si está activa)
const getIncidencia = async (id) => {
    try {
        const response = await Incidencia.findOne({ where: { id, state: true } });
        return response || null;
    } catch (error) {
        console.error("Error en el controlador al traer la Incidencia:", error);
        return false;
    }
};

// Crear una nueva incidencia
const createIncidencia = async ({ descripcion, hora, id_codigo, id_camara, id_turno, id_usuario }) => {
    try {
        const response = await Incidencia.create({
            descripcion,
            hora,
            id_codigo,
            id_camara,
            id_turno,
            id_usuario,
            state: true,
        });
        return response || null;
    } catch (error) {
        console.error("Error en el controlador al crear la Incidencia:", error);
        return false;
    }
};

// Actualizar una incidencia
const updateIncidencia = async (id, datos) => {
    try {
        const incidencia = await getIncidencia(id);
        if (incidencia) await incidencia.update(datos);
        return incidencia || null;
    } catch (error) {
        console.error("Error al modificar la Incidencia en el controlador:", error);
        return false;
    }
};

// Eliminar una incidencia (cambia el estado a false en lugar de eliminar)
const deleteIncidencia = async (id) => {
    try {
        const incidencia = await Incidencia.findByPk(id);

        if (!incidencia) {
            console.error("Incidencia no encontrada");
            return null;
        }

        incidencia.state = false;
        await incidencia.save();
        return incidencia;
    } catch (error) {
        console.error("Error al eliminar la Incidencia:", error);
        return false;
    }
};

module.exports = {
    getAllIncidencias,
    getIncidencia,
    createIncidencia,
    updateIncidencia,
    deleteIncidencia,
};
