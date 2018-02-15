import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchScoresheet, removeScoresheet } from '../../actions/scoresheet_actions';
import merge from "lodash/merge";
import ScoresheetEntry from './scoresheet_entry.jsx';
import './scoresheet.css';

//=========================================
// props / actions

const mapStateToProps = (state, ownProps) => {
  const scoresheet = ownProps.scoresheet || { id: 'LOADING', entry_ids: [], scoring_ids: [] };
  const entries = {};
  scoresheet.entry_ids.forEach( (id) => {
    entries[id] = state.entries[id];
  });
  const scorings = scoresheet.scoring_ids.map( (id) => {
    return state.scorings[id];
  }) || [];
  const countries = state.countries;
  return { scoresheet, entries, scorings, countries };
};

const mapDispatchToProps = (dispatch) => ({
  fetchScoresheet: (scoresheetId) => dispatch(fetchScoresheet(scoresheetId)),
  removeScoresheet: (scoresheetId) => dispatch(removeScoresheet(scoresheetId)),
});

//=========================================
// component

class Scoresheet extends React.Component {

  componentWillReceiveProps(newProps) {
    if (newProps.scoresheet.id !== this.props.scoresheet.id) {
      this.props.fetchScoresheet(newProps.scoresheet.id);
    }
  }

  createEntries() {
    if (this.props.scoresheet.id !== "LOADING") {
      this.props.scorings.forEach( (scoring) => {
        if (scoring) {
          this.props.entries[scoring.entry_id].scoring = scoring;
        }
      });

      let entryComponents = Object.values(this.props.entries);

      return entryComponents.map( (entry) => {
        if (entry) {
          return <li key={entry.id}><ScoresheetEntry entry={entry} country={this.props.countries[entry.country_id]} /></li>;
        } else {
          return null;
        }
      });

    } else {
      return <li>Loading...</li>;
    }
  }

  render () {
    return(
      <section className="section--scoresheet-main">
        <p>{ this.props.scoresheet.name }</p>
        <table className="table--scoresheet-headers">
          <tbody>
            <tr className="tr--scoresheet-header-row">
              <th>Country</th>
              <th>Song Title</th>
              <th>Song Artist</th>
            </tr>
          </tbody>
        </table>
        <ul>
          { this.createEntries() }
        </ul>
      </section>
    );
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(Scoresheet);
