const { Router } = require("express");
const router = Router();
const usuarioRutas = require("./usuarioRouter");
const camaraRutas = require("./camaraRouter")
const jurisdiccionRutas = require ("./jurisdiccionRouter")
const incidenciaRutas = require ("./incidenciaRouter");

/*
const funcionRutas = require("./funcionRutas");
const sexoRutas = require('./sexoRutas');

// Usa prefijos para organizar las rutas

router.use('/funciones', funcionRutas);
router.use('/sexos', sexoRutas);
*/
router.use("/usuario", usuarioRutas);
router.use("/camara",camaraRutas);
router.use("/jurisdiccion",jurisdiccionRutas);
router.use("/incidencia",incidenciaRutas);

module.exports = router;