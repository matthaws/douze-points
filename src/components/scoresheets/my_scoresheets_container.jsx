import { connect } from "react-redux";
import Scoresheets from "./scoresheets";
import {
  fetchScoresheet,
  fetchScoresheets,
  removeScoresheet
} from "../../actions/scoresheet_actions";
import { setDisplayScoresheet } from '../../actions/uiActions';

const mapStateToProps = (state) => {
  // let scoresheets = state.auth.currentUser
  //   ? state.auth.currentUser.scoresheet_ids
  //   : [];
  // scoresheets = scoresheets.map(id => state.scoresheets[id]);
  let defaultId = (state.auth.currentUser &&
    state.auth.currentUser.scoresheet_ids &&
    state.auth.currentUser.scoresheet_ids[0])
    ? state.auth.currentUser.scoresheet_ids[0]
    : null;

  return {
    scoresheets: state.scoresheets,
    scoresheet_ids: state.auth.currentUser ? state.auth.currentUser.scoresheet_ids : [],
    user: state.auth.currentUser,
    displayId: state.ui.displayId || (defaultId),
  };
};

const mapDispatchToProps = dispatch => ({
  fetchScoresheets: userId => dispatch(fetchScoresheets(userId)),
  setDisplayScoresheet: displayId => dispatch(setDisplayScoresheet(displayId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Scoresheets);
