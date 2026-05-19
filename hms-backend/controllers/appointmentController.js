const appointmentModel = require("../model/appointmentModel");


async function createAppointment(req, res){
try {
    const data = req.body;

    const createdApp = await appointmentModel.create(data);

    return res.status(201).json({
        data: createdApp,
        message: "Appointment created successfully",
        error: false,
        success: true
   })

    
} catch (error) {
    return res.status(500).json({
        message: 'appointment creation failed: ' + error.message,
        error: true,
        success: false
    });
}

}


async function getAppointment(req, res){

    try{

        const data = await appointmentModel.find();

        return res.status(200).json({
            data: data,
            message: "Appointment found successfully",
            error: false,
            success: true
        })

    }catch(error){
        return res.status(500).json({
            message: "Appointment not found successfully" + error.message,
            error: false,
            success: true
        })
    }
}

module.exports = {createAppointment, getAppointment};