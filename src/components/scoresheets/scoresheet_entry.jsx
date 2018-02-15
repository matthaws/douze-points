import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import YouTube from "../video/YouTube";
import "./scoresheet_entry.css";

//=========================================
// component

class ScoresheetEntry extends React.Component {
  static defaultProps = {
    entry: {
      id: null
    },
    scoring: {
      id: null,
      bonus_comment: "",
      bonus_points: "",
      cheese_score: "",
      costume_score: "",
      dance_score: "",
      score_note: "",
      song_score: ""
    }
  };

  constructor(props) {
    super(props);
    this.state = { renderScoreSection: false, scoring: this.props.scoring };
  }

  toggleScoreShow() {
    const newValue = this.state.renderScoreSection ? false : true;
    this.setState({ renderScoreSection: newValue });
  }

  handleChange(field) {
    return e => {
      let newScore = this.state.scoring;
      if (field === "bonus_comment" || field === "score_note") {
        newScore[field] = e.target.value;
      } else {
        newScore[field] = parseInt(e.target.value);
      }
      this.setState({ scoring: newScore });
    };
  }

  render() {
    const { entry, country } = this.props;
    const { scoring } = this.state;

    const scoreSection = this.state.renderScoreSection ? (
      <section id={`section--entry_score_${entry.id}`}>
        <section id={`section--entry_video_${entry.id}`}>
          <YouTube url={entry.video_url} />
        </section>
        <table>
          <tbody>
            <tr>
              <th>Song Score</th>
              <th>Dance Score</th>
              <th>Costume Score</th>
              <th>Eurocheese Score</th>
              <th>Bonus Points</th>
              <th>Bonus Points Comment</th>
            </tr>
            <tr>
              <td>
                <input
                  type="number"
                  min="0"
                  max="12"
                  name="song_score"
                  onChange={this.handleChange("song_score")}
                  value={scoring.song_score || ""}
                />
              </td>
              <td>
                <input
                  type="number"
                  min="0"
                  max="12"
                  name="dance_score"
                  onChange={this.handleChange("dance_score")}
                  value={scoring.dance_score || ""}
                />
              </td>
              <td>
                <input
                  type="number"
                  min="0"
                  max="12"
                  name="costume_score"
                  onChange={this.handleChange("costume_score")}
                  value={scoring.costume_score || ""}
                />
              </td>
              <td>
                <input
                  type="number"
                  min="0"
                  max="12"
                  name="cheese_score"
                  onChange={this.handleChange("cheese_score")}
                  value={scoring.cheese_score || ""}
                />
              </td>
              <td>
                <input
                  type="number"
                  name="bonus_points"
                  onChange={this.handleChange("bonus_points")}
                  value={scoring.bonus_points || ""}
                />
              </td>
              <td>
                <textarea
                  onChange={this.handleChange("bonus_comment")}
                  value={scoring.bonus_comment || ""}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <button>Submit Score</button>
      </section>
    ) : (
      ""
    );

    return (
      <ul>
        <section className={`section--entry_parent_${entry.id}`}>
          <li id={`li--entry_country`}>
            <img src={country.flag_url} />
            <p>{country.name}</p>
          </li>
          <li>{entry.song_title}</li>
          <li>{entry.artist}</li>
          <li>
            <button
              onClick={() => {
                this.toggleScoreShow();
              }}
            >
              Hide/Show Scores
            </button>
          </li>
        </section>
        <ul>{scoreSection}</ul>
      </ul>
    );
  }
}

export default ScoresheetEntry;
