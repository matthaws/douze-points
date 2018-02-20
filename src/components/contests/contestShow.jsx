import React from "react";
import { connect } from "react-redux";
import { fetchContest } from "../../actions/contest_actions";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import "./contestShow.css";
import Navbar from '../navbar/navbar'
import Gold from '../../assets/gold.png'
import Silver from '../../assets/silver.png'
import Bronze from '../../assets/bronze.png'
// import '../navbar/navbar.css'

class ContestShow extends React.Component {
  componentDidMount() {
    if (
      this.props.contest.year === "LOADING" ||
      this.props.entries.include(undefined)
    ) {
      this.props.fetchContest(this.props.year);
    }
  }

  render() {
    const { contest, entries, countries } = this.props;
    return (
      <main className='main--contestShowPage'>
        <div className='div--contest-title'>EuroVision Song Contest {contest.year}</div>
        <ul className='ul--entries'>
          {entries.map(entry => {
            const flag_url = countries[entry.country_id]
              ? countries[entry.country_id].flag_url
              : "";

              if (entry.final_ranking === 1) {
                return (

                <li className='li--entry'>
                  <img src={flag_url} className='img--flag'/>
                  <span className='span--entry'>{entry.song_title}, {entry.artist}</span>
                  <img src={Gold} className='img--medal'/>
                  <span className='span--rank'>#{entry.final_ranking}</span>
                </li>

                )

              } else if (entry.final_ranking === 2) {
                return (
                <li className='li--entry'>
                  <img src={flag_url} className='img--flag'/>
                  <span className='span--entry'>{entry.song_title}, {entry.artist}</span>
                  <img src={Silver} className='img--medal'/>
                    <span className='span--rank'>#{entry.final_ranking}</span>
                  </li>
                )

              } else if (entry.final_ranking === 3) {
                return (
                <li className='li--entry'>
                  <img src={flag_url} className='img--flag'/>
                  <span className='span--entry'>{entry.song_title}, {entry.artist}</span>
                  <img src={Bronze} className='img--medal'/>
                    <span className='span--rank'>#{entry.final_ranking}</span>
                  </li>
                )

              } else {
                return (
                <li className='li--entry'>
                  <img src={flag_url} className='img--flag'/>
                  <span className='span--entry'>{entry.song_title}, {entry.artist}</span>
                    <span className='span--rank'>#{entry.final_ranking}</span>
                  </li>
                )
              }

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
  fetchContest: PropTypes.func.isRequired
};

ContestShow.defaultProps = {
  entries: [],
  contest: { year: "LOADING" }
};

const mapStateToProps = (state, ownProps) => {
  const { countries } = state;
  const year = ownProps.match.params.year;
  const contest = state.contests[year] || { year: "LOADING", entry_ids: [] };
  const entries = contest.entry_ids.map(id => {
    return state.entries[id];
  });
  return { year, contest, entries, countries };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchContest: year => dispatch(fetchContest(year))
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ContestShow)
);
