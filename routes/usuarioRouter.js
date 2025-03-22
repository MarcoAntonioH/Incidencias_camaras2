const { Router } = require("express");
const {
    getAllUsuariosHandler,
    getUsuarioHandler,
    createUsuarioHandler,
    updateUsuarioHandler,
    deleteUsuarioHandler
} = require("../handlers/usuarioHandlers");

const router = Router();

router.get("/", getAllUsuariosHandler);
router.get("/:id", getUsuarioHandler);
router.post("/", createUsuarioHandler);
router.put("/:id", updateUsuarioHandler);
router.delete("/:id", deleteUsuarioHandler);

module.exports = router;
