import * as EventAPIUtil from "../util/entry_api_util";

export const RECEIVE_ENTRY = "RECEIVE_ENTRY";

export const receiveEntry = payload => ({
  type: RECEIVE_ENTRY,
  payload
});

export const fetchEntry = entryId => async dispatch => {
  const payload = await EventAPIUtil.fetchEntry(entryId);
  dispatch(receiveEntry(payload));
};
