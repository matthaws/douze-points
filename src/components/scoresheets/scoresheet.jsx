import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchScoresheet, removeScoresheet } from '../../actions/scoresheet_actions';
import merge from "lodash/merge";
import Entry from './entry.jsx';
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
  return { scoresheet, entries, scorings };
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
      // Object.values(this.props.entries).forEach( (entry) => {
      //   if (entry) {
      //     entry.scoring = "default";
      //   }
      // });
      this.props.scorings.forEach( (scoring) => {
        if (scoring) {
          this.props.entries[scoring.entry_id].scoring = scoring;
        }
      });
      let entryComponents = Object.values(this.props.entries);
      return entryComponents.map( (entry) => {
        if (entry) {
          return <Entry entry={entry} key={entry.id} />;
        } else {
          return null;
        }
      });
    } else {
      return <tr><td>Loading...</td></tr>;
    }
  }

  render () {
    return(
      <section>
        <table>
          <tbody>
            <tr>
              <th>Song Title</th>
              <th>Song Artist</th>
            </tr>
            { this.createEntries() }
          </tbody>
        </table>
      </section>
    );
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(Scoresheet);
