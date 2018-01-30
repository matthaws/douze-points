import React, { Component } from "react";
import { Switch } from "react-router-dom";
import { AuthRoute, ProtectedRoute } from "../util/route_util";
import SignIn from "./auth/signIn.jsx";
import Welcome from "./welcome/welcome";
import "./App.css";

class App extends Component {
  render() {
    return (
      <main className="main">
        <h1>DOUZE POINTS</h1>
        <Switch>
          <AuthRoute path="/signin" component={SignIn} />
          <ProtectedRoute path="/" component={Welcome} />
        </Switch>
      </main>
    );
  }
}

export default App;
