import * as ContestAPIUtil from "../util/contest_api_util";
import { fetchEntry } from "./entryActions";
export const RECEIVE_CONTEST = "RECEIVE_CONTEST";
export const RECEIVE_CONTESTS = "RECEIVE_CONTESTS";

export const receiveContest = payload => ({
  type: RECEIVE_CONTEST,
  payload
});

export const receiveContests = payload => ({
  type: RECEIVE_CONTESTS,
  payload
});

export const fetchContests = () => async dispatch => {
  const payload = await ContestAPIUtil.fetchContests();
  Object.keys(payload.contests).forEach( contest_id => {
    dispatch(fetchEntry(payload.contests[contest_id].winning_entry_id));
  });
  dispatch(receiveContests(payload));
};

export const fetchContest = year => async dispatch => {
  const payload = await ContestAPIUtil.fetchContest(year);
  dispatch(receiveContest(payload));
};
