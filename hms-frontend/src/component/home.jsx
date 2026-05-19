import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './Home.css'
import { getToken } from '../utils/auth'
// Icon mapping for specializations
const iconMap = {
  Cardiologist: '❤️',
  Orthopedics: '🦴',
  Dermatologist: '✨',
  Pediatrician: '👶',
  Neurologist: '🧠',
}

function Home() {
  const [specializations, setSpecializations] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const token = getToken()

  useEffect(() => {
    const fetchSpecializations = async () => {
      try {
        setLoading(true)
        const response = await fetch('http://localhost:5000/api/specialization')

        if (!response.ok) {
          throw new Error('Failed to fetch specializations')
        }

        const result = await response.json()

        const transformedData = result.data.map((spec) => ({
          name: spec.specialization,
          description: spec.description || 'Professional medical services',
          icon: iconMap[spec.specialization] || '🏥',
          // imageUrl:
          //   imageMap[spec.specialization] ||
          //   'https://images.unsplash.com/photo-1631217314831-e13741b1fad9?auto=format&fit=crop&w=1200&q=80',
        }))

        setSpecializations(transformedData)
        setError(null)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchSpecializations()
  }, [])

  const scrollToDetail = (name) => {
    const id = name.toLowerCase().replace(/\s+/g, '-')
    document.getElementById(id)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  const handleAction = (specName) => {
    navigate(`/doctor/${encodeURIComponent(specName)}`)
  }
  const handleAppointment = () =>{
 if(token){navigate("/appointment")}
 else {
  navigate("/signIn")
 }
    
  }

  if (loading) {
    return (
      <div className="page">
        <h1 className="title">Doctor Specializations</h1>
        <p className="status-text">Loading specializations...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="page">
        <h1 className="title">Doctor Specializations</h1>
        <p className="error-text">Error: {error}</p>
      </div>
    )
  }

  return (
    <div className="page">

      <div className='title1'>
        <h1>Book an Appointment with Healthy Buddy</h1>
        <button className='action-button' onClick={handleAppointment}>Book Appointment</button>
      </div>
      <h1 className="title">Doctor Specializations</h1>
      
      <div className="card-grid">
        {specializations.map((specialization) => (
          <button
            key={specialization.name}
            className="card-button"
            onClick={() => scrollToDetail(specialization.name)}
          >
            <div className="card-badge">
              <span className="card-icon">{specialization.icon}</span>
              <span className="card-badge-text">Specialization</span>
            </div>
            <h2 className="card-title">{specialization.name}</h2>
          </button>
        ))}
      </div>

      <div className="details-section">
        <h2 className="section-title">Specialization Details</h2>

        {specializations.map((specialization) => {
          const id = specialization.name.toLowerCase().replace(/\s+/g, '-')
          return (
            <div
              key={specialization.name}
              id={id}
              className="detail-card"
              style={{
                backgroundImage: `linear-gradient(rgba(0, 22, 74, 0.55), rgba(9, 31, 82, 0.55)), url(${specialization.url})`,
              }}
            >
              <div className="detail-content">
                <h3 className="detail-title">{specialization.name}</h3>
                <p className="detail-text">{specialization.description}</p>
                <button
                  className="action-button"
                  onClick={() => handleAction(specialization.name)}
                >
                  Doctor's list
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Home