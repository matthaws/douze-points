import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Switch, BrowserRouter } from "react-router-dom";
import { AuthRoute, ProtectedRoute } from "../util/route_util";
import { authenticateUser } from "../actions/auth_actions";
import SignIn from "./auth/signIn.jsx";
import Welcome from "./welcome/welcome";
import "./App.css";

class App extends Component {
  static propTypes = {
    authenticateUser: PropTypes.func.isRequired
  };

  componentDidMount() {
    if (window.FB) {
      window.FB.getLoginStatus(response => {
        if (response.status === "connected") {
          const socialToken = response.authResponse.accessToken;
          this.props.authenticateUser(socialToken);
        }
      });
    }
  }

  render() {
    return (
      <BrowserRouter>
        <main className="main">
          <h1>DOUZE POINTS</h1>
          <Switch>
            <ProtectedRoute exact path="/welcome" component={Welcome} />
            <AuthRoute exact path="/signin" component={SignIn} />
          </Switch>
        </main>
      </BrowserRouter>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  authenticateUser: socialToken => dispatch(authenticateUser(socialToken))
});

export default connect(null, mapDispatchToProps)(App);
