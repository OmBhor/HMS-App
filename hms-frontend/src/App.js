// //import logo from './logo.svg';
// import './App.css';
// import { Routes, Route } from "react-router-dom";
// import Home from "./component/home";
// import Doctor from "./component/DoctorList";
// import SpecDoctor from "./component/SpecDoctorList";
// import AppointmentForm from './component/AppointmentForm';
// import SignUp from './component/SignUp';
// import SignIn from './component/SignIn';
// import Navbar from './component/Navbar';

// function App() {
//   return (
//    <>
//    <Navbar/>
//     <Routes>
//       <Route path='/' element={<Home/>} />
//       <Route path='/doctors' element={<Doctor/>}/>
//       <Route path='/doctor/:specialization' element={<SpecDoctor/>}/>
//       <Route path='/appointment' element={<AppointmentForm/>}/>
//       <Route path='/signup' element={<SignUp/>}/>
//       <Route path='/signin' element={<SignIn/>}/>
//     </Routes>
//    </>
//   );
// }

// export default App;

import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import Home from "./component/home";
import Doctor from "./component/DoctorList";
import SpecDoctor from "./component/SpecDoctorList";
import AppointmentForm from "./component/AppointmentForm";
import SignUp from "./component/SignUp";
import SignIn from "./component/SignIn";
import Navbar from "./component/Navbar";

import { fetchCurrentUser } from "./utils/api";
import { removeToken } from "./utils/auth";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCurrentUser()
      .then((data) => setUser(data))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const handleLogout = () => {
    removeToken();
    setUser(null);
  };

  if (loading) return null; // prevents UI flicker

  return (
    <>
      <Navbar user={user} onLogout={handleLogout} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/doctors" element={<Doctor />} />
        <Route
          path="/doctor/:specialization"
          element={<SpecDoctor />}
        />
        <Route
          path="/appointment"
          element={<AppointmentForm />}
        />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </>
  );
}

export default App;