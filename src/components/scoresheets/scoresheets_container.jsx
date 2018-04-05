import { connect } from 'react-redux';
import Scoresheets from './scoresheets';
import {
  fetchScoresheets,
} from '../../actions/scoresheet_actions';
import { setDisplayScoresheet } from '../../actions/uiActions';

const mapStateToProps = state => ({
  scoresheets: state.scoresheets,
  displayId: state.ui.displayId || state.scoresheets[0].id,
});

const mapDispatchToProps = dispatch => ({
  fetchScoresheets: userId => dispatch(fetchScoresheets(userId)),
  setDisplayScoresheet: scoresheetId => dispatch(setDisplayScoresheet(scoresheetId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Scoresheets);
