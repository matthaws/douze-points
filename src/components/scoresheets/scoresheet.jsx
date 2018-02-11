import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { removeScoresheet } from '../../actions/scoresheet_actions';

import './scoresheet.css';

//=========================================
// props / actions

const mapStateToProps = (state, ownProps) => {
  return {
    scoresheetId: ownProps.scoresheetId,
  };
};

const mapDispatchToProps = (dispatch) => ({
  removeScoresheet: (scoresheetId) => dispatch(removeScoresheet(scoresheetId)),
});

//=========================================
// component

class Scoresheet extends React.Component {

  render () {
    if (this.props.scoresheetId === "LOADING...") {
      return <p>Loading...</p>;
    } else {
      return(
        <section>
          { this.props.scoresheetId }
        </section>
      );
    }
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(Scoresheet);
