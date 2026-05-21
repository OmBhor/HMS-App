import { useNavigate } from "react-router-dom";
import "./Navbar.css";
//import { getToken } from "../utils/auth";
import { getUserFromToken } from "../utils/jwt-decode";

const Navbar = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const token = getUserFromToken();

  
  const decodedUser = getUserFromToken();
  const isAdmin = decodedUser?.isAdmin;

  console.log("line 8", token)

  return (
    // <nav className="navbar">
    //   <div className="navbar-logo" onClick={() => navigate("/")}>
    //     HealthCare+
    //   </div>

    //   <ul className="navbar-links">
    //     <li onClick={() => navigate("/")}>Home</li>
    //     <li onClick={() => navigate("/doctors")}>Doctors</li>
    //     <li onClick={() => navigate("/appointment")}>
    //       Check Appointments
    //     </li>
    //   </ul>

    //   <div className="navbar-auth">
    //     {user ? (
    //       <>
    //         <span className="navbar-username">
    //           {user.name}
    //         </span>
    //         <button className="logout-btn" onClick={onLogout}>
    //           Logout
    //         </button>
    //       </>
    //     ) : (
    //       <button
    //         className="login-btn"
    //         onClick={() => navigate("/signin")}
    //       >
    //         Login
    //       </button>
    //     )}
    //   </div>
    // </nav>
    
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

        {/* ✅ Admin Button */}
        {isAdmin && (
          <li onClick={() => navigate("/admin")}>
            Admin Panel
          </li>
        )}
      </ul>

      <div className="navbar-auth">
        {user ? (
          <>
            <span className="navbar-username">
              {user.name}
            </span>

            {/* ✅ optional admin badge */}
            {isAdmin && <span className="admin-badge">Admin</span>}

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