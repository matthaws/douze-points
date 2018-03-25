import React from "react";
import PropTypes from "prop-types";
import YouTube from "../video/YouTube";
import "./entryQuickView.css"

const EntryQuickView = ({ entry, countries }) => {
  if (entry) {
    let country = countries[entry.country_id]
    return (
      <aside id="pop-out">
        <div id="quick-view">
        <img src={country.flag_url} />
        <header>
          {entry.song_title}, {entry.artist}
          <br></br>
          {country.name}
        </header>

        <YouTube url={entry.video_url} />
      </div>
      </aside>
    )
  } else {
    return "";
  }
};

export default EntryQuickView;
