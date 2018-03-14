import React from 'react';
import { connect } from "react-redux";
import { fetchContests } from '../../actions/contest_actions';
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

class ContestIndex extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <main>
        
      </main>
    )
  }

}

ContestIndex.propTypes = {
  year: PropTypes.string
  contests: PropTypes.object.isRequired,
  fetchContests: PropTypes.func.isRequired,
}

const mapStateToProps = (state, ownProps) => {
  return {
    contests: state.contests
  }
}

const mapDisptachToProps = (dispatch, ownProps) => {
  return {
    fetchContests: () => fetchContests()

  }
}

export default ContestIndex;
