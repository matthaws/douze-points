import React from "react";
import { connect } from "react-redux";
import { fetchContest } from "../../actions/contest_actions";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

class ContestShow extends React.Component {
  componentDidMount() {
    if (
      this.props.contest.year === "LOADING" ||
      this.props.entries.include(undefined)
    ) {
      this.props.fetchContest(this.props.year);
    }
  }

  render() {
    const { contest, entries } = this.props;
    return (
      <main>
        <div>EuroVision Song Contest {contest.year}</div>
        <ul>
          {entries.map(entry => {
            return (
              <li>
                {entry.song_title}, {entry.artist}
              </li>
            );
          })}
        </ul>
      </main>
    );
  }
}

ContestShow.propTypes = {
  year: PropTypes.string.isRequired,
  contest: PropTypes.object,
  entries: PropTypes.array,
  fetchContest: PropTypes.func.isRequired
};

ContestShow.defaultProps = {
  entries: [],
  contest: { year: "LOADING" }
};

const mapStateToProps = (state, ownProps) => {
  const year = ownProps.match.params.year;
  const contest = state.contests[year] || { year: "LOADING", entry_ids: [] };
  const entries = contest.entry_ids.map(id => {
    return state.entries[id];
  });
  return { year, contest, entries };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchContest: year => dispatch(fetchContest(year))
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ContestShow)
);