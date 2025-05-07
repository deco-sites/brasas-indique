import axios from "axios";

const API_BASE_URL = "http://localhost:8000";

export const makeLogin = async (user_id, community_id) => {
  const response = await axios.get(`${API_BASE_URL}/users/login/${user_id}`, {
    headers: {
      "Content-Type": "application/json",
      "community_id": `${community_id}`,
    },
  });

  const token = response.data.access_token;

  if (token) {
    localStorage.setItem("@brasas-refer-and-win:user-access-token", token);
  }

  console.log("Retorno da makeLogin", response);
  return response.data.access_token;
};

export const getUserEmail = async (user_id, token) => {
  const response = await axios.get(`${API_BASE_URL}/users/me/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  console.log("Retorno da getUserEmail", response);
  return response.data.email;
};

export const getExternalId = async (user_email, token) => {
  const response = await axios.get(
    `${API_BASE_URL}/sophia/student/search?email=${user_email}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  console.log("Retorno da getExternalId", response);
  return response.data.external_id;
};
