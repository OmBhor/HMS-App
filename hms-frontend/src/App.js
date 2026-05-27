import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

import Home from "./component/home";
import Doctor from "./component/DoctorList";
import SpecDoctor from "./component/SpecDoctorList";
import AppointmentForm from "./component/AppointmentForm";
import SignUp from "./component/SignUp";
import SignIn from "./component/SignIn";
import Navbar from "./component/Navbar";
import AdminPanel from "./component/AdminPanel";
import { fetchCurrentUser } from "./utils/api";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const data = await fetchCurrentUser();
        setUser(data);
      } catch (err) {
        localStorage.removeItem("token"); // ✅ FIX
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token"); // ✅ already correct
    setUser(null);
  };

  if (loading) return null;

  return (
    <>
      <Navbar user={user} onLogout={handleLogout} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/doctors" element={<Doctor />} />
        <Route path="/doctor/:specialization" element={<SpecDoctor />} />
        <Route path="/appointment" element={<AppointmentForm />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />

        {/* ✅ Protected Admin Route */}
        <Route
          path="/admin"
          element={
            user && user.isAdmin ? (
              <AdminPanel />
            ) : (
              <Navigate to="/signin" />
            )
          }
        />
      </Routes>
    </>
  );
}

export default App;