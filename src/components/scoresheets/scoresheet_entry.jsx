import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
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
      bonus_comment: null,
      bonus_points: null,
      cheese_score: null,
      costume_score: null,
      dance_score: null,
      score_note: null,
      song_score: null,
    }
  }

  toggleScoreShow() {
    let el = document.getElementById(`section--entry_score_${this.props.entry.id}`);
    if (el.classList.contains("hidden")) {
      el.classList.remove("hidden");
    } else {
      el.classList.add("hidden");
    }
  }

  render() {
    return (
      <ul>
        <section className={`section--entry_parent_${this.props.entry.id}`}>
          <li>{ this.props.country.name }</li>
          <li>{ this.props.entry.song_title}</li>
          <li>{ this.props.entry.artist}</li>
          <li><button onClick={ () => { this.toggleScoreShow() } }>Hide/Show Scores</button></li>
        </section>
        <ul>
          <section id={`section--entry_score_${this.props.entry.id}`} className="hidden">
            <table>
              <tbody>
                <tr>
                  <th>Song Score</th>
                  <th>Dance Score</th>
                  <th>Costume Score</th>
                  <th>Eurocheese Score</th>
                  <th>Bonus Points</th>
                </tr>
                <tr>
                  <td>{ this.props.scoring.song_score }</td>
                  <td>{ this.props.scoring.dance_score }</td>
                  <td>{ this.props.scoring.costume_score }</td>
                  <td>{ this.props.scoring.cheese_score }</td>
                  <td>{ this.props.scoring.bonus_points }</td>
                </tr>
              </tbody>
            </table>
          </section>
        </ul>
      </ul>
    );
  }
}

export default connect(mapStateToProps, null)(ScoresheetEntry);
