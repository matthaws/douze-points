import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { signOutUser } from "../../actions/auth_actions";

const Welcome = ({ currentUser, signOutUser }) => {
  const signOut = () => {
    window.FB.logout(response => {
      signOutUser();
    });
  };
  return (
    <main>
      <h1>Welcome, {currentUser.username}</h1>
      <img alt="profile-pic" src={currentUser.avatar_url} />
      <button onClick={signOut}>Sign Out</button>
    </main>
  );
};

Welcome.propTypes = {
  currentUser: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  currentUser: state.auth.currentUser
});

const mapDispatchToProps = dispatch => ({
  signOutUser: () => dispatch(signOutUser())
});

export default connect(mapStateToProps, mapDispatchToProps)(Welcome);
