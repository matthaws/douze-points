import { backendUrl, authHeaders } from "./constants";

export const createScoring = async scoring => {
  const postObject = {
    method: "POST",
    body: JSON.stringify({ scoring }),
    headers: authHeaders(),
  };
  postObject.headers['Content-Type'] = 'application/json';
  const response = await fetch(`${backendUrl}scorings`, postObject);
  const payload = await response.json();
  return payload;
};

export const updateScoring = async scoring => {
  const postObject = {
    method: 'PATCH',
    body: JSON.stringify({ scoring }),
    headers: authHeaders(),
  };
  postObject.headers['Content-Type'] = 'application/json';
  const response = await fetch(`${backendUrl}/scorings/${scoring.id}`, postObject);
  const payload = await response.json();
  return payload;
};

export const removeScoring = async scoringId => {
  const response = await fetch(
    `${backendUrl}scorings/${scoringId}`,
    {
      method: 'DELETE',
      headers: authHeaders()
    }
  );
  const responseJSON = await response.json();
  return responseJSON;
};
