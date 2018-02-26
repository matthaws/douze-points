import React from "react";
import { connect } from "react-redux";
import { createScoresheet } from "../../actions/scoresheet_actions";
import { fetchContests } from "../../actions/contest_actions";
import "./new_scoresheet.css";

//=========================================
// mapToProps

const mapStateToProps = (state, ownProps) => ({
  contests: state.contests,
  user: state.auth.currentUser
});

const mapDispatchToProps = dispatch => ({
  createScoresheet: scoresheet => dispatch(createScoresheet(scoresheet)),
  fetchContests: () => dispatch(fetchContests())
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
    }
  }

  render() {
    return (
      <form>
        <label>
          Title
          <input
            type="text"
            placeholder="Enter Scoresheet Title"
            value={this.state.scoresheet.name}
            onChange={this.handleChange("name")}
          />
        </label>
        <br />
        <label>
          Contest Year
          <select name="contest_id" value="" onChange={e => this.handleSelect(e)}>
              <option disabled="true" value="" key={-1}>Please Select Contest</option>
            {Object.values(this.props.contests).map((contest, idx) => {
              return (
                <option value={contest.id} key={idx}>
                  {contest.year}
                </option>
              );
            })}
          </select>
        </label>
        <br />
        <label>Type</label>
        <button onClick={this.submitForm}>Create New Scoresheet</button>
      </form>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewScoresheetForm);
