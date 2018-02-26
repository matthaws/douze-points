import React from "react";
import { connect } from "react-redux";
import {
  fetchScoresheet,
  removeScoresheet
} from "../../actions/scoresheet_actions";
import ScoresheetEntry from "./scoresheet_entry.jsx";
import "./scoresheet.css";

//=========================================
// props / actions

const mapStateToProps = (state, ownProps) => {
  const scoresheet = ownProps.scoresheet || {
    id: "LOADING",
    entry_ids: [],
    scoring_ids: []
  };
  const entries = {};
  scoresheet.entry_ids.forEach(id => {
    entries[id] = state.entries[id];
  });
  const scorings = {};

  scoresheet.scoring_ids.forEach(id => {
    if (state.scorings[id]) {
      const newScoring = state.scorings[id];
      scorings[newScoring.entry_id] = newScoring;
    }
  }) || [];

  const countries = state.countries;
  return { scoresheet, entries, scorings, countries };
};

const mapDispatchToProps = dispatch => ({
  fetchScoresheet: scoresheetId => dispatch(fetchScoresheet(scoresheetId)),
  removeScoresheet: scoresheetId => dispatch(removeScoresheet(scoresheetId))
});

//=========================================
// component

class Scoresheet extends React.Component {

  constructor(props) {
    super(props);
    this.state = { renderBonusPoints: false };
  }

  componentWillReceiveProps(newProps) {
    if (newProps.scoresheet.id !== this.props.scoresheet.id) {
      this.props.fetchScoresheet(newProps.scoresheet.id);
    }
  }

  createEntries() {
    if (this.props.scoresheet.id !== "LOADING") {
      let entryComponents = Object.values(this.props.entries);

      return entryComponents.map(entry => {
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
        } else {
          return null;
        }
      });
    } else {
      return <li>Loading...</li>;
    }
  }

  toggleBonusPoints() {
    this.setState({ renderBonusPoints: !this.state.renderBonusPoints });
  }

  render() {
    let scoresheetEntries = this.createEntries();

    return (
      <section className="section--scoresheet-main">
        <table className="table--scoresheet-headers">
          <tbody>
            <tr className="tr--scoresheet-header-row">
              <th>Country</th>
              <th>Song Title</th>
              <th>Song Artist</th>
              <th><p>Your Total Score</p><label className="label--bonus_points">Add Bonus Points?<input type="checkbox" onChange={ () => this.toggleBonusPoints() }/></label></th>
            </tr>
          </tbody>
        </table>
        <ul>{scoresheetEntries}</ul>
      </section>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Scoresheet);
