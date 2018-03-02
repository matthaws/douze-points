import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { fetchEntry } from "../../actions/entryActions";
import { startSpinner, endSpinner } from "../../actions/uiActions";
import YouTube from "../video/YouTube";
import BackArrow from "../../assets/001-back.png";
import NextArrow from "../../assets/002-next.png";
import "./entryShow.css";

class EntryShow extends React.Component {
  componentDidMount() {
    if (this.props.entry.song_title === "LOADING") {
      this.props.startSpinner();
      this.props.fetchEntry(this.props.entryId);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.entry.song_title === "LOADING") {
      if (!this.props.isSpinning) {
        this.props.startSpinner();
      }
      this.props.fetchEntry(nextProps.entryId);
    } else if (
      this.props.isSpinning &&
      nextProps.entry.song_title !== "LOADING"
    ) {
      this.props.endSpinner();
    }
  }

  render() {
    const { entry, country, contest, entryId } = this.props;
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
          <article className="article--countryName">
            <img alt="country-flag" src={country.flag_url} />
            {country.name}, {contest.year}
            <br />
            <p className="p--songDetails">
              {entry.song_title}, {entry.artist}
            </p>
          </article>
          <aside className="aside--details">
            <h3>Ranking: {entry.final_ranking}</h3>
            <h3>Score: {entry.final_score}</h3>
          </aside>
          <figure className="figure--YouTube">
            <Link className="Link--backArrow" to={`/entries/${prevEntryId}`}>
              <img alt="back-arrow" src={BackArrow} />
            </Link>
            <YouTube width={"1280"} height={"720"} url={entry.video_url} />
            <Link className="Link--nextArrow" to={`/entries/${nextEntryId}`}>
              <img alt="next-arrow" src={NextArrow} />
            </Link>
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
  contest: PropTypes.object,
  startSpinner: PropTypes.func.isRequired,
  endSpinner: PropTypes.func.isRequired,
  isSpinning: PropTypes.bool.isRequired
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

  const isSpinning = state.ui.spinner;

  return {
    entryId,
    entry,
    country,
    contest,
    isSpinning
  };
};

const mapDispatchToProps = dispatch => ({
  fetchEntry: id => dispatch(fetchEntry(id)),
  startSpinner: () => dispatch(startSpinner()),
  endSpinner: () => dispatch(endSpinner())
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(EntryShow)
);
