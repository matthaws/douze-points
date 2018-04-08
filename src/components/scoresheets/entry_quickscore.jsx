import React from 'react';

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
  }

  render() {
    return (
      <div className="div--entry_quickscore_container">
        <p>Quickscore</p>
        <hr />
        <form>
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
        </form>
      </div>
    )
  }
}

export default EntryQuickscore;
