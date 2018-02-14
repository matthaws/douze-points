import { connect } from 'react-redux';
import Scoresheets from './scoresheets';
import { fetchScoresheet, fetchScoresheets, removeScoresheet } from '../../actions/scoresheet_actions';

const mapStateToProps = (state) => {
  const scoresheets = state.auth.currentUser ? state.auth.currentUser.scoresheet_ids : [];
  return {
    scoresheets: scoresheets.map( (id) => {
      return state.scoresheets[id];
    }),
    user: state.auth.currentUser,
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchScoresheets: (userId) => dispatch(fetchScoresheets(userId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Scoresheets);
