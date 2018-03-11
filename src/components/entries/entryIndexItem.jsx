import React from "react";
import { Link } from "react-router-dom";
import Gold from "../../assets/gold.png";
import Silver from "../../assets/silver.png";
import Bronze from "../../assets/bronze.png";
import "./entryIndexItem.css";

const EntryIndexItem = ({ entry, country }) => {
  const flag_url = country ? country.flag_url : "";
  debugger
  let medal;
  switch (entry.final_ranking) {
    case 1:
      medal = <img alt="gold-medal" src={Gold} className="img--medal" />;
      break;
    case 2:
      medal = <img alt="silver-medal" src={Silver} className="img--medal" />;
      break;
    case 3:
      medal = <img alt="bronze-medal" src={Bronze} className="img--medal" />;
      break;
    default:
      medal = "";
  }

  return (
    <Link to={`/entries/${entry.id}`}>
      <li className="li--entry">
        <img alt="country-flag" src={flag_url} className="img--flag" />
        <span className="span--entry">
          {entry.song_title}, {entry.artist}
        </span>
        {medal}
        <span className="span--rank">#{entry.final_ranking}</span>
      </li>
    </Link>
  );
};

export default EntryIndexItem;
