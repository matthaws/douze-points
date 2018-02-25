import React from 'react';
import "./splash.css";

const Splash = () => {

  return (
    <section className="section--splash">
      <div className="div--splashnav">
        <nav className="nav--splashnav">
          <h1 className="h1--splashnav">DOUZE POINTS!</h1>
        </nav>
      </div>
      <div className="div--splashmsg">
        <p className="unofficial">The Unofficial Scoring App for the 2018</p>
        <p className="eurovision">Eurovision</p>
        <p className="songcontest">Song Contest</p>
      </div>
      <div className="div--whatisthis">

      </div>
    </section>
  );
};

export default Splash;
