const express = require ("express");

const router = express.Router();
const doctorController = require ("../controllers/doctorController.js");

router.post("/create", doctorController.createDoctor);
router.get("/", doctorController.getDoctors);
router.get("/id/:id", doctorController.getDoctorById);
router.get("/speciality/:speciality", doctorController.getDoctorBySpec);
router.delete("/:id", doctorController.deleteDoctor)

module.exports = router;