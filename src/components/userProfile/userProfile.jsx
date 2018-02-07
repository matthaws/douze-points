import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchUser } from "../../actions/user_actions";

class UserProfile extends React.Component {
  static propTypes = {
    userId: PropTypes.integer.isRequired,
    user: PropTypes.object
  }

  static defaultProps = {
    user: {
      username: "",
      email: "",
      bio: "",
      avatar_url: "/defaultprofile.png"
    }
  }

  componentDidMount() {
    if (this.props.user === undefined) {
      this.props.fetchUser(this.props.userId);
    }
  }

  render() {

  }
}

// REDUX ------------------------------------

const mapStateToProps = (state, ownProps) => {
  const userId = ownProps.match.params.id;
  return {
    user: state.users[ownProps.match.params.id],
    userId
  };
};

const mapDispatchToProps = dispatch => ({
  fetchUser: id => dispatch(fetchUser(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
