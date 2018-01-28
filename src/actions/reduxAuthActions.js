import { generateAuthActions } from "redux-token-auth";
import { authUrl } from "../util/constants";

const config = {
  authUrl,
  userAttributes: {
    username: "username",
    name: "name",
    imageUrl: "image",
    bio: "bio"
  },
  userRegistrationAttributes: {
    username: "username"
  }
};

const {
  registerUser,
  signInUser,
  signOutUser,
  verifyCredentials
} = generateAuthActions(config);

export { registerUser, signInUser, signOutUser, verifyCredentials };
