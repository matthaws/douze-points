import React from "react";
import EntryIndexItem from "../entries/entryIndexItem";
import { connect } from "react-redux";
import { fetchContest } from "../../actions/contest_actions";
import { startSpinner, endSpinner } from "../../actions/uiActions";
import { withRouter, Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./contestShow.css";
import Gold from "../../assets/gold.png";
import Silver from "../../assets/silver.png";
import Bronze from "../../assets/bronze.png";


class ContestShow extends React.Component {
  componentDidMount() {
    if (
      this.props.contest.year === "LOADING" ||
      this.props.entries.includes(undefined)
    ) {
      this.props.startSpinner();
      this.props.fetchContest(this.props.year);
    }
  }

  componentWillReceiveProps() {
    if (this.props.isSpinning) {
      this.props.endSpinner();
    }
  }

  render() {
    const { contest, entries, countries } = this.props;
    if (countries.length < 1 || entries.includes(undefined) ) {
      return null;
    } else {
      return (
        <main className="main--contestShowPage">
          <div className="div--contest-title">
            EuroVision Song Contest {contest.year}
          </div>
          <ul className="ul--entries">
            {entries.map(entry => {
              const flag_url = countries[entry.country_id]
                ? countries[entry.country_id].flag_url
                : "";

              let medal;
              switch (entry.final_ranking) {
                case 1:
                  medal = (
                    <img alt="gold-medal" src={Gold} className="img--medal" />
                  );
                  break;
                case 2:
                  medal = (
                    <img alt="silver-medal" src={Silver} className="img--medal" />
                  );
                  break;
                case 3:
                  medal = (
                    <img alt="bronze-medal" src={Bronze} className="img--medal" />
                  );
                  break;
                default:
                  medal = "";
              }

              return (
                <Link to={`/entries/${entry.id}`}>
                  <li className="li--entry">
                    <img
                      alt="country-flag"
                      src={flag_url}
                      className="img--flag"
                    />
                    <span className="span--entry">
                      {entry.song_title}, {entry.artist}
                    </span>
                    {medal}
                    <span className="span--rank">#{entry.final_ranking}</span>
                  </li>
                </Link>
              );
            })}
          </ul>
        </main>
      );
    }
    return (
      <main className="main--contestShowPage">
        <div className="div--contest-title">
          EuroVision Song Contest {contest.year}
        </div>
        <ul className="ul--entries">
          {entries.map(entry => {
            return (
              <EntryIndexItem
              entry={entry}
              country={countries[entry.country_id]}
              />);
          })}
        </ul>
      </main>
    );
  }
}

ContestShow.propTypes = {
  year: PropTypes.string.isRequired,
  contest: PropTypes.object,
  entries: PropTypes.array,
  fetchContest: PropTypes.func.isRequired,
  startSpinner: PropTypes.func.isRequired,
  endSpinner: PropTypes.func.isRequired,
  isSpinning: PropTypes.bool.isRequired
};

ContestShow.defaultProps = {
  entries: [],
  contest: { year: "LOADING" }
};

const findContestYear = (year, contests) => {
  let match;
  Object.values(contests).forEach(contest => {
    if (contest.year === parseInt(year)) {
      match = contest;
    }
  });
  return match;
};

const mapStateToProps = (state, ownProps) => {
  const { countries, contests } = state;
  const year = ownProps.match.params.year;
  const contest = findContestYear(year, contests) || {
    year: "LOADING",
    entry_ids: []
  };
  const entries = contest.entry_ids.map(id => {
    return state.entries[id];
  });
  const isSpinning = state.ui.spinner;
  return { year, contest, entries, countries, isSpinning };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchContest: year => dispatch(fetchContest(year)),
  startSpinner: () => dispatch(startSpinner()),
  endSpinner: () => dispatch(endSpinner())
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ContestShow)
);
