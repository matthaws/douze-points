import * as ScoresheetUtil from "../util/scoresheet_util";

export const RECEIVE_SCORESHEETS = "RECEIVE_SCORESHEETS";
export const RECEIVE_SCORESHEET = "RECEIVE_SCORESHEET";
export const REMOVE_SCORESHEET = "REMOVE_SCORESHEET";

export const receiveScoresheet = payload => ({
  type: RECEIVE_SCORESHEET,
  payload
});

export const receiveScoresheets = payload => ({
  type: RECEIVE_SCORESHEETS,
  payload
});

export const removeScoresheet = scoresheetId => ({
  type: REMOVE_SCORESHEET,
  scoresheetId
});

export const fetchScoresheet = scoresheetId => async dispatch => {
  const scoresheet = await ScoresheetUtil.fetchScoresheet(scoresheetId);
  dispatch(receiveScoresheet(scoresheet));
};

export const fetchScoresheets = userId => async dispatch => {
  const scoresheets = await ScoresheetUtil.fetchScoresheets(userId);
  dispatch(receiveScoresheets(scoresheets));
};

export const createScoresheet = scoresheet => async dispatch => {
  const newScoresheet = await ScoresheetUtil.createScoresheet(scoresheet);
  dispatch(receiveScoresheet(newScoresheet));
};

export const deleteScoresheet = scoresheetId => async dispatch => {
  await ScoresheetUtil.deleteScoresheet(scoresheetId);
  dispatch(removeScoresheet(scoresheetId));
};
