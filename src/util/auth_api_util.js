import { authUrl, authHeaders } from "./constants";

export const authenticate = async socialToken => {
  const encodedToken = btoa(socialToken);
  const response = await fetch(authUrl, {
    method: "POST",
    headers: {
      Authorization: `Basic ${encodedToken}`
    }
  });
  const payload = await response.json();
  return payload;
};

export const fetchCurrentUser = async token => {
  const response = await fetch(authUrl, {
    method: "GET",
    headers: authHeaders()
  });
  const payload = await response.json();
  return payload;
};
