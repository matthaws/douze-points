import React from 'react';
import { connect } from 'react-redux';
import { fetchContests } from '../../actions/contest_actions';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './contestIndex.css';

class ContestIndex extends React.Component {

  static propTypes = {
    contests: PropTypes.object.isRequired,
  }

  componentDidMount() {
    this.props.fetchContests();
  }

  render() {
    if (this.props.contest_ids.length > 0) {
      return (
        <ul>
          { this.props.contest_ids.map( (key) => {
            return (
              <section key={this.props.contests[key].id} className="section--contest_list_item">
                <h1><img src={ this.props.contests[key].host_country.flag_url }/><Link to={`/contests/${this.props.contests[key].year}`}>{this.props.contests[key].year} ESC- { this.props.contests[key].location }</Link></h1>
                <ul>
                  <li>Winner: { this.props.winners[key] ? this.props.winners[key].song_title : null }</li>
                </ul>
              </section>
            )
          }) }
        </ul>
      )
    } else {
      return null
    }
  }

}

const mapDispatchToProps = dispatch => ({
  fetchContests: () => dispatch(fetchContests()),
})

const mapStateToProps = state => {
  let winner_ids = [];
  let winners = {};

  for (var obj in state.contests) {
    let winning_id = state.contests[obj].winning_entry_id
    winner_ids.push(winning_id);
    if (state.entries[winning_id]) {
      winners[state.entries[winning_id].contest_id] = state.entries[winning_id];
    }
  }

  // get contest ids
  let contest_ids = Object.keys(state.contests);

  // sort contest IDs according to year of contest in state;
  contest_ids = contest_ids.sort( (a, b) => {
    if (state.contests[a].year < state.contests[b].year) {
      return 1;
    } else {
      return -1;
    }
  });

  return {
    contests: state.contests,
    entries: state.entries,
    contest_ids,
    winner_ids,
    winners
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ContestIndex);
