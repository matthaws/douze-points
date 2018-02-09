import React from 'react';
import SignIn from "../auth/signIn";
import "./splash.css";

const Splash = () => {

  return (
    <section className="section--splash">
      <div className="div--splashnav">
        <nav className="nav--splashnav">
          <h1 classname="h1--splashnav">DOUZE POINTS!</h1>
          <SignIn />
        </nav>
      </div>
      <div className="div--splashmsg">
        <p className="unofficial">The Unofficial Scoring App for the 2018</p>
        <p className="eurovision">Eurovision</p>
        <p className="songcontest">Song Contest</p>
      </div>
    </section>
  );
};

export default Splash;
