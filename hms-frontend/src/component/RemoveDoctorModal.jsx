import React, { useEffect, useState } from 'react';
import { deleteDoctor, getDoctor} from '../utils/api';

function RemoveDoctorModal({onClose}) {
    const [doctors, setDoctors] = useState([])
      const [selectedDoc, setSelectedDocs] = useState("");
    


    useEffect(()=>{
        const fetchData = async () => {
              try {
                const data = await getDoctor();
                setDoctors(Array.isArray(data.data) ? data.data : []);
              } catch (err) {
                console.error(err);
              }
            };

            fetchData()
    },[])

    const handleDelete = async () => {
        if (!selectedDoc) return alert("Please select specialization");
    
        try {
          await deleteDoctor(selectedDoc);
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
            value={selectedDoc}
            onChange={(e) => setSelectedDocs(e.target.value)}
          >
            <option value="">-- Select --</option>
            {doctors.map((doc) => (
              <option key={doc._id} value={doc._id}>
                {doc.name}
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
  )
}

export default RemoveDoctorModal
