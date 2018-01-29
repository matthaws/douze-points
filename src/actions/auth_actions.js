import * as AuthAPIUtil from "../util/auth_api_util" ;

export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";

export const receiveCurrentUser = currentUser => ({
  type: RECEIVE_CURRENT_USER,
  user: currentUser
});

export const authenticateUser = (network, socialToken) => async (dispatch) => {
  const user = await AuthAPIUtil.authenticate(network, socialToken);
}
