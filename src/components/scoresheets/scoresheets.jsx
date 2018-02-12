import React from 'react';
import PropTypes from 'prop-types';
import Scoresheet from './scoresheet';
import './scoresheets.css';

//=========================================
// component

export default class Scoresheets extends React.Component {

  static propTypes = {
    scoresheets: PropTypes.object.isRequired,
  }

  static defaultProps = {
  }

  constructor(props) {
    super(props);
    this.fetchScoresheet = props.fetchScoresheet.bind(this);
  }

  componentDidMount() {
    if (this.props.user) {
      this.fetchScoresheets(this.state.user.id);
    }
  }

  componentWillReceiveProps(newProps) {
    if (!this.props.user && newProps.user) {
      newProps.fetchScoresheets(newProps.user.id);
    }
    if (Object.keys(this.props.scoresheets > 0)) {
      if (!this.isSameScoresheets(newProps.scoresheets)) {
        Object.keys(newProps.scoresheets).forEach( (key) => this.fetchScoresheet(parseInt(key)));
      }
    }
  }

  isSameScoresheets(newScoresheets) {
    let newSheets = Object.keys(newScoresheets).sort();
    let returnVal;
    Object.keys(this.props.scoresheets).sort().forEach( (key, idx) => {
      if (newSheets[idx] !== key) {
        returnVal = false;
        return returnVal;
      }
      returnVal = true;
    });
    return returnVal;
  }

  scoresheetHeaders() {
    if (Object.values(this.props.scoresheets).length > 0) {
      return Object.values(this.props.scoresheets).map( (scoresheet, idx) => {
        return(
          <span className={`span--scoresheet-nav-${scoresheet.id}`} key={ scoresheet.id }>{ scoresheet.name }</span>
        )
      });
    }
  }

  render() {
    return(
      <section className="section--scoresheets_container">
        <nav className="nav--scoresheets_nav">
          { this.scoresheetHeaders() }
        </nav>
        <section className="section--scoresheet_show">
          <Scoresheet />
        </section>
      </section>
    )
  }
}
