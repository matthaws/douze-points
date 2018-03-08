import React from 'react';
import { connect } from 'react-redux';
import { fetchContests } from '../../actions/contest_actions';
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
    debugger
    if (this.props.contest_ids.length > 0) {
      return (
        <ul>
          { this.props.contest_ids.map( (key) => {
            return (
              <section className="section--contest_list_item">
                <h1><img src={ this.props.contests[key].host_country.flag_url }/>{this.props.contests[key].year} - { this.props.contests[key].location }</h1>
                <ul>
                  <li>Winner: </li>
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
  for (var obj in state.contests) {
    winner_ids.push(state.contests[obj].winning_entry_id);
  }
  return {
    contests: state.contests,
    contest_ids: Object.keys(state.contests),
    winner_ids
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ContestIndex);
