const { Router } = require("express");
const router = Router();
const {
    getAllCamarasHandler,
    getCamaraHandler,
    createCamaraHandler,
    updateCamaraHandler,
    deleteCamaraHandler,
} = require("../handlers/camaraHandler");

router.get("/",  getAllCamarasHandler);
router.get("/:id",getCamaraHandler);
router.post("/",  createCamaraHandler);
router.patch("/:id", updateCamaraHandler);
router.delete("/:id",  deleteCamaraHandler);

module.exports = router;




