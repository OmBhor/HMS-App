
import React, { useState } from "react";
import axios from "axios";
import "./AdminPanel.css";
import CreateSpecModal from "./CreateSpecModal";

function AdminPanel() {

const [showCreate, setShowCreate] = useState(false);
 

  
  return (
    <div className="admin-container">
      <h1>Admin Panel</h1>

      <div className="button-group">
        <button className="secondary-btn" onClick={() => setShowCreate(true)}>
          Create Specialization
        </button>
        <button className="secondary-btn">Delete Specialization</button>
        <button className="secondary-btn">Add Doctor</button>
        <button className="secondary-btn">Delete Doctor</button>
      </div>

    
{showCreate && (
        <CreateSpecModal onClose={() => setShowCreate(false)} />
      )}

    </div>
  );
}

export default AdminPanel;
