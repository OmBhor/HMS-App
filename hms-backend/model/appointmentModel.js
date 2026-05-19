const mongoose = require("mongoose")

const appointmentScehma = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },

   contact: {
    type: String,
    required: true,
   }
    
})

const appointmentModel = mongoose.model("appointment", appointmentScehma) 

module.exports = appointmentModel