import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './entry.css';

//=========================================
// props / actions

const mapStateToProps = (state, ownProps) => {
  return {
    entry: ownProps.entry,
    scoring: ownProps.entry.scoring,
  };
};

const mapDispatchToProps = (dispatch) => ({

});

//=========================================
// component

class Entry extends React.Component {
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

  render() {
    return (
      <tr>
        <td>{ this.props.entry.song_title}</td>
        <td>{ this.props.entry.artist}</td>
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
      </tr>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Entry);
