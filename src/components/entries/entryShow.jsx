import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { fetchEntry } from "../../actions/entryActions";
import YouTube from "../video/YouTube";

class EntryShow extends React.Component {
  componentDidMount() {
    if (this.props.entry.song_title === "LOADING") {
      this.props.fetchEntry(this.props.entryId);
    }
  }

  render() {
    
    const { entry, country, contest } = this.props;
    debugger
    if (entry.song_title === "LOADING") {
      return <p>Spinner Goes Here</p>;
    } else {
      return (
        <section>
          <h1>
            {entry.song_title}, {entry.artist}
          </h1>
          <h2>{country.name}, {contest.year}</h2>
          <h3>Ranking: {entry.final_ranking}</h3>
          <h3>Score: {entry.final_score}</h3>
          <YouTube url={entry.video_url} />
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
  debugger
  const contest = state.contests[entry.contest_id] || { year: "LOADING"}
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
