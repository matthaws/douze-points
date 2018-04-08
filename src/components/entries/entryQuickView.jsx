import React from "react";
import PropTypes from "prop-types";
import Sticky from "react-stickynode";
import { Link } from "react-router-dom";
import "./entryQuickView.css";
import YouTube from "../video/YouTube";
import EntryQuickscore from '../scoresheets/entry_quickscore';


const EntryQuickView = ({ entry, countries, closeQuickView, scoresheets }) => {
  if (entry) {
    let country = countries[entry.country_id];
    return (
      <aside id="pop-out">
        <div id="quick-view">
          <Sticky>
            <header>
              <img src={country.flag_url} />
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

            <EntryQuickscore
              scoresheets={ scoresheets }
              entry={ entry }
            />
          </Sticky>
        </div>
      </aside>
    );
  } else {
    return "";
  }
};

export default EntryQuickView;
