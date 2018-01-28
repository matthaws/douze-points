import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import SignIn from "./auth/signIn.jsx";
import "./App.css";

class App extends Component {
  render() {
    return (
      <main className="main">
        <h1>DOUZE POINTS</h1>
        <Switch>
          <Route path="/signin" component={SignIn} />
        </Switch>
      </main>
    );
  }
}

export default App;
