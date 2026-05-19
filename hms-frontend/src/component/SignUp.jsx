import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import "./SignUp.css"

function SignUp() {

    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    })
    const navigate = useNavigate();



    const handleSubmit = async(e) => {
        e.preventDefault();

        const response = await fetch("http://localhost:5000/api/login/signup",{
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(data)
        
        })

        const user = await response.json();

        if (user.error) {
      alert(user.message);
    }

    if (user.success) {
      alert(user.message);
      setData({
        name: "",
        email: "",
        password: "",
      });
      navigate("/")
    }
        console.log("submitted", data)
    }

    const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  return (
   
<div className="signup-container">
  <div className="signup-card">
    <h1 className="title">Create Account</h1>
    <p className="subtitle">Join our hospital portal</p>

    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Name</label>
        <input
          name="name"
          type="text"
          value={data.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Email</label>
        <input
          name="email"
          type="email"
          value={data.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Password</label>
        <input
          name="password"
          type="password"
          value={data.password}
          onChange={handleChange}
          required
        />
      </div>
      

      <button className="primary-btn" type="submit">
        Sign Up
      </button>
    </form>
  </div>
</div>

  )
}

export default SignUp
