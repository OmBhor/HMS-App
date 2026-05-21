
import { getToken } from "./auth";
import axios from "axios";

export const fetchCurrentUser = async () => {
  const token = getToken();
  if (!token) return null;

  const response = await fetch(
    "http://localhost:5000/api/users/me",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Unauthorized");
  }

  return response.json();
};



export const createSpecialization = (data) => {
  return axios.post("http://localhost:5000/api/specialization/create", data);
};

export const deleteSpecialization = (id) => {
  return axios.delete(`http://localhost:5000/api/specialization/${id}`);
};
