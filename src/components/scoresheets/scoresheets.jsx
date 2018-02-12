import React from 'react';
import PropTypes from 'prop-types';
import Scoresheet from './scoresheet';
import './scoresheets.css';

//=========================================
// props / actions

//=========================================
// component

export default class Scoresheets extends React.Component {

  static propTypes = {
    scoresheets: PropTypes.object.isRequired,
  }

  static defaultProps = {
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
