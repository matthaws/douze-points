import * as ScoringUtil from '../util/scoring_api_util';
import { fetchScoresheet } from './scoresheet_actions';

export const RECEIVE_SCORING = "RECEIVE_SCORING";
export const REMOVE_SCORING = "REMOVE_SCORING";

export const receiveScoring = payload => ({
  type: RECEIVE_SCORING,
  payload
});

export const removeScoring = scoringId => ({
  type: REMOVE_SCORING,
  scoringId
});

export const createScoring = scoring => async dispatch => {
  const newScoring = await ScoringUtil.createScoring(scoring);
  await dispatch(receiveScoring(newScoring));
  dispatch(fetchScoresheet(newScoring.scoresheet_id));
};

export const updateScoring = scoring => async dispatch => {
  const updatedScoring = await ScoringUtil.updateScoring(scoring);
  await dispatch(receiveScoring(updatedScoring));
  dispatch(fetchScoresheet(updatedScoring.scoresheet_id));
};
