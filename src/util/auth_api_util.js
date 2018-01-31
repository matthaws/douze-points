import { authUrl, authHeaders } from "./constants";

export const authenticate = async socialToken => {
  const response = await fetch(authUrl, {
    method: "POST",
    headers: {
      Authorization: `${socialToken}`
    }
  });
  const payload = await response.json();
  return payload;
};

export const fetchCurrentUser = async () => {
  const response = await fetch("http://localhost:3000/auth", {
    headers: authHeaders()
  });
  const payload = await response.json();
  return payload;
};
