import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { removeScoresheet } from '../../actions/scoresheet_actions';

import './scoresheet.css';

//=========================================
// props / actions

const mapStateToProps = (state, ownProps) => {
  return {
    scoresheet: ownProps.scoresheet,
  };
};

const mapDispatchToProps = (dispatch) => ({
  removeScoresheet: (scoresheetId) => dispatch(removeScoresheet(scoresheetId)),
});

//=========================================
// component

class Scoresheet extends React.Component {

  render () {
    if (this.props.scoresheet.name === "LOADING...") {
      return <p>Loading...</p>;
    } else {

    }
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(Scoresheet);
