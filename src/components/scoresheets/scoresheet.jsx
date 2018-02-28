import React from "react";
import { connect } from "react-redux";
import {
  fetchScoresheet,
  removeScoresheet
} from "../../actions/scoresheet_actions";
import { startSpinner, endSpinner } from "../../actions/uiActions";
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
  const isSpinning = state.ui.spinner;
  scoresheet.scoring_ids.forEach(id => {
    if (state.scorings[id]) {
      const newScoring = state.scorings[id];
      scorings[newScoring.entry_id] = newScoring;
    }
  }) || [];

  const countries = state.countries;
  return { scoresheet, entries, scorings, countries, isSpinning };
};

const mapDispatchToProps = dispatch => ({
  fetchScoresheet: scoresheetId => dispatch(fetchScoresheet(scoresheetId)),
  removeScoresheet: scoresheetId => dispatch(removeScoresheet(scoresheetId)),
  startSpinner: () => dispatch(startSpinner()),
  endSpinner: () => dispatch(endSpinner())
});

//=========================================
// component

class Scoresheet extends React.Component {
  constructor(props) {
    super(props);
    this.state = { renderBonusPoints: false };
  }

  componentDidMount() {
    if (this.props.scoresheet.id === "LOADING") {
      this.props.startSpinner();
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.scoresheet.id !== this.props.scoresheet.id) {
      this.props.startSpinner();
      this.props.fetchScoresheet(newProps.scoresheet.id);
    } else if (
      this.props.isSpinning &&
      this.props.scoresheet.id !== "LOADING"
    ) {
      this.props.endSpinner();
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
        <p>{this.props.scoresheet.name}</p>
        <table className="table--scoresheet-headers">
          <tbody>
            <tr className="tr--scoresheet-header-row">
              <th>Country</th>
              <th>Song Title</th>
              <th>Song Artist</th>
              <th>
                <p>Your Total Score</p>
                <br />
                <label>
                  Add Bonus Points?<input
                    type="checkbox"
                    onChange={() => this.toggleBonusPoints()}
                  />
                </label>
              </th>
            </tr>
          </tbody>
        </table>
        <ul>{scoresheetEntries}</ul>
      </section>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Scoresheet);
