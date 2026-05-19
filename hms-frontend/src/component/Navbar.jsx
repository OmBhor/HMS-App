// import React from "react";
// import "./Navbar.css";
// import { useNavigate } from "react-router-dom";

// const Navbar = () => {

//     const navigate = useNavigate()
//     //const token = localStorage.getItem('token')
//     const handleClick = () => {
//             navigate("/signin")
        
//     }
//   return (
//     <nav className="navbar">
//       <div className="navbar-logo">
//         <span>HealthCare+</span>
//       </div>

//       <ul className="navbar-links">
//         <li><a href="/">Home</a></li>
//         <li><a href="/doctors">Doctors</a></li>
//         <li><a href="/appointments">Check Appointments</a></li>
//       </ul>

//       <div className="navbar-login">
//         <button onClick={handleClick}>Login</button>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

import { useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({ user, onLogout }) => {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="navbar-logo" onClick={() => navigate("/")}>
        HealthCare+
      </div>

      <ul className="navbar-links">
        <li onClick={() => navigate("/")}>Home</li>
        <li onClick={() => navigate("/doctors")}>Doctors</li>
        <li onClick={() => navigate("/appointment")}>
          Check Appointments
        </li>
      </ul>

      <div className="navbar-auth">
        {user ? (
          <>
            <span className="navbar-username">
              {user.name}
            </span>
            <button className="logout-btn" onClick={onLogout}>
              Logout
            </button>
          </>
        ) : (
          <button
            className="login-btn"
            onClick={() => navigate("/signin")}
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;