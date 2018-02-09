import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchUser } from "../../actions/userActions";

class UserProfile extends React.Component {
  static propTypes = {
    userId: PropTypes.string.isRequired,
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
    if (this.props.user.username === "") {
      this.props.fetchUser(this.props.userId);
    }
  }

  render() {
    const { user } = this.props;
    return (
      <section>
        <h1>{user.username}</h1>
        <h3>{user.bio}</h3>
        <img src={user.avatar_url} />
      </section>
    )
  }
}

// REDUX ------------------------------------

const mapStateToProps = (state, ownProps) => {
  debugger
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
