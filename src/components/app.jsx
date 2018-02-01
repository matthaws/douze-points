import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Switch, BrowserRouter } from "react-router-dom";
import { AuthRoute, ProtectedRoute } from "../util/route_util";
import { authenticateUser, fetchCurrentUser } from "../actions/auth_actions";
import SignIn from "./auth/signIn.jsx";
import Welcome from "./welcome/welcome";
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
  authenticateUser: socialToken => dispatch(authenticateUser(socialToken)),
  fetchCurrentUser: token => dispatch(fetchCurrentUser(token))
});

export default connect(null, mapDispatchToProps)(App);
