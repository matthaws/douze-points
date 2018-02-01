import * as AuthAPIUtil from "../util/auth_api_util";

export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const SIGN_OUT_USER = "SIGN_OUT_USER";

export const receiveCurrentUser = payload => ({
  type: RECEIVE_CURRENT_USER,
  payload
});

export const signOutUser = () => ({
  type: SIGN_OUT_USER
});

export const authenticateUser = socialToken => async dispatch => {
  const payload = await AuthAPIUtil.authenticate(socialToken);
  dispatch(receiveCurrentUser(payload));
};

export const fetchCurrentUser = token => async dispatch => {
  const payload = await AuthAPIUtil.fetchCurrentUser(token);
  dispatch(receiveCurrentUser(payload));
};
