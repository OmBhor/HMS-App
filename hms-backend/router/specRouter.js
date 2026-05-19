const express = require ("express");
const router  = express.Router();
const specializationController = require("../controllers/specializationController")

router.get("/",specializationController.getSpecializtion);
router.post("/create", specializationController.createSpecialization);
router.delete("/:id", specializationController.deleteSpecialization);

module.exports = router;