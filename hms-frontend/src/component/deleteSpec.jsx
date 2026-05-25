import React, { useEffect, useState } from "react";
import {
  getSpecializations,
  deleteSpecialization
} from "../utils/api";
import "./DeleteSpecModal.css";

function DeleteSpecModal({ onClose }) {
  const [specializations, setSpecializations] = useState([]);
  const [selectedSpec, setSelectedSpec] = useState("");

  // ✅ Fetch data when modal opens
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getSpecializations();
        setSpecializations(Array.isArray(data.data) ? data.data : []);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  // ✅ Handle delete
  const handleDelete = async () => {
    if (!selectedSpec) return alert("Please select specialization");

    try {
      await deleteSpecialization(selectedSpec);
      alert("Deleted successfully ✅");
      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="form-card">
        <h2 className="form-title">Delete Specialization</h2>

        {/* ✅ Dropdown */}
        <div className="form-group">
          <label>Select Specialization</label>
          <select
            value={selectedSpec}
            onChange={(e) => setSelectedSpec(e.target.value)}
          >
            <option value="">-- Select --</option>
            {specializations.map((spec) => (
              <option key={spec._id} value={spec._id}>
                {spec.specialization}
              </option>
            ))}
          </select>
        </div>

        {/* ✅ Buttons */}
        <button className="delete-btn" onClick={handleDelete}>
          Delete
        </button>

        <button className="cancel-btn" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
}

export default DeleteSpecModal;
