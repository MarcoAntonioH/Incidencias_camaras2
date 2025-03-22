const { Router } = require("express");
const router = Router();
const usuarioRutas = require("./usuarioRouter");
const camaraRutas = require("./camaraRouter")

/*
const funcionRutas = require("./funcionRutas");
const sexoRutas = require('./sexoRutas');

// Usa prefijos para organizar las rutas

router.use('/funciones', funcionRutas);
router.use('/sexos', sexoRutas);
*/
router.use("/usuarios", usuarioRutas);
router.use("/camara",camaraRutas);


module.exports = router;