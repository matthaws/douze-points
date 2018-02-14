import React from 'react';
import PropTypes from 'prop-types';
import Scoresheet from './scoresheet';
import './scoresheets.css';

//=========================================
// component

export default class Scoresheets extends React.Component {

  static propTypes = {
    scoresheets: PropTypes.array.isRequired,
  }

  static defaultProps = {
  }

  constructor(props) {
    super(props);
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
    if (this.props.scoresheets.length > 0) {
      return this.props.scoresheets.map( (scoresheet, idx) => {
        if (scoresheet) {
          return(
            <span className={`span--scoresheet-nav-${scoresheet.id}`} key={ scoresheet.id }>{ scoresheet.name }</span>
          )
        } else {
          return <span key={idx} >Loading...</span>
        }
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
            <Scoresheet scoresheet={ Object.values(this.props.scoresheets)[0] }/>
        </section>
      </section>
    )
  }
}
