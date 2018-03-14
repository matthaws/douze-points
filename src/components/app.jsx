import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Switch, BrowserRouter, Route } from "react-router-dom";
import { AuthRoute, ProtectedRoute } from "../util/route_util";
import { authenticateUser, fetchCurrentUser } from "../actions/authActions";
import { fetchAllCountries } from "../actions/countryActions";
import Splash from "./splash/splash";
import ScoresheetsContainer from "./scoresheets/scoresheets_container";
import MyScoresheetsContainer from "./scoresheets/my_scoresheets_container";
import UserProfile from "./userProfile/userProfile";
import "./App.css";
import ContestShow from "./contests/contestShow";
import ContestIndex from "./contests/contestIndex";
import EntryShow from "./entries/entryShow";
import Navbar from "./navbar/navbar";
import Footer from "./footer/footer";

class App extends Component {
  static propTypes = {
    authenticateUser: PropTypes.func.isRequired,
    fetchCurrentUser: PropTypes.func.isRequired,
    fetchAllCountries: PropTypes.func.isRequired,
    spinnerOn: PropTypes.bool.isRequired
  };

  componentDidMount() {
    if (sessionStorage.getItem("token")) {
      this.props.fetchCurrentUser(sessionStorage.getItem("token"));
    } else {
      this.props.fetchAllCountries();
    }
  }

  render() {
    const { spinnerOn } = this.props;
    const spinner = spinnerOn ? (
      <div className="div--spinnerModal">
        <div className="div--spinner" />
      </div>
    ) : (
      ""
    );
    return (
      <BrowserRouter>
        <main className="main">
          <Navbar />
          {spinner}
          <Switch>
            <ProtectedRoute
              exact
              path="/scoresheets"
              component={MyScoresheetsContainer}
            />
            <Route exact path="/users/:id" component={UserProfile} />
            <Route exact path="/contests" component={ContestIndex} />
            <Route exact path="/contests/:year" component={ContestShow} />
            <Route exact path="/entries/:id" component={EntryShow} />
            <AuthRoute exact path="/" component={Splash} />
          </Switch>
          <Footer />
        </main>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => ({
  spinnerOn: state.ui.spinner
});

const mapDispatchToProps = dispatch => ({
  authenticateUser: socialToken => dispatch(authenticateUser(socialToken)),
  fetchCurrentUser: token => dispatch(fetchCurrentUser(token)),
  fetchAllCountries: () => dispatch(fetchAllCountries())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
