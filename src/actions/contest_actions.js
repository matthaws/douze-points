import * as ContestAPIUtil from "../util/contest_api_util";
import { receiveEntry } from "./entryActions";
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
    const winning_entry = {
      entry: payload.contests[contest_id].winning_entry,
      contest: payload.contests[contest_id],
    };
    dispatch(receiveEntry(winning_entry));
  });
  dispatch(receiveContests(payload));
};

export const fetchContest = year => async dispatch => {
  const payload = await ContestAPIUtil.fetchContest(year);
  dispatch(receiveContest(payload));
};
