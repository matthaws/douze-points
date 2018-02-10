import { backendUrl, authHeaders } from './constants';

export const fetchScoresheet = async scoresheetId => {
  const response = await fetch(
    `${backendUrl}scoresheets/${scoresheetId}`,
    { method: 'GET' }
  );
  const scoresheet = await response.json();
  return scoresheet;
};

export const fetchScoresheets = async userId => {
  const response = await fetch(
    `${backendUrl}user/${userId}/scoresheets`,
    { method: 'GET',
    }
  );
  const scoresheets = await response.json();
  return scoresheets;
};

export const createScoresheet = async scoresheet => {
  const response = await fetch(
    `${backendUrl}/users/${scoresheet.user_id}/scoresheets`,
    { method: 'POST',
      headers: authHeaders(),
      data: {
        scoresheet
      }
    }
  );
  const newScoresheet = await response.json();
  return newScoresheet;
};

export const updateScoresheet = async scoresheet => {
  const response = await fetch(
    `${backendUrl}scoresheets/${scoresheet.id}`,
    {
      method: 'PATCH',
      headers: authHeaders(),
      data: {
        scoresheet
      }
    }
  );
  const updatedScoresheet = await response.json();
  return updatedScoresheet;
};

export const deleteScoresheet = async scoresheetId => {
  const response = await fetch (
    `${backendUrl}scoresheets/${scoresheetId}`,
    { method: 'DELETE',
      headers: authHeaders(),
    }
  );
  // not sure if below is necessary
  const deletedScoresheet = await response.json();
  return deletedScoresheet;
};
