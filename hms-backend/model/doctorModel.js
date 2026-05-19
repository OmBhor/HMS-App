const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  speciality: {
    type: String,
    required: true,
  },
  contact: {
    type: Number,
  },
  consultationFee: {
    type: Number,
    default: 500,
  },
  timings: {
    start: { type: String, required: true },
    end: { type: String, required: true },
  },
  isAvailable: {
    type: Boolean,
    default: true,
  }
},{ timestamps: true });

const doctorModel = mongoose.model("doctor", doctorSchema);

module.exports = doctorModel;
