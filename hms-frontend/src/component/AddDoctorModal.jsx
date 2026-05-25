import React, { useState } from "react";
import { createDoctor } from "../utils/api";
import "./AddDoctorModal.css"

export const AddDoctorModal = ({onClose}) => {
 
const [docData, setDocData] = useState({
  name: "",
  email: "",
  speciality: "",
  contact: "",
  consultationFee: "",
  timings: {
    start: "",
    end: ""
  }
});


  const handleChange = (e) => {
    const { name, value } = e.target;
    setDocData({
      ...docData,
      [name]: value,
    });
  };

  
const handleTimingChange = (e) => {
  const { name, value } = e.target;
  setDocData({
    ...docData,
    timings: {
      ...docData.timings,
      [name]: value
    }
  });
};


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await createDoctor(docData);
      console.log("line 28", res);

      setDocData({
         name: "",
  email: "",
  speciality: "",
  contact: "",
  consultationFee: "",
  timings: {
    start: "",
    end: ""
  }
      });

      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="form-card">
        <h2 className="form-title">Add Doctor</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={docData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="text"
              name="email"
              value={docData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>speciality</label>
            <input
              type="text"
              name="speciality"
              value={docData.speciality}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>contact</label>
            <input
              type="number"
              name="contact"
              value={docData.contact}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>consultationFee</label>
            <input
              type="number"
              name="consultationFee"
              value={docData.consultationFee}
              onChange={handleChange}
              required
            />
          </div>
          
<div className="form-group">
  <label>Start Time</label>
  <input
    type="time"
    name="start"
    value={docData.timings.start}
    onChange={handleTimingChange}
    required
  />
</div>

<div className="form-group">
  <label>End Time</label>
  <input
    type="time"
    name="end"
    value={docData.timings.end}
    onChange={handleTimingChange}
    required
  />
</div>


          <button type="submit" className="submit-btn">
            Add doctor
          </button>

          <button type="button" className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};
