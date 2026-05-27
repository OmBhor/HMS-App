const express = require ("express");
const router  = express.Router();
const specializationController = require("../controllers/specializationController");
const upload = require("../middleware/upload")

router.get("/",specializationController.getSpecializtion);
router.post("/create", upload.single("image"), specializationController.createSpecialization);
router.delete("/:id", specializationController.deleteSpecialization);

module.exports = router;