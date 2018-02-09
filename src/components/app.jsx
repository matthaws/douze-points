import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Switch, BrowserRouter } from "react-router-dom";
import { AuthRoute, ProtectedRoute } from "../util/route_util";
import { authenticateUser, fetchCurrentUser } from "../actions/auth_actions";
import SignIn from "./auth/signIn";
import Welcome from "./welcome/welcome";
import Splash from "./splash/splash";
import ScoresheetsContainer from './scoresheets/scoresheets_container';
import "./App.css";

class App extends Component {
  static propTypes = {
    authenticateUser: PropTypes.func.isRequired
  };

  componentDidMount() {
    if (localStorage.getItem('token')) {
      this.props.fetchCurrentUser(localStorage.getItem(('token')))
    }
  }

  render() {
    return (
      <BrowserRouter>
        <main className="main">
          <AuthRoute exact path="/" component={ Splash } />
          <Route exact path="/scoresheets" component={ ScoresheetsContainer} />
        </main>
      </BrowserRouter>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  authenticateUser: socialToken => dispatch(authenticateUser(socialToken)),
  fetchCurrentUser: token => dispatch(fetchCurrentUser(token))
});

export default connect(null, mapDispatchToProps)(App);
