const { Router } = require("express");
const router = Router();
const {
    getAllJurisdiccionesHandler,
    getJurisdiccionHandler,
    createJurisdiccionHandler,
    updateJurisdiccionHandler,
    deleteJurisdiccionHandler
} = require("../handlers/jurisdiccionHandler");

router.get("/",getAllJurisdiccionesHandler);
router.get("/:id", getJurisdiccionHandler);
router.post("/", createJurisdiccionHandler);
router.patch("/:id", updateJurisdiccionHandler);
router.delete("/:id",  deleteJurisdiccionHandler);

module.exports = router;
