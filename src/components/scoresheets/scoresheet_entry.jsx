import React from 'react';
import { connect } from 'react-redux';
import { createScoring, updateScoring } from '../../actions/scoringActions';
import YouTube from '../video/YouTube';
import './scoresheet_entry.css';

//= ========================================
// mapXToProps

const mapDispatchToProps = dispatch => ({
  createScoring: scoring => dispatch(createScoring(scoring)),
  updateScoring: scoring => dispatch(updateScoring(scoring)),
});

//= ========================================
// component

class ScoresheetEntry extends React.Component {
  constructor(props) {
    super(props);
    this.defaultScoring = {
      id: null,
      bonus_comment: '',
      bonus_points: '',
      cheese_score: '',
      costume_score: '',
      dance_score: '',
      score_note: '',
      song_score: '',
      entry_id: this.props.entry.id,
      scoresheet_id: this.props.scoresheetId,
    };

    const scoring = this.props.scoring || this.defaultScoring;

    this.state = { renderScoreSection: false, scoring };
    this.submitScore = this.submitScore.bind(this);
  }

  toggleScoreShow() {
    const newValue = !this.state.renderScoreSection;
    this.setState({ renderScoreSection: newValue });
  }

  componentWillReceiveProps(newProps) {
    if (newProps.scoring) {
      const newScoring = newProps.scoring;
      newScoring.entry_id = newProps.entry.id;
      newScoring.scoresheet_id = this.props.scoresheetId;
      this.setState({ scoring: newScoring });
    } else {
      this.setState({
        scoring: {
          id: null,
          bonus_comment: '',
          bonus_points: '',
          cheese_score: '',
          costume_score: '',
          dance_score: '',
          score_note: '',
          song_score: '',
          entry_id: this.props.entry.id,
          scoresheet_id: this.props.scoresheetId,
        },
      });
    }
  }

  handleChange(field) {
    return (e) => {
      const newScore = this.state.scoring;
      if (field === 'bonus_comment' || field === 'score_note') {
        newScore[field] = e.target.value;
      } else {
        newScore[field] = parseInt(e.target.value);
      }
      this.setState({ scoring: newScore });
    };
  }

  submitScore() {
    const score = this.state.scoring;
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

  addRegScores() {
    return (
      (parseInt(this.state.scoring.song_score) || 0) +
      (parseInt(this.state.scoring.dance_score) || 0) +
      (parseInt(this.state.scoring.costume_score) || 0) +
      (parseInt(this.state.scoring.cheese_score) || 0)
    );
  }

  addBonusScores() {
    return (
      (parseInt(this.state.scoring.song_score) || 0) +
      (parseInt(this.state.scoring.dance_score) || 0) +
      (parseInt(this.state.scoring.costume_score) || 0) +
      (parseInt(this.state.scoring.cheese_score) || 0) +
      (parseInt(this.state.scoring.bonus_points) || 0)
    );
  }

  render() {
    const { entry, country } = this.props;

    const scoreSection = this.state.renderScoreSection ? (
      <section id={`section--entry_score_${entry.id}`}>
        <section id={`section--entry_video_${entry.id}`}>
          <YouTube url={entry.video_url} />
        </section>
        <section id={`section--entry_score_form_${entry.id}`}>
          <ul className="ul--entry_input">
            <li>Song Score</li>
            <li>Dance Score</li>
            <li>Costume Score</li>
            <li>Eurocheese Score</li>
            <hr />
            <li>Total Score</li>
            <li>Bonus Points</li>
          </ul>
          <ul className="ul--entry_input">
            <li>
              <input
                type="number"
                min="0"
                max="12"
                name="song_score"
                onChange={this.handleChange('song_score')}
                value={this.state.scoring.song_score || ''}
              />
            </li>
            <li>
              <input
                type="number"
                min="0"
                max="12"
                name="dance_score"
                onChange={this.handleChange('dance_score')}
                value={this.state.scoring.dance_score || ''}
              />
            </li>
            <li>
              <input
                type="number"
                min="0"
                max="12"
                name="costume_score"
                onChange={this.handleChange('costume_score')}
                value={this.state.scoring.costume_score || ''}
              />
            </li>
            <li>
              <input
                type="number"
                min="0"
                max="12"
                name="cheese_score"
                onChange={this.handleChange('cheese_score')}
                value={this.state.scoring.cheese_score || ''}
              />
            </li>
            <hr />
            <li id="li__total_score">
              {' '}
              {(this.state.scoring.song_score || 0) +
                (this.state.scoring.dance_score || 0) +
                (this.state.scoring.costume_score || 0) +
                (this.state.scoring.cheese_score || 0)}
            </li>
            <li>
              <input
                type="number"
                name="bonus_points"
                onChange={this.handleChange('bonus_points')}
                value={this.state.scoring.bonus_points || ''}
              />
            </li>
          </ul>
          <section className={`ul--bonus_comment_${entry.id}`}>
            <p>Comment</p>
            <textarea
              onChange={this.handleChange('bonus_comment')}
              value={this.state.scoring.bonus_comment || ''}
            />
          </section>
          <br />
          <div className="div--button-div">
            <button className="button--score_submit" onClick={this.submitScore}>
              Submit Score
            </button>
          </div>
        </section>
      </section>
    ) : (
      ''
    );

    return (
      <ul>
        <section className={`section--entry_parent_${entry.id}`}>
          <li id="li--entry_country">
            <img alt="country-flag" src={country.flag_url} />
            <p>{country.name}</p>
          </li>
          <li>{entry.song_title}</li>
          <li>{entry.artist}</li>
          <li>{this.props.renderBonusPoints ? this.addBonusScores() : this.addRegScores()}</li>
          <li>
            <button
              onClick={() => {
                this.toggleScoreShow();
              }}
            >
              {this.state.renderScoreSection
                ? String.fromCharCode(9650)
                : String.fromCharCode(9660)}
            </button>
          </li>
        </section>
        <ul className={`ul--score_section_${entry.id}`}>{scoreSection}</ul>
      </ul>
    );
  }
}

export default connect(null, mapDispatchToProps)(ScoresheetEntry);
