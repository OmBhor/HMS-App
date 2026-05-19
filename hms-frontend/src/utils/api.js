
import { getToken } from "./auth";

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
