import React from "react";
import EntryIndexItem from "../entries/entryIndexItem";
import EntryQuickView from "../entries/entryQuickView";
import { connect } from "react-redux";
import { fetchContest } from "../../actions/contest_actions";
import { startSpinner, endSpinner } from "../../actions/uiActions";
import { withRouter, Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./contestShow.css";

class ContestShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = { entry: null };
    this.switchQuickView = this.switchQuickView.bind(this);
  }

  componentDidMount() {
    if (
      this.props.contest.year === "LOADING" ||
      this.props.entries.includes(undefined)
    ) {
      this.props.startSpinner();
      this.props.fetchContest(this.props.year);
    }
  }

  componentWillReceiveProps() {
    if (this.props.isSpinning) {
      this.props.endSpinner();
    }
  }

  switchQuickView(index) {
    this.setState({ entry: this.props.entries[index] });
  }

  render() {
    const { contest, entries, countries } = this.props;
    return (
      <main className="main--contestShowPage">
        <div className="left-side-show">
          <div className="div--contest-title">
            EuroVision Song Contest {contest.year}
          </div>
          <ul className="ul--entries">
            {entries.map((entry, idx) => {
              if (entry) {
                return (
                  <EntryIndexItem
                    entry={entry}
                    switchQuickView={() => this.switchQuickView(idx)}
                    country={countries[entry.country_id]}
                  />
                );
              }
            })}
          </ul>
        </div>
        {this.state.entry ? (
          <EntryQuickView entry={this.state.entry} countries={countries} />
        ) : (
          null
        )}
      </main>
    );
  }
}

ContestShow.propTypes = {
  year: PropTypes.string.isRequired,
  contest: PropTypes.object,
  entries: PropTypes.array,
  fetchContest: PropTypes.func.isRequired,
  startSpinner: PropTypes.func.isRequired,
  endSpinner: PropTypes.func.isRequired,
  isSpinning: PropTypes.bool.isRequired
};

ContestShow.defaultProps = {
  entries: [],
  contest: { year: "LOADING" }
};

const findContestYear = (year, contests) => {
  let match;
  Object.values(contests).forEach(contest => {
    if (contest.year === parseInt(year)) {
      match = contest;
    }
  });
  return match;
};

const mapStateToProps = (state, ownProps) => {
  const { countries, contests } = state;
  const year = ownProps.match.params.year;
  const contest = findContestYear(year, contests) || {
    year: "LOADING",
    entry_ids: []
  };
  const entries = contest.entry_ids.map(id => {
    return state.entries[id];
  });
  const isSpinning = state.ui.spinner;
  return { year, contest, entries, countries, isSpinning };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchContest: year => dispatch(fetchContest(year)),
  startSpinner: () => dispatch(startSpinner()),
  endSpinner: () => dispatch(endSpinner())
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ContestShow)
);
