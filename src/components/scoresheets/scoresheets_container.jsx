import { connect } from 'react-redux';
import Scoresheets from './scoresheets';
import {
  fetchScoresheets,
  removeScoresheet
} from '../../actions/scoresheet_actions';

const mapStateToProps = state => ({
  scoresheets: state.scoresheets,
});

const mapDispatchToProps = dispatch => ({
  fetchScoresheets: userId => dispatch(fetchScoresheets(userId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Scoresheets);
