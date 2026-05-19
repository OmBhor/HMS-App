

const express = require("express");
const router = express.Router();

const appointmentController = require("../controllers/appointmentController.js");

router.post("/create", appointmentController.createAppointment);

router.get("/", appointmentController.getAppointment)


module.exports = router;