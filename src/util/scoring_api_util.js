import { backendUrl, authHeaders } from "./constants";

export const createScoring = async scoring => {
  const response = await fetch(
    `${backendUrl}scorings`,
    {
      method: "POST",
      headers: authHeaders(),
      data: {
        scoring
      }
    }
  );
  const payload = await response.json();
  return payload;
};

export const updateScoring = async scoring => {
  const response = await fetch(
    `${backendUrl}/scorings/${scoring.id}`,
    {
      method: 'PATCH',
      headers: authHeaders(),
      data: {
        scoring
      }
    }
  );
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
