import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchScoresheet, fetchScoresheets, removeScoresheet } from '../../actions/scoresheet_actions';
import Scoresheet from './scoresheet';
import './scoresheets.css';

//=========================================
// props / actions

const mapStateToProps = (state) => {
  return {
    scoresheets: state.scoresheets.scoresheets,
    currentUser: state.auth.currentUser,
  }
};

const mapDispatchToProps = (dispatch) => ({
  fetchScoresheets: (userId) => dispatch(fetchScoresheets(userId)),
});

//=========================================
// component

class Scoresheets extends React.Component {

  static propTypes = {
    // scoresheets: PropTypes.array.isRequired,
  }

  static defaultProps = {
    scoresheets: [ { "LOADING": { id:"LOADING..." } } ]
  }

  componentDidMount() {
    if (this.props.currentUser) {
      this.fetchScoresheets(this.state.currentUser.id);
    }
  }

  componentWillReceiveProps(newProps) {
    if (!this.props.currentUser && newProps.currentUser) {
      newProps.fetchScoresheets(newProps.currentUser.id);
    }
  }

  scoresheetHeaders() {
    return this.props.scoresheets.map( (scoresheet, idx) => {
      let sheet = Object.values(scoresheet)[0];
      return(
        <span className={`span--scoresheet-nav-${idx}`} key={ idx }>{ sheet.name }</span>
      )
    });
  }

  render() {
    let scoresheetId = Object.keys(this.props.scoresheets[0])[0];
    return(
      <section className="section--scoresheets_container">
        <nav className="nav--scoresheets_nav">
          { this.scoresheetHeaders() }
        </nav>
        <section className="section--scoresheet_show">
          <Scoresheet scoresheetId={scoresheetId} />
        </section>
      </section>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Scoresheets);
