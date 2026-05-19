import React, { useEffect, useRef } from 'react'
import { useState } from 'react';
import './DoctoreList.css';

function DoctorList() {
 const [doctors, setDoctors] = useState([]);
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState(null);
 const hasFetched = useRef(false);

useEffect(() => {
     if (hasFetched.current) return; 
     hasFetched.current = true;

     const fetchDoctorList = async () => {
        try {
          setLoading(true);
          const response = await fetch("http://localhost:5000/api/doctor");
          
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          
          const result = await response.json();
          console.log('API Response:', result); // Debug log
          
          setDoctors(result.data || []);
          setError(null);
        } catch (err) {
          setError(err.message);
          console.error('Error fetching doctors:', err);
        } finally {
          setLoading(false);
        }
     }
     fetchDoctorList();

}, [])

  if (loading) return <div><h2>Doctors List</h2><p>Loading...</p></div>;
  if (error) return <div><h2>Doctors List</h2><p style={{color: 'red'}}>Error: {error}</p></div>;

  return (
    <div>
      <h2>Doctors List ({doctors.length} records)</h2>
      <div className='card-container'>
        {doctors.map((doctor) => (
          <div className ="doctor-card" key={doctor._id}>
            <p><strong>Name:</strong> {doctor.name}</p>
            <p><strong>Email:</strong> {doctor.email}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DoctorList
