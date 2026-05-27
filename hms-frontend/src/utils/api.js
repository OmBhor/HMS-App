import { getToken } from "./auth";
import axios from "axios";

export const fetchCurrentUser = async () => {
  const token = getToken();
  if (!token) return null;

  const response = await fetch("http://localhost:5000/api/users/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {

    //throw new Error("Unauthorized");

    
 localStorage.removeItem("token"); // remove invalid token
    return null;

  }

  return response.json();
};

// export const createSpecialization = (data) => {
//   return axios.post("http://localhost:5000/api/specialization/create", data);
// };

export const createSpecialization = (data) => {
  return axios.post("http://localhost:5000/api/specialization/create", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deleteSpecialization = (id) => {
  return axios.delete(`http://localhost:5000/api/specialization/${id}`);
};

export const getSpecializations = async () => {
  const res = await axios.get("http://localhost:5000/api/specialization");
  console.log("line 38", res);
  return res.data;
};

export const createDoctor = (data) => {
  return axios.post("http://localhost:5000/api/doctor/create", data);
};

export const deleteDoctor = (id) => {
  return axios.delete(`http://localhost:5000/api/doctor/${id}`);
};

export const getDoctor = async () => {
  const res = await axios.get("http://localhost:5000/api/doctor");

  return res.data;
};
