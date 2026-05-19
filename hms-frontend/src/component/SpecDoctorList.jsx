import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./SpecDoctorList";
import "../utils/auth"
import { getToken } from "../utils/auth";
import { useNavigate } from "react-router-dom";

function SpecDoctorList() {
  const { specialization } = useParams();
  const [results, setresult] = useState([]);
  const navigate = useNavigate()
  const token = getToken();

  useEffect(() => {
    if(token){
      const fetchDoctors = async () => {
        const response = await fetch(
          `http://localhost:5000/api/doctor/speciality/${specialization}`,
        );

        const data = await response.json();

        console.log("line 12", data);
        setresult(Array.isArray(data) ? data : data.data);
      };

      fetchDoctors();
    }
    else{
      navigate("/signin")
    }
  }, [token, specialization]);
  // useEffect(() => {
  //   const fetchDoctors = async () => {
  //     const response = await fetch(
  //       `http://localhost:5000/api/doctor/speciality/${specialization}`,
  //     );

  //     const data = await response.json();

  //     console.log("line 12", data);
  //     setresult(Array.isArray(data) ? data : data.data);
  //   };

  //   fetchDoctors()
  // }, []);
  return (
    <div>
      <h1>Hello There</h1>
      <div className="card-container">
        {results.map((result) => (
          <div className="doctor-card" key={result._id}>
            <p>
              <strong>Name:</strong> {result.name}
            </p>
            <p>
              <strong>Email Id:</strong> {result.email}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SpecDoctorList;
