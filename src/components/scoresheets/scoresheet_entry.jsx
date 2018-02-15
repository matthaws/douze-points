import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import YouTube from '../video/YouTube';
import './scoresheet_entry.css';

//=========================================
// props / actions

const mapStateToProps = (state, ownProps) => {
  return {
    entry: ownProps.entry,
    scoring: ownProps.entry.scoring,
    country: ownProps.country,
  };
};

//=========================================
// component

class ScoresheetEntry extends React.Component {
  static defaultProps = {
    scoring: {
      bonus_comment: "",
      bonus_points: "",
      cheese_score: "",
      costume_score: "",
      dance_score: "",
      score_note: "",
      song_score: "",
    }
  }

  constructor(props) {
    super(props);
    this.state = { renderVideo: false };
    this.entry = this.props.entry;
    this.country = this.props.country;
    this.state = { scoring: this.props.scoring };
    this.state.scoring.entry_id = this.props.entry.id || null;
    this.state.scoring.scoresheet_id = this.props.scoresheetId || null;
    this.scoring = this.state.scoring;
  }

  toggleScoreShow() {
    let el = document.getElementById(`section--entry_score_${this.entry.id}`);
    if (el.classList.contains("hidden")) {
      el.classList.remove("hidden");
      this.setState( { renderVideo: true } );
    } else {
      el.classList.add("hidden");
      this.setState( { renderVideo: false } );
    }
  }

  renderVideo() {
    if (this.state.renderVideo === true) {
        return(
          <YouTube url={this.entry.video_url} />
        );
    } else {
      return null;
    }
  }

  handleChange(field) {
    return (e) => {
      let newScore = this.state.scoring;
      if (field === "bonus_comment" || field === "score_note") {
        newScore[field] = e.target.value;
      } else {
        newScore[field] = parseInt(e.target.value);
      }
      this.setState({ scoring: newScore });
    }
  }

  render() {
    return (
      <ul>
        <section className={`section--entry_parent_${this.entry.id}`}>
          <li id={`li--entry_country`}><img src={ this.country.flag_url }/><p>{ this.country.name }</p></li>
          <li>{ this.entry.song_title}</li>
          <li>{ this.entry.artist}</li>
          <li><button onClick={ () => { this.toggleScoreShow() } }>Hide/Show Scores</button></li>
        </section>
        <ul>
          <section id={`section--entry_score_${this.entry.id}`} className="hidden">
            <section id={`section--entry_video_${this.entry.id}`}>
              { this.renderVideo() }
            </section>
            <table>
              <tbody>
                <tr>
                  <th>Song Score</th>
                  <th>Dance Score</th>
                  <th>Costume Score</th>
                  <th>Eurocheese Score</th>
                  <th>Bonus Points</th>
                  <th>Bonus Points Comment</th>
                </tr>
                <tr>
                  <td><input type="number" min="0" max="12" name="song_score" onChange={ this.handleChange("song_score") } value={ this.scoring.song_score || "" }/></td>
                  <td><input type="number" min="0" max="12" name="dance_score" onChange={ this.handleChange("dance_score") } value={ this.scoring.dance_score || "" }/></td>
                  <td><input type="number" min="0" max="12" name="costume_score" onChange={ this.handleChange("costume_score") } value={ this.scoring.costume_score || "" }/></td>
                  <td><input type="number" min="0" max="12" name="cheese_score" onChange={ this.handleChange("cheese_score") } value={ this.scoring.cheese_score || "" }/></td>
                  <td><input type="number" name="bonus_points" onChange={ this.handleChange("bonus_points") } value={ this.scoring.bonus_points || "" }/></td>
                  <td><textarea onChange={ this.handleChange("bonus_comment") } value={this.scoring.bonus_comment || "" }></textarea></td>
                </tr>
              </tbody>
            </table>
            <button>Submit Score</button>
          </section>
        </ul>
      </ul>
    );
  }
}

export default connect(mapStateToProps, null)(ScoresheetEntry);
