import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchScoresheet, removeScoresheet } from '../../actions/scoresheet_actions';

import './scoresheet.css';

//=========================================
// props / actions

const mapStateToProps = (state, ownProps) => ({

});

const mapDispatchToProps = (dispatch) => ({
  removeScoresheet: (scoresheetId) => dispatch(removeScoresheet(scoresheetId)),
});

//=========================================
// component

class Scoresheet extends React.Component {

  static defaultProps = {

  }

  render () {
    return(
      <section>
        Scoresheet view here
      </section>
    );
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(Scoresheet);
