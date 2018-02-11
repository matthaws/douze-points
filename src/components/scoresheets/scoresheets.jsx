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
  fetchScoresheet: (scoresheetId) => dispatch(fetchScoresheet(scoresheetId)),
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
    scoresheets: [ { name: "LOADING..." } ]
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
      return(
        <span className={`span--scoresheet-nav-${idx}`} key={ idx }>{ scoresheet.name }</span>
      )
    });
  }

  render() {
    return(
      <section className="section--scoresheets_container">
        <nav className="nav--scoresheets_nav">
          { this.scoresheetHeaders() }
        </nav>
        <section className="section--scoresheet_show">
          <Scoresheet scoresheet={this.props.scoresheet} />
        </section>
      </section>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Scoresheets);
