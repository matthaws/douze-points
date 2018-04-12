import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import './contestShow.css';
import EntryIndexItem from '../entries/entryIndexItem';
import EntryQuickView from '../entries/entryQuickView';
import { fetchContest } from '../../actions/contest_actions';
import { fetchScoresheets } from '../../actions/scoresheet_actions';
import { startSpinner, endSpinner } from '../../actions/uiActions';

class ContestShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = { entry: null };
    this.switchQuickView = this.switchQuickView.bind(this);
    this.closeQuickView = this.closeQuickView.bind(this);
  }

  componentDidMount() {
    if (
      this.props.contest.year === 'LOADING' ||
      this.props.entries.includes(undefined)
    ) {
      this.props.startSpinner();
      this.props.fetchContest(this.props.year);
    }
  }

  componentWillReceiveProps(newProps) {
    if (this.props.isSpinning) {
      this.props.endSpinner();
    }
    if (newProps.currentUser && !this.props.currentUser) {
      this.props.fetchScoresheets(newProps.currentUser.id);
    }
  }

  switchQuickView(index) {
    this.setState({ entry: this.props.entries[index] });
  }

  closeQuickView() {
    this.setState({ entry: null });
  }

  render() {
    const { contest, entries, countries } = this.props;
    const space = this.state.entry ? "half" : "full";
    return (
      <main className="main--contestShowPage">
        <div className="div--contest-title">
          <p>EuroVision Song Contest {contest.year}</p>
        </div>
        <div className={`left-side-show-${space}`}>
          <ul className="ul--entries">
            {entries.map((entry, idx) => {
              if (entry) {
                return (
                  <EntryIndexItem
                    entry={entry}
                    switchQuickView={() => this.switchQuickView(idx)}
                    country={countries[entry.country_id]}
                    key={entry.id}
                  />
                );
              }
            })}
          </ul>
        </div>
        {this.state.entry ? (
          <EntryQuickView
            entry={this.state.entry}
            scoresheets={this.props.scoresheets}
            countries={countries}
            closeQuickView={this.closeQuickView}
            currentUser={this.props.currentUser}
          />
        ) : null}
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

const sort_by_year = (a, b) => {
  if (parseInt(a.final_ranking) < parseInt(b.final_ranking)) {
    return -1;
  } else {
    return 1;
  }
}

const mapStateToProps = (state, ownProps) => {
  const { countries, contests, scoresheets, auth: { currentUser } } = state;
  const year = ownProps.match.params.year;
  const contest = findContestYear(year, contests) || {
    year: "LOADING",
    entry_ids: []
  };
  const entries = contest.entry_ids.map(id => {
    return state.entries[id];
  }).sort(sort_by_year);

  const isSpinning = state.ui.spinner;
  return { year, contest, entries, countries, isSpinning, currentUser, scoresheets };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchContest: year => dispatch(fetchContest(year)),
  fetchScoresheets: userId => dispatch(fetchScoresheets(userId)),
  startSpinner: () => dispatch(startSpinner()),
  endSpinner: () => dispatch(endSpinner()),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ContestShow)
);
