const API_BASE_URL = "https://api.brasas.com"; //"http://localhost:8000";

export const makeLogin = async (user_id, community_id) => {
  const response = await fetch(`${API_BASE_URL}/users/login/${user_id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "community_id": `${community_id}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Erro ao fazer login: ${response.statusText}`);
  }

  const data = await response.json();
  const token = data.access_token;

  if (token) {
    localStorage.setItem("@brasas-refer-and-win:user-access-token", token);
  }

  //console.log("Retorno da makeLogin", data);
  return token;
};

export const getUserEmail = async (user_id, token) => {
  const response = await fetch(`${API_BASE_URL}/users/me/`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Erro ao buscar e-mail do usuário: ${response.statusText}`);
  }

  const data = await response.json();
  //console.log("Retorno da getUserEmail", data);
  return data.email;
};

export const getExternalId = async (user_email, token) => {
  const response = await fetch(
    `${API_BASE_URL}/sophia/student/search?email=${
      encodeURIComponent(user_email)
    }`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!response.ok) {
    throw new Error(`Erro ao buscar external_id: ${response.statusText}`);
  }

  const data = await response.json();
  //console.log("Retorno da getExternalId", data);
  return data[0].external_id;
};
