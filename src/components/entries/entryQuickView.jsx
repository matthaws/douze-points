import React from "react";
import PropTypes from "prop-types";
import Sticky from "react-stickynode";
import { Link } from "react-router-dom";
import "./entryQuickView.css";
import YouTube from "../video/YouTube";
import EntryQuickscore from '../scoresheets/entry_quickscore';


const EntryQuickView = ({ entry, countries, closeQuickView, scoresheets, currentUser }) => {
  if (entry) {
    let country = countries[entry.country_id];
    return (
      <aside id="pop-out">
        <div id="quick-view">
          <img src={country.flag_url} />
          <Sticky>
            <header>
              <p className="p--closeX" onClick={closeQuickView}>
                {String.fromCharCode(215)}
              </p>
              <Link to={`/entries/${entry.id}`}>
                {entry.song_title}, {entry.artist}
                <br />
                {country.name}
              </Link>
            </header>

            <YouTube url={entry.video_url} />

            { currentUser
              ? <EntryQuickscore
              scoresheets={ scoresheets }
              entry={ entry }
              /> : <p>Log In or Sign Up to score!</p> }
          </Sticky>
        </div>
      </aside>
    );
  } else {
    return "";
  }
};

export default EntryQuickView;
