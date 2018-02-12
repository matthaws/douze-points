import { connect } from 'react-redux';
import Scoresheets from './scoresheets';
import { fetchScoresheet, fetchScoresheets, removeScoresheet } from '../../actions/scoresheet_actions';

const mapStateToProps = (state) => {
  return {
    scoresheets: state.scoresheets,
  }
};

const mapDispatchToProps = (dispatch) => ({
  fetchScoresheets: (userId) => dispatch(fetchScoresheets(userId)),
  fetchScoresheet: (scoresheetId) => dispatch(fetchScoresheet(scoresheetId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Scoresheets);
