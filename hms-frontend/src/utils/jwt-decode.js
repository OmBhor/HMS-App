
import { jwtDecode } from "jwt-decode";
import { getToken } from "./auth"; // your token file

export const getUserFromToken = () => {
  const token = getToken();
  if (!token) return null;

  try {
    return jwtDecode(token);
  } catch (err) {
    return null;
  }
};
