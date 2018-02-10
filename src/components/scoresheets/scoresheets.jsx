import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchScoresheet, fetchScoresheets, removeScoresheet } from '../../actions/scoresheet_actions';

//=========================================
// props / actions

const mapStateToProps = (state) => {
  return {
    scoresheets: state.scoresheets.scoresheets,
    currentUser: state.auth.currentUser,
  }
};

const mapDispatchToProps = (dispatch) => ({
  fetchScoresheet: (scoresheetId) => dispatch(fetchScoresheet(scoresheetId)),
  fetchScoresheets: (userId) => dispatch(fetchScoresheets(userId)),
  removeScoresheet: (scoresheetId) => dispatch(removeScoresheet(scoresheetId)),
});

//=========================================
// component

class Scoresheets extends React.Component {

  static propTypes = {
    scoresheet: PropTypes.object.isRequired,
    scoresheets: PropTypes.array.isRequired,
  }

  static defaultProps = {
    scoresheet: { name: "LOADING..." },
    scoresheets: []
  }

  componentDidMount() {
    if (this.props.currentUser) {
      this.fetchScoresheets(this.state.currentUser.id);
    }
  }

  componentWillReceiveProps(newProps) {
    if (!this.props.currentUser) {
      newProps.fetchScoresheets(newProps.currentUser.id);
    }
  }

  render() {
    return(
      <section className="section--scoresheets_container">
        <nav className="nav--scoresheets_nav">
        </nav>
        <h1>
          Scoresheets index
        </h1>
        <section className="section--scoresheet_show">
          Scoresheet view here
        </section>
      </section>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Scoresheets);
