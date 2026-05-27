import React, { useState } from "react";
import { createSpecialization } from "../utils/api";
import "./CreateSpecModal.css";

function CreateSpecModal({ onClose }) {
  const [specData, setSpecData] = useState({
    specialization: "",
    description: "",
    image: null,
  });

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setSpecData({
  //     ...specData,
  //     [name]: value
  //   });
  // };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      setSpecData({
        ...specData,
        image: files[0],
      });
    } else {
      setSpecData({
        ...specData,
        [name]: value,
      });
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const res = await createSpecialization(specData); // ✅ clean call
  //     console.log("Created:", res);

  //     setSpecData({
  //       specialization: "",
  //       description: "",
  //     });

  //     onClose();
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };
const handleSubmit = async (e) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append("specialization", specData.specialization);
  formData.append("description", specData.description);
  formData.append("image", specData.image);

  try {
    const res = await createSpecialization(formData);
    console.log(res);

    setSpecData({
      specialization: "",
      description: "",
      image: null
    });

    onClose();
  } catch (err) {
    console.error(err);
  }
};
 
  return (
    <div className="modal-overlay">
      <div className="form-card">
        <h2 className="form-title">Create Specialization</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Specialization</label>
            <input
              type="text"
              name="specialization"
              value={specData.specialization}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <input
              type="text"
              name="description"
              value={specData.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Image</label>
            <input
              type="file"
              name="image"
              onChange={handleChange}
              accept="image/*"
            />
          </div>

          <button type="submit" className="submit-btn">
            Create Specialization
          </button>

          <button type="button" className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateSpecModal;
