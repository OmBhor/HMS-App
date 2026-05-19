import React, { useState } from "react";
import "./AppointmentForm.css";
import {useNavigate} from "react-router-dom";
import { getToken } from "../utils/auth";

function AppointmentForm() {
  const [data, setData] = useState({
    name: "",
    email: "",
    contact: "",
  });
  const token = getToken()
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(token){const response = await fetch(
      "http://localhost:5000/api/appointment/create",
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );


    const dataResponse = await response.json();

    console.log("line 27", dataResponse)
    if (dataResponse.error) {
      alert(dataResponse.message);
    }

    if (dataResponse.success) {
      alert(dataResponse.message);
      setData({
        name: "",
        email: "",
        contact: "",
      });
      navigate("/")
    }}
    else{
      navigate("/signin")
    }

  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="appointment-page">
      <div className="appointment-container">
        <h1>Appointment form</h1>
        <form onSubmit={handleSubmit}>
          <label id="name">Name: </label>
          <input
            type="text"
            name="name"
            value={data.name}
            onChange={handleChange}
          ></input>
          <label id="email">Email: </label>
          <input
            type="email"
            name="email"
            value={data.email}
            onChange={handleChange}
          ></input>
          <label id="contact">Contact number: </label>
          <input
            type="number"
            name="contact"
            value={data.contact}
            onChange={handleChange}
          />
          <button type="submit">Create appointment</button>
        </form>
      </div>
    </div>
  );
}

export default AppointmentForm;
