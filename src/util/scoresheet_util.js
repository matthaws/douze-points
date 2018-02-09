import { backendUrl } from './constants';

const fetchScoresheet = (scoresheetId) => {
  $.ajax({
    method: 'GET',
    url: `${backendUrl}scoresheets/${scoresheetId}`
  });
};

const fetchScoresheets = (userId) => {
  $.ajax({
    method: 'GET',
    url: `${backendUrl}user/${userId}/scoresheets`
  });
};

const createScoresheet = (scoresheet) => {
  $.ajax({
    method: 'POST',
    url: `${backendUrl}/users/${scoresheet.user_id}/scoresheets`,
    data: {
      scoresheet
    }
  });
};

const updateScoresheet = (scoresheet) => {
  $.ajax({
    method: 'PATCH',
    url: `${backendUrl}scoresheets/${scoresheet.id}`,
    data: {
      scoresheet
    }
  });
};

export const deleteScoresheet = (scoresheetId) => {
  $.ajax({
    method: 'DELETE',
    url: `${backendUrl}scoresheets/${scoresheetId}`,
  });
};
