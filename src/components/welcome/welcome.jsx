import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { signOutUser } from "../../actions/authActions";

const Welcome = ({ currentUser, signOutUser }) => {
  const signOut = () => {
      signOutUser();
  };

  const username = currentUser ? currentUser.username : "friend!";
  const pic = currentUser ? (
    <img alt="profile-pic" src={currentUser.avatar_url} />
  ) : (
    ""
  );

  return (
    <main>
      <h1>Welcome, {username}</h1>
      {pic}
      <button onClick={signOut}>Sign Out</button>
    </main>
  );
};

Welcome.propTypes = {
  currentUser: PropTypes.object
};

Welcome.defaultProps = {
  currentUser: {
    username: "friend!"
  }
};

const mapStateToProps = state => ({
  currentUser: state.auth.currentUser
});

const mapDispatchToProps = dispatch => ({
  signOutUser: () => dispatch(signOutUser())
});

export default connect(mapStateToProps, mapDispatchToProps)(Welcome);
