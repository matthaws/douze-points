import React from "react";
import PropTypes from "prop-types";
import Scoresheet from "./scoresheet";
import NewScoresheetForm from "./new_scoresheet";
import "./scoresheets.css";

//=========================================
// component

export default class Scoresheets extends React.Component {
  static propTypes = {
    scoresheets: PropTypes.object.isRequired
  };

  static defaultProps = {
    scoresheets: {}
  };

  constructor(props) {
    super(props);
    this.state = {
      scoresheet: props.scoresheets[0]
    };
  }

  componentDidMount() {
    if (this.props.user) {
      this.props.fetchScoresheets(this.props.user.id);
    }
  }

  componentWillReceiveProps(newProps) {
    if (!this.props.user && newProps.user) {
      newProps.fetchScoresheets(newProps.user.id);
    }
  }

  scoresheetHeaders() {
    if (this.props.scoresheet_ids.length > 0) {
      return this.props.scoresheet_ids.map((scoresheet_id, idx) => {
        let scoresheet = this.props.scoresheets[scoresheet_id];
        if (scoresheet) {
          return (
            <span
              className={`span--scoresheet-nav-${scoresheet.id}`}
              key={scoresheet.id}
              onClick={() => {
                this.props.setDisplayScoresheet(scoresheet.id);
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

  newScoresheetHeader() {
    return (
      <span
        className={`span--scoresheet-nav-newsheet`}
        key={99}
        onClick={() => this.props.setDisplayScoresheet("new")}
      >
        +
      </span>
    );
  }

  render() {
    return (
      <section className="section--scoresheets_container">
        <nav className="nav--scoresheets_nav">
          {this.scoresheetHeaders()}
          {this.newScoresheetHeader()}
        </nav>
        <section className="section--scoresheet_show">
          {this.props.displayId === "new" ? (
            <NewScoresheetForm scoresheets={this.props.scoresheets} setDisplayScoresheet={this.props.setDisplayScoresheet} />
          ) : (
            <Scoresheet scoresheet={this.props.scoresheets[this.props.displayId]} />
          )}
        </section>
      </section>
    );
  }
}
