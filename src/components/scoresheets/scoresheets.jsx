import React from "react";
import PropTypes from "prop-types";
import Scoresheet from "./scoresheet";
import "./scoresheets.css";

//=========================================
// component

export default class Scoresheets extends React.Component {
  static propTypes = {
    scoresheets: PropTypes.array.isRequired
  };

  static defaultProps = {
    scoresheets: [],
  };

  constructor(props) {
    super(props);
    this.state = {
      scoresheet: props.scoresheets[0]
    };
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
    if (newProps.scoresheets !== this.props.scoresheets) {
      if (!this.state.scoresheet && newProps.scoresheets[0]) {
        this.setState({ scoresheet: newProps.scoresheets[0] });
      }
    }
  }

  scoresheetHeaders() {
    if (this.props.scoresheets.length > 0) {
      return this.props.scoresheets.map((scoresheet, idx) => {
        if (scoresheet) {
          return (
            <span
              className={`span--scoresheet-nav-${scoresheet.id}`}
              key={scoresheet.id}
              onClick={() => {
                this.setState({ scoresheet: scoresheet });
              }}
            >
              {scoresheet.name}
            </span>
          );
        } else {
          return <span key={idx}>Loading...</span>;
        }
      });
    }
  }

  render() {
    return (
      <section className="section--scoresheets_container">
        <nav className="nav--scoresheets_nav">{this.scoresheetHeaders()}</nav>
        <section className="section--scoresheet_show">
          <Scoresheet scoresheet={this.state.scoresheet} userId={this.props.user ? this.props.user.id : null} />
        </section>
      </section>
    );
  }
}
