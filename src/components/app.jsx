import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Switch, BrowserRouter, Route } from "react-router-dom";
import { AuthRoute, ProtectedRoute } from "../util/route_util";
import { authenticateUser, fetchCurrentUser } from "../actions/authActions";
import { fetchAllCountries } from "../actions/countryActions";
import Splash from "./splash/splash";
import ScoresheetsContainer from "./scoresheets/scoresheets";
import UserProfile from "./userProfile/userProfile";
import "./App.css";
import ContestShow from "./contests/contestShow";

class App extends Component {
  static propTypes = {
    authenticateUser: PropTypes.func.isRequired,
    fetchCurrentUser: PropTypes.func.isRequired,
    fetchAllCountries: PropTypes.func.isRequired
  };

  componentDidMount() {
    if (localStorage.getItem("token")) {
      this.props.fetchCurrentUser(localStorage.getItem("token"));
    } else {
      this.props.fetchAllCountries();
    }
  }

  render() {
    return (
      <BrowserRouter>
        <main className="main">
          <Switch>
            <Route exact path="/scoresheets" component={ScoresheetsContainer} />
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
  fetchCurrentUser: token => dispatch(fetchCurrentUser(token)),
  fetchAllCountries: () => dispatch(fetchAllCountries())
});

export default connect(null, mapDispatchToProps)(App);
