import React from 'react';
import { connect } from 'react-redux';
import { createScoring, updateScoring } from '../../actions/scoringActions';

class EntryQuickscore extends React.Component {
  constructor(props) {
    super(props);
    this.scoresheets = Object.values(props.scoresheets).filter((sheet) => {
      if (sheet.contest_id === props.entry.contest_id) {
        return true;
      }
      return false;
    });

    this.state = {
      id: null,
      bonus_points: '',
      cheese_score: '',
      costume_score: '',
      dance_score: '',
      score_note: '',
      song_score: '',
      entry_id: props.entry.id,
      scoresheet_id: '',
    };
    this.submitScoring = this.submitScoring.bind(this);
  }

  handleChange(field) {
    return (e) => {
      this.setState({ [field]: e.target.value });
    };
  }

  submitScoring(e) {
    e.preventDefault();
    const score = this.state;
    Object.keys(score).forEach((key) => {
      if (score[key] === '') {
        score[key] = null;
      }
    });
    if (score.id) {
      this.props.updateScoring(score);
    } else {
      this.props.createScoring(score);
    }
  }

  render() {
    return (
      <div className="div--entry_quickscore_container">
        <p>Quickscore</p>
        <hr />
        <form onSubmit={ this.submitScoring }>
          <button onClick={this.submitScoring}>Submit</button>
          <label>Choose Scoresheet:
            <select
              name="scoresheet_id"
              value={ this.state.scoresheet_id }
              onChange={ (e) => { this.setState({ scoresheet_id: e.target.value }) }}
              >
              <option disabled="true" value="" key={-1}>Please Select Contest</option>
              { this.scoresheets.map( sheet => (
                <option
                  value={sheet.id}
                  key={sheet.id}
                >
                  {sheet.name}
                </option>
                ))
              }
            </select>
          </label>
          <table>
            <tr>
              <th>Song Score</th>
              <th>Dance Score</th>
              <th>Costume Score</th>
              <th>Eurocheese Score</th>
              <th>Bonus Points</th>
            </tr>
            <tr>
              <td>
                <input
                  type="number"
                  min="0"
                  max="12"
                  name="song_score"
                  onChange={this.handleChange('song_score')}
                  value={this.state.song_score || ''}
                />
              </td>
              <td>
                <input
                  type="number"
                  min="0"
                  max="12"
                  name="dance_score"
                  onChange={this.handleChange('dance_score')}
                  value={this.state.dance_score || ''}
                />
              </td>
              <td>
                <input
                  type="number"
                  min="0"
                  max="12"
                  name="costume_score"
                  onChange={this.handleChange('costume_score')}
                  value={this.state.costume_score || ''}
                />
              </td>
              <td>
                <input
                  type="number"
                  min="0"
                  max="12"
                  name="cheese_score"
                  onChange={this.handleChange('cheese_score')}
                  value={this.state.cheese_score || ''}
                />
              </td>
              <td>
                <input
                  type="number"
                  name="bonus_points"
                  onChange={this.handleChange('bonus_points')}
                  value={this.state.bonus_points || ''}
                />
              </td>
            </tr>
          </table>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  createScoring: scoring => dispatch(createScoring(scoring)),
  updateScoring: scoring => dispatch(updateScoring(scoring)),

});

export default connect(null, mapDispatchToProps)(EntryQuickscore);
