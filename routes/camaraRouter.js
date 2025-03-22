const { Router } = require("express");
const {
    getAllCamarasHandler,
    getCamaraHandler,
    createCamaraHandler,
    updateCamaraHandler,
    deleteCamaraHandler
} = require("../handlers/camaraHandler");

const router = Router();

router.get("/", getAllCamarasHandler);
router.get("/:id", getCamaraHandler);
router.post("/", createCamaraHandler);
router.put("/:id", updateCamaraHandler);
router.delete("/:id", deleteCamaraHandler);

module.exports = router;
