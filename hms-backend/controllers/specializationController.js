const SpecModel = require("../model/specializationModel");

async function getSpecializtion(req, res) {

  try{const specs = await SpecModel.find();

  res.status(200).json({
    data: specs,
    message: "Specs found",
    error: false,
    success: true,
  });}
  catch(error){
    res.status(500).jsoon({
      message: "Specs not found",
      error: true,
      success: false,
    })
  }
  
}

// async function createSpecialization(req, res) {
//   try {
//     const specBody = req.body;

//     const createSpec = await SpecModel.create(specBody);

//     return res.status(201).json({
//       data: createSpec,
//       message: "Specialization created successfully",
//       success: true,
//       error: false,
//     });
//   } catch (err) {
//     return res.status(500).json({
//       messaage: "Specialization not created",
//       error: true,
//       success: false,
//       data: err,
//     });
//   }
// }

async function createSpecialization(req, res) {
  try {

    
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    const { specialization, description } = req.body;

   // const image = req.file ? req.file.path : "";
   
const image = req.file
      ? `/uploads/${req.file.filename}`   // ✅ ONLY store relative path
      : "";


    const createSpec = await SpecModel.create({
      specialization,
      description,
      image
    });

    return res.status(201).json({
      data: createSpec,
      message: "Specialization created successfully",
      success: true,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Specialization not created",
      error: true,
    });
  }
}


async function deleteSpecialization(req, res) {
  try {
    const specId = req.params.id;

    await SpecModel.findByIdAndDelete(specId);

    res.status(200).json({
      message: "Specialization deleted successfully",
      error: false,
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Specialization not deleted",
      error: true,
      success: false,
    });
  }

  async function editSpecialization(req, res){
    try{
      const oldSpecId = req.params.id;
      const newSpecBody = req.body;

      const editedSpec = await SpecModel.findByIdAndUpdate(oldSpecId, newSpecBody);

      return res.status(201).json({
        data: editedSpec,
        message: "Specs edited successfully",
      })
    }
    catch{

    }
  }
}

module.exports = {
  getSpecializtion,
  createSpecialization,
  deleteSpecialization,
};
