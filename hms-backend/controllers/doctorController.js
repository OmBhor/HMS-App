const doctorModel = require("../model/doctorModel");
const specializationModel = require("../model/specializationModel");

async function createDoctor(req, res) {
  try {
    const newDoctorData = req.body;

    // 1. Create the doctor
    const doctor = await doctorModel.create(newDoctorData);

    console.log("line 28", doctor);
    console.log("line 28", doctor.speciality);

    const speciality = doctor.speciality.trim().toLowerCase();

    // 2. Check if specialization exists
    let specialization = await specializationModel.findOne({
      specialization: speciality,
    });
    console.log("line 32", specialization);

    // 3. If not exists, create new one
    if (!specialization) {
      specialization = await specializationModel.create({
        specialization: speciality,
        doctors: [doctor._id],
      });
    } else {
      // 4. If exists, push doctor id
      specialization.doctors.push(doctor._id);
      await specialization.save();
    }

    return res.status(201).json({
      data: doctor,
      message: "Doctor created & specialization updated successfully",
      success: true,
      error: false,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
      success: false,
      error: true,
    });
  }
}

async function getDoctors(req, res) {
  try {
    const doctors = await doctorModel.find();

    return res.status(200).json({
      data: doctors,
      message: "doctors found successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false,
      error: true,
    });
  }
}

async function getDoctorById(req, res) {
  try {
    const id = req.params.id;

    console.log("line 38", id);

    const doctor = await doctorModel.findById(id);

    return res.status(200).json({
      data: doctor,
      message: "doctor found successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false,
      error: true,
    });
  }
}

async function getDoctorBySpec(req, res) {
  try {
    const { speciality } = req.params;

    console.log("line 53", speciality);

    const specDocList = await doctorModel.find({ speciality });

    return res.status(200).json({
      data: specDocList,
      message: "Specialized doctor list fetched successfully",
      error: false,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false,
      error: true,
    });
  }
}

async function deleteDoctor(req, res){

  try{

  const delId = req.params.id;

  const del = await doctorModel.findByIdAndDelete(delId);

  return res.status(200).json({
    message: "User deleted successfully",
    success: true,
    error: false
  })
  }
  catch(error){
    return res.status(500).json({
      message: error.message,
      success: false,
      error: true
    });
  }




}

module.exports = { createDoctor, getDoctors, getDoctorById, getDoctorBySpec, deleteDoctor };
