import * as ScoresheetUtil from '../util/scoresheet_util';

const RECEIVE_SCORESHEETS = "RECEIVE_SCORESHEETS";
const RECEIVE_SCORESHEET = "RECEIVE_SCORESHEET";
const REMOVE_SCORESHEET = "REMOVE_SCORESHEET";

export const receiveScoresheet = scoresheet => ({
  type: RECEIVE_SCORESHEET,
  scoresheet
});

export const receiveScoresheets = scoresheets => ({
  type: RECEIVE_SCORESHEETS,
  scoresheets
});

export const removeScoresheet = scoresheetId => ({
  type: REMOVE_SCORESHEET,
  scoresheetId,
});

export const fetchScoresheet = scoresheetId => async dispatch => {
  const scoresheet = await ScoresheetUtil.fetchScoresheet(scoresheetId);
  dispatch(receiveScoresheet(scoresheet));
};

export const fetchScoresheets = userId => async dispatch => {
  const scoresheets = await ScoresheetUtil.fetchScoresheets(userId);
  dispatch(receiveScoresheets(scoresheets));
};
