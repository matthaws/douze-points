import React from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { signOutUser } from "../../actions/authActions";
import SignIn from "../auth/signIn";
import "./navbar.css";

class Navbar extends React.Component {
  render() {
    const button = this.props.loggedIn ? (
      <button onClick={this.props.signOutUser} className="Link--logout" to="/">
        Logout
      </button>
    ) : (
      <SignIn />
    );
    return (
      <main className="main--navbar">
        <Link className="Link--logo" to="/home">
          {"{12} Douze Points!"}
        </Link>
        <Link className="Link--scoresheets" to="/scoresheets">
          Scoresheets
        </Link>
        <Link className="Link--contests" to="/contests">
          Contests
        </Link>
        <Link className="Link--home" to="/">
          Home
        </Link>
      { button }
      </main>
    );
  }
}

const mapStateToProps = () => {
  const loggedIn = Boolean(sessionStorage.getItem("token"));
  return {
    loggedIn
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  signOutUser: async () => {
    await dispatch(signOutUser())
    ownProps.history.push("/");
  }
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navbar));
