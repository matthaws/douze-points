import React from "react";
import { connect } from "react-redux";
import { createScoresheet } from "../../actions/scoresheet_actions";
import { fetchContests } from "../../actions/contest_actions";
import "./new_scoresheet.css";

//=========================================
// mapToProps

const mapStateToProps = (state, ownProps) => ({
  contests: Object.values(state.contests).sort( (a, b) => {
    if (a.year < b.year) {
      return 1;
    } else {
      return -1;
    }
  }),
  user: state.auth.currentUser
});

const mapDispatchToProps = dispatch => ({
  createScoresheet: scoresheet => dispatch(createScoresheet(scoresheet)),
  fetchContests: () => dispatch(fetchContests()),
});

//=========================================
// component

class NewScoresheetForm extends React.Component {
  static defaultProps = {
    scoresheet: {
      name: "",
      contest_id: "default",
    }
  };

  constructor(props) {
    super(props);
    this.state = { scoresheet: props.scoresheet };
    this.state.scoresheet.user_id = props.user.id;
    this.submitForm = this.submitForm.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  componentDidMount() {
    this.props.fetchContests();
  }

  handleSelect(e) {
    let newForm = this.state.scoresheet;
    newForm.contest_id = e.currentTarget.value;
    this.setState({ scoresheet: newForm });
  }

  handleChange(field) {
    return e => {
      let newForm = this.state.scoresheet;
      newForm[field] = e.currentTarget.value;
      this.setState({ scoresheet: newForm });
    };
  }

  submitForm(e) {
    e.preventDefault();
    if (this.state.scoresheet.contest_id === "default") {
      // fix this on creation of errorsReducer
      alert("Must choose contest.");
    } else {
      this.props.createScoresheet(this.state.scoresheet);
      this.props.setDisplayScoresheet(null);
    }
  }

  render() {
    return (
      <form className="form--new_scoresheet" onSubmit={this.submitForm}>
        <div className="form--new_scoresheet_title">
          <label htmlFor="scoresheet_title">
            Title
          </label>
          <input
            type="text"
            name="scoresheet_title"
            placeholder="Enter Scoresheet Title"
            value={this.state.scoresheet.name}
            onChange={this.handleChange("name")}
            />
        </div>
        <br />
        <div className="form--new_scoresheet_contest_year">
          <label htmlFor="contest_id">
            Contest Year
          </label>
          <select
            name="contest_id"
            value={parseInt(this.state.scoresheet.contest_id) || ""}
            onChange={this.handleSelect}
          >
            <option disabled="true" value="" key={-1}>Please Select Contest</option>
            { this.props.contests.map((contest, idx) => {
              return (
                <option
                  value={contest.id}
                  key={contest.id}>
                  {contest.year}
                </option>
              );
            })}
          </select>
        </div>
        <br />
        <div className="form--new_scoresheet_type">
          <label>Type</label>
          <p>Placeholder</p>
        </div>
        <button>Create New Scoresheet</button>
      </form>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewScoresheetForm);
