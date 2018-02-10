import * as ContestAPIUtil from '../util/contest_api_util';
export const RECEIVE_CONTEST = 'RECEIVE_CONTEST';

export const receiveContest = (payload) => ({
  type: RECEIVE_CONTEST,
  payload
});

export const fetchContest = year => async (dispatch) => {
  const payload = await ContestAPIUtil.fetchContest(year);
  dispatch(receiveContest(payload))
}
