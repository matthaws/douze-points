import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Switch, BrowserRouter, Route } from "react-router-dom";
import { AuthRoute, ProtectedRoute } from "../util/route_util";
import { authenticateUser, fetchCurrentUser } from "../actions/authActions";
import Splash from "./splash/splash";
import ScoresheetsContainer from "./scoresheets/scoresheets_container";
import MyScoresheetsContainer from "./scoresheets/my_scoresheets_container";
import UserProfile from "./userProfile/userProfile";
import "./App.css";
import ContestShow from './contests/contestShow'

class App extends Component {
  static propTypes = {
    authenticateUser: PropTypes.func.isRequired,
    fetchCurrentUser: PropTypes.func.isRequired
  };

  componentDidMount() {
    if (localStorage.getItem("token")) {
      this.props.fetchCurrentUser(localStorage.getItem("token"));
    }
  }

  render() {
    return (
      <BrowserRouter>
        <main className="main">
          <Switch>
            <Route exact path="/scoresheets" component={MyScoresheetsContainer} />
            <Route exact path="/users/:id" component={UserProfile} />
            <Route exact path="/contests/:year" component={ContestShow} />
            <AuthRoute exact path="/" component={Splash} />
          </Switch>
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
