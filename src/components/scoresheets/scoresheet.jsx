import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchScoresheet, removeScoresheet } from '../../actions/scoresheet_actions';

import './scoresheet.css';

//=========================================
// props / actions

const mapStateToProps = (state, ownProps) => {
  if (ownProps.scoresheetId === "LOADING") {
    return {
      scoresheetId: ownProps.scoresheetId,
    }
  } else {
    return {
      scoresheetId: ownProps.scoresheetId,
      scoresheet: state.scoresheets[ownProps.scoresheetId],
    }
  }
};

const mapDispatchToProps = (dispatch) => ({
  fetchScoresheet: (scoresheetId) => dispatch(fetchScoresheet(scoresheetId)),
  removeScoresheet: (scoresheetId) => dispatch(removeScoresheet(scoresheetId)),
});

//=========================================
// component

class Scoresheet extends React.Component {

  static defaultProps = {
    scoresheet: {
      id: 0,
      name: "LOADING..."
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.scoresheetId !== this.props.scoresheetId) {
      this.props.fetchScoresheet(newProps.scoresheetId)
    }
  }

  render () {
    if (this.props.scoresheetId === "LOADING") {
      return <p>Loading...</p>;
    } else {
      debugger
      return(
        <section>
          {this.props.scoresheetId}
        </section>
      );
    }
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(Scoresheet);
