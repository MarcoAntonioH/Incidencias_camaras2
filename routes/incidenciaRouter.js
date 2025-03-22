const { Router } = require("express");
const router = Router();
const {
    getAllIncidenciasHandler,
    getIncidenciaHandler,
    createIncidenciaHandler,
    updateIncidenciaHandler,
    deleteIncidenciaHandler
} = require("../handlers/incidenciaHandler");

router.get("/",  getAllIncidenciasHandler);
router.get("/:id",  getIncidenciaHandler);
router.post("/",  createIncidenciaHandler);
router.patch("/:id", updateIncidenciaHandler);
router.delete("/:id", deleteIncidenciaHandler);

module.exports = router;
