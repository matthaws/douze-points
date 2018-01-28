import React, { Component } from "react";
import { AuthGlobals } from "redux-auth/default-theme";
// import { Switch, Route } from "react-router-dom";
import "./App.css";

class App extends Component {
  render() {
    return (
      <main className="main">
        <AuthGlobals />
        <h1>DOUZE POINTS</h1>
      </main>
    );
  }
}

export default App;
