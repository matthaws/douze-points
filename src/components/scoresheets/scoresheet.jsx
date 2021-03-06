import React from 'react';
import { connect } from 'react-redux';
import { fetchScoresheet, deleteScoresheet } from '../../actions/scoresheet_actions';
import { startSpinner, endSpinner, setSort, setDisplayScoresheet } from '../../actions/uiActions';
import ScoresheetEntry from './scoresheet_entry.jsx';
import './scoresheet.css';

// ========================================
// props / actions

const mapStateToProps = (state, ownProps) => {
  const scoresheet = ownProps.scoresheet || {
    id: 'LOADING',
    entry_ids: [],
    scoring_ids: [],
  };
  const entries = {};
  scoresheet.entry_ids.forEach((id) => {
    entries[id] = state.entries[id];
  });
  const scorings = {};
  const isSpinning = state.ui.spinner;
  scoresheet.scoring_ids.forEach((id) => {
    if (state.scorings[id]) {
      const newScoring = state.scorings[id];
      scorings[newScoring.entry_id] = newScoring;
    }
  });

  const sortBy = state.ui.sortBy || null;

  const { countries } = state;
  return {
    scoresheet, entries, scorings, countries, isSpinning, sortBy,
  };
};

const mapDispatchToProps = dispatch => ({
  fetchScoresheet: scoresheetId => dispatch(fetchScoresheet(scoresheetId)),
  deleteScoresheet: scoresheetId => dispatch(deleteScoresheet(scoresheetId)),
  startSpinner: () => dispatch(startSpinner()),
  endSpinner: () => dispatch(endSpinner()),
  setSort: filter => dispatch(setSort(filter)),
  setDisplayScoresheet: displayId => dispatch(setDisplayScoresheet(displayId)),
});

// =========================================
// component

class Scoresheet extends React.Component {
  static defaultProps = {
    sortBy: null,
  };

  constructor(props) {
    super(props);
    this.state = { renderBonusPoints: false, sortBy: props.sortBy };
  }

  componentDidMount() {
    if (this.props.scoresheet.id === 'LOADING') {
      this.props.startSpinner();
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.scoresheet.id !== this.props.scoresheet.id) {
      this.props.fetchScoresheet(newProps.scoresheet.id);
    } else if (this.props.isSpinning && this.props.scoresheet.id !== 'LOADING') {
      this.props.endSpinner();
    }
    if (newProps.sortBy) {
      this.setState({ sortBy: newProps.sortBy });
    }
  }

  sortEntries(entryComponents, sortBy) {
    switch (sortBy) {
      case 'country':
        return entryComponents.sort((a, b) => {
          if (
            this.props.countries[a.country_id].name.toUpperCase() <
            this.props.countries[b.country_id].name.toUpperCase()
          ) {
            return -1;
          }
          if (
            this.props.countries[a.country_id].name.toUpperCase() >
            this.props.countries[b.country_id].name.toUpperCase()
          ) {
            return 1;
          }
          return 0;
        });
      case 'song_title':
        return entryComponents.sort((a, b) => {
          if (a.song_title.toUpperCase() < b.song_title.toUpperCase()) {
            return -1;
          }
          if (a.song_title.toUpperCase() > b.song_title.toUpperCase()) {
            return 1;
          }
          return 0;
        });
      case 'artist':
        return entryComponents.sort((a, b) => {
          if (a.artist.toUpperCase() < b.artist.toUpperCase()) {
            return -1;
          }
          if (a.artist.toUpperCase() > b.artist.toUpperCase()) {
            return 1;
          }
          return 0;
        });
      case 'total_score':
        return entryComponents.sort((a, b) => {
          const aScoring = this.props.scorings[a.id];
          const bScoring = this.props.scorings[b.id];
          let aScore =
            aScoring === undefined
              ? 0
              : (aScoring.cheese_score || 0) +
                (aScoring.song_score || 0) +
                (aScoring.costume_score || 0) +
                (aScoring.dance_score || 0);
          let bScore =
            bScoring === undefined
              ? 0
              : (bScoring.cheese_score || 0) +
                (bScoring.song_score || 0) +
                (bScoring.costume_score || 0) +
                (bScoring.dance_score || 0);
          if (this.state.renderBonusPoints) {
            aScore += aScoring === undefined ? 0 : aScoring.bonus_points || 0;
            bScore += bScoring === undefined ? 0 : bScoring.bonus_points || 0;
          }
          return bScore - aScore;
        });
      default:
        return entryComponents;
    }
  }

  deleteScoresheet(e) {
    e.preventDefault();
    this.props.deleteScoresheet(this.props.scoresheet.id);
    this.props.setDisplayScoresheet(null);
  }

  createEntries() {
    if (this.props.scoresheet.id !== 'LOADING') {
      let entryComponents = Object.values(this.props.entries);

      if (this.state.sortBy && !entryComponents.includes(undefined)) {
        entryComponents = this.sortEntries(entryComponents, this.state.sortBy);
      }

      return entryComponents.map((entry) => {
        if (entry) {
          const scoring = this.props.scorings[entry.id];
          return (
            <li key={entry.id}>
              <ScoresheetEntry
                entry={entry}
                scoring={scoring}
                country={this.props.countries[entry.country_id]}
                scoresheetId={this.props.scoresheet.id}
                renderBonusPoints={this.state.renderBonusPoints}
              />
            </li>
          );
        }
        return null;
      });
    }
    return <li>Loading...</li>;
  }

  toggleBonusPoints() {
    this.setState({ renderBonusPoints: !this.state.renderBonusPoints });
  }

  setSortFilter(filter) {
    return (e) => {
      e.preventDefault();
      this.props.setSort(filter);
    };
  }

  render() {

    const scoresheetEntries = this.createEntries();
    const { sortBy } = this.props;

    return (
      <section className="section--scoresheet-main">
        <table className="table--scoresheet-headers">
          <tbody>
            <tr className="tr--scoresheet-header-row">
              <th>
                <div>
                  <p>Country</p>
                  <button onClick={this.setSortFilter('country')}>
                    {sortBy === 'country' ? String.fromCharCode(9650) : String.fromCharCode(9660)}
                  </button>
                </div>
              </th>
              <th>
                <div>
                  <p>Song Title</p>
                  <button onClick={this.setSortFilter('song_title')}>
                    {sortBy === 'song_title' ? String.fromCharCode(9650) : String.fromCharCode(9660)}
                  </button>
                </div>
              </th>
              <th>
                <div>
                  <p>Song Artist</p>
                  <button onClick={this.setSortFilter('artist')}>
                    {sortBy === 'artist' ? String.fromCharCode(9650) : String.fromCharCode(9660)}
                  </button>
                </div>
              </th>
              <th>
                <div>
                    <p>Your Total Score</p>
                  <button onClick={this.setSortFilter('total_score')}>
                    {sortBy === 'total_score' ? String.fromCharCode(9650) : String.fromCharCode(9660)}
                  </button>
                  <label className="label--bonus_points">
                    Add Bonus Points?
                    <input type="checkbox" onChange={() => this.toggleBonusPoints()} />
                  </label>
                </div>
              </th>
              <th />
            </tr>
          </tbody>
        </table>
        <ul>{scoresheetEntries}</ul>
        <div>
          { this.props.scoresheet.id !== "LOADING"
            ? <button
                id="button--delete-scoresheet"
                onClick={ e => this.deleteScoresheet(e) }>
                Delete this scoresheet</button>
            : null }
        </div>
      </section>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Scoresheet);
