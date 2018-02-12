import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchScoresheet, removeScoresheet } from '../../actions/scoresheet_actions';

import './scoresheet.css';

//=========================================
// props / actions

const mapStateToProps = (state, ownProps) => {
  const scoresheet = ownProps.scoresheet || { id: 'LOADING', entry_ids: [] };
  const entries = scoresheet.entry_ids.map( (id) => {
    return state.entries[id];
  }) || [];
  return { scoresheet, entries };
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
    if (this.props.scoresheet.id !== "LOADING" && this.props.entries[0]) {
      return this.props.entries.map( (entry) => {
        return (
          <tr className={`tr--entry-${entry.id}`}>
            <td>{ entry.song_title }</td>
            <td>{ entry.artist }</td>
          </tr>
        );
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
