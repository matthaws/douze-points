import React from "react";
import PropTypes from "prop-types";
import YouTube from "../video/YouTube";
import Sticky from "react-stickynode";
import { Link } from "react-router-dom";
import "./entryQuickView.css";

const EntryQuickView = ({ entry, countries }) => {
  if (entry) {
    let country = countries[entry.country_id];
    return (
      <aside id="pop-out">
        <div id="quick-view">
          <Sticky>
            <img src={country.flag_url} />
            <header>
              <Link to={`/entries/${entry.id}`}>
                {entry.song_title}, {entry.artist}
                <br />
                {country.name}
              </Link>
            </header>

            <YouTube url={entry.video_url} />
          </Sticky>
        </div>
      </aside>
    );
  } else {
    return "";
  }
};

export default EntryQuickView;
