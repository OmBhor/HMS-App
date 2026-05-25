import React, { useState } from "react";
//import axios from "axios";
import "./AdminPanel.css";
import CreateSpecModal from "./CreateSpecModal";
import DeleteSpecModal from "./deleteSpec";
import { AddDoctorModal } from "./AddDoctorModal";
import RemoveDoctorModal from "./RemoveDoctorModal";

function AdminPanel() {
  const [showCreate, setShowCreate] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [addDoctor, setAddDoctor] = useState(false);
  const [delDoct, setDelDoc] = useState(false)

  return (
    <div className="admin-container">
      <h1>Admin Panel</h1>

      <div className="button-group">
        <button className="secondary-btn" onClick={() => setShowCreate(true)}>
          Create Specialization
        </button>

        <button className='secondary-btn' onClick={() => setShowDelete(true)}>
          Delete Specialization
        </button>

        <button className="secondary-btn" onClick={()=> setAddDoctor(true)}>Add Doctor</button>
        <button className="secondary-btn" onClick={() => setDelDoc(true)}>Delete Doctor</button>
      </div>

      {showCreate && <CreateSpecModal onClose={() => setShowCreate(false)} />}
        
{showDelete && (
  <DeleteSpecModal onClose={() => setShowDelete(false)} />
)}

{addDoctor && (
  <AddDoctorModal onClose={() => setAddDoctor(false)} />
)}

{delDoct && (
  <RemoveDoctorModal onClose={() => setDelDoc(false)} />
)}

    </div>
  );
}

export default AdminPanel;
