const { Router } = require("express");
const {
    getAllUsuariosHandler,
    getUsuarioHandler,
    createUsuarioHandler,
    updateUsuarioHandler,
    deleteUsuarioHandler
} = require("../handlers/usuarioHandlers");

const usuarioRutas = Router();

usuarioRutas.get("/", getAllUsuariosHandler);
usuarioRutas.get("/:id", getUsuarioHandler);
usuarioRutas.post("/", createUsuarioHandler);
usuarioRutas.put("/:id", updateUsuarioHandler);
usuarioRutas.delete("/:id", deleteUsuarioHandler);

module.exports = usuarioRutas;
