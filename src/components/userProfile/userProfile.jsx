import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchUser } from "../../actions/userActions";
import { startSpinner, endSpinner } from "../../actions/uiActions";
import "./userProfile.css";

class UserProfile extends React.Component {
  // propTypes help us specify exactly what props this thing
  // should be expecting and what kind of thing they should be
  static propTypes = {
    userId: PropTypes.string.isRequired,
    user: PropTypes.object
  }

  // defaultProps - when the component doesn't receive a "user" prop
  // then it uses what we've defined below. We never get an undefined error
  // ever again!
  static defaultProps = {
    user: {
      username: "LOADING...",
      email: "",
      bio: "",
      avatar_url: "/defaultprofile.png"
    }
  }

  componentDidMount() {
    if (this.props.user.username === "LOADING...") {
      this.props.startSpinner();
      this.props.fetchUser(this.props.userId);
    }
  }

  componentWillReceiveProps() {
    if (this.props.isSpinning && this.props.user.username !== "LOADING...") {
      this.props.endSpinner();
    }
  }

  render() {
    const { user } = this.props;
    return (
      <div>
        <section className="user-profile">
          <h1 className="username">{user.username}</h1>
          <img className="profile-pic" alt="profile-pic" src={user.avatar_url} />
          <h3 className="bio">{user.bio}</h3>
        </section>
        <section className="scoresheets">
          <h1>My Scoresheets:</h1>
        </section>
      </div>
    )
  }
}

// REDUX ------------------------------------

const mapStateToProps = (state, ownProps) => {
  const userId = ownProps.match.params.id;
  const isSpinning = state.ui.spinner;
  return {
    user: state.users[ownProps.match.params.id],
    userId,
    isSpinning
  };
};

const mapDispatchToProps = dispatch => ({
  fetchUser: id => dispatch(fetchUser(id)),
  startSpinner: () => dispatch(startSpinner()),
  endSpinner: () => dispatch(endSpinner())
});

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
