import React from "react";
import PropTypes from "prop-types";
import FacebookLogin from "react-facebook-login";
import { connect } from "react-redux";
import { authenticateUser } from "../../actions/auth_actions";

class signIn extends React.Component {
  static propTypes = {
    authenticateUser: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.authCallback = this.authCallback.bind(this);
  }

  authCallback(auth) {
    window.FB.login((auth) => {
      const socialToken = auth.authResponse.accessToken;
      this.props.authenticateUser(socialToken)
    })
  }

  render() {
    return (
      <nav>
        <FacebookLogin
    appId="312658112474450"
    autoLoad={true}
    fields="name,email,picture"
    cssClass="facebook-button"
    textButton="Login with le Facebook"
    callback={this.authCallback} />,
      </nav>

    )
  }
}

const mapDispatchToProps = dispatch => ({
  authenticateUser: facebookData => dispatch(authenticateUser(facebookData))
});

export default connect(null, mapDispatchToProps)(signIn);
