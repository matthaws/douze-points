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
    return (
      <ul>
        { this.props.contest_ids.map( (key) => {
          return <li>{this.props.contests[key].year}</li>
        }) }
      </ul>
    )
  }

}

const mapDispatchToProps = dispatch => ({
  fetchContests: () => dispatch(fetchContests()),
})

const mapStateToProps = state => ({
  contests: state.contests,
  contest_ids: Object.keys(state.contests),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContestIndex);
