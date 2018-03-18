import { backendUrl, authHeaders } from "./constants";

export const fetchScoresheet = async scoresheetId => {
    const response = await fetch(
      `${backendUrl}scoresheets/${scoresheetId}`,
      {
        method: "GET"
      }
    );
    const payload = await response.json();
    return payload;
};

export const fetchScoresheets = async userId => {
    const response = await fetch(`${backendUrl}users/${userId}/scoresheets`, {
        method: "GET"
    });
    const payload = await response.json();
    return payload;
};

export const createScoresheet = async scoresheet => {
    const postObject = {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify({scoresheet})
    };
    postObject.headers['Content-Type'] = 'application/json';
    const response = await fetch(`${backendUrl}/users/${scoresheet.user_id}/scoresheets`, postObject);
    const newScoresheet = await response.json();
    return newScoresheet;
};

export const updateScoresheet = async scoresheet => {
    const postObject = {
      method: "PATCH",
      headers: authHeaders(),
      body: JSON.stringify({scoresheet})
    };
    postObject.headers['Content-Type'] = 'application/json';
    const response = await fetch(`${backendUrl}scoresheets/${scoresheet.id}`, postObject);
    const updatedScoresheet = await response.json();
    return updatedScoresheet;
};

export const deleteScoresheet = async scoresheetId => {
    const response = await fetch(`${backendUrl}scoresheets/${scoresheetId}`, {
        method: "DELETE",
        headers: authHeaders()
    });
    // not sure if below is necessary
    const responseJSON = await response.json();
    return responseJSON;
};
