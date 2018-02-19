import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { fetchEntry } from "../../actions/entryActions";
import YouTube from "../video/YouTube";
import BackArrow from "../../assets/001-back.png";
import NextArrow from "../../assets/002-next.png";
import "./entryShow.css";

class EntryShow extends React.Component {
  componentDidMount() {
    if (this.props.entry.song_title === "LOADING") {
      this.props.fetchEntry(this.props.entryId);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.entry.song_title === "LOADING") {
      this.props.fetchEntry(nextProps.entryId);
    }
  }

  render() {
    const { entry, country, contest, entryId } = this.props;
    debugger;
    let prevEntryId = parseInt(entryId) - 1;
    if (contest && !contest.entry_ids.includes(prevEntryId)) {
      prevEntryId = contest.entry_ids[contest.entry_ids.length - 1];
    }

    let nextEntryId = parseInt(entryId) + 1;
    if (contest && !contest.entry_ids.includes(nextEntryId)) {
      nextEntryId = contest.entry_ids[0];
    }

    if (entry.song_title === "LOADING") {
      return <p>Spinner Goes Here</p>;
    } else {
      return (
        <section className="section--entryShow">
          <Link className="Link--backArrow" to={`/entries/${prevEntryId}`}>
            <img src={BackArrow} />
          </Link>
          <article className="article--countryName">
            <img src={country.flag_url} />
            {country.name}, {contest.year}
            <br></br>
            <p className="p--songDetails">
              {entry.song_title}, {entry.artist}
            </p>
          </article>
          <Link className="Link--nextArrow" to={`/entries/${nextEntryId}`}>
            <img src={NextArrow} />
          </Link>
          <aside className="aside--details">
            <h3>Ranking: {entry.final_ranking}</h3>
            <h3>Score: {entry.final_score}</h3>
          </aside>
          <figure className="figure--YouTube">
            <YouTube url={entry.video_url} />
          </figure>
        </section>
      );
    }
  }
}

EntryShow.propTypes = {
  entryId: PropTypes.string.isRequired,
  entry: PropTypes.object,
  country: PropTypes.object,
  contest: PropTypes.object
};

const mapStateToProps = (state, ownProps) => {
  const entryId = ownProps.match.params.id;
  const entry = state.entries[entryId] || { song_title: "LOADING" };
  const contest = state.contests[entry.contest_id] || {
    year: "LOADING",
    entry_ids: []
  };
  const country = state.countries[entry.country_id] || {
    name: "LOADING",
    flag_url: "/defaultflag"
  };

  return {
    entryId,
    entry,
    country,
    contest
  };
};

const mapDispatchToProps = dispatch => ({
  fetchEntry: id => dispatch(fetchEntry(id))
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(EntryShow)
);
