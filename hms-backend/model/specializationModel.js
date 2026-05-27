const mongoose = require("mongoose");

const specSchema = new mongoose.Schema({
  specialization: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    
  },

 image: {
    type: String   // ✅ store file path or URL
  },

  doctors: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "doctor",
    },
  ],
});

const spec = mongoose.model("specialization", specSchema);

module.exports = spec;
