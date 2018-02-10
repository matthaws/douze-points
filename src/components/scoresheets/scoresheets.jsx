import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchScoresheet, fetchScoresheets, removeScoresheet } from '../../actions/scoresheet_actions';

//=========================================
// props / actions

const mapStateToProps = (state) => {
  return {
    scoresheets: state.scoresheets,
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

  }

  static defaultProps = {
    scoresheet: { name: "LOADING..." }
  }

  constructor(props) {
    super(props);
    this.state = {
      scoresheets: props.scoresheets,
      currentUser: props.currentUser,
    }
  }

  componentDidMount() {
    if (this.state.currentUser) {
      this.fetchScoresheets(this.state.currentUser.id);
    }
  }

  componentWillReceiveProps(newProps) {
    if (!this.state.currentUser) {
      this.setState({ currentUser: newProps.currentUser });
      newProps.fetchScoresheets(newProps.currentUser.id);
    }
  }

  render() {
    return(
      <section className="section--scoresheets_container">
        <nav className="nav--scoresheets_nav">
        </nav>
        <h1>
          Scoresheet goes here.
        </h1>
      </section>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Scoresheets);
