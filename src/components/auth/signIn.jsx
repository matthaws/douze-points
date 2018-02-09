import React from "react";
import PropTypes from "prop-types";
import FacebookLogin from "react-facebook-login";
import { connect } from "react-redux";
import { authenticateUser } from "../../actions/auth_actions";
import "./signin.css";

class signIn extends React.Component {
  static propTypes = {
    authenticateUser: PropTypes.func.isRequired,
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
      <FacebookLogin
        appId="312658112474450"
        autoLoad={true}
        fields="name,email,picture"
        cssClass="facebook-button"
        textButton="Login with Facebook"
        callback={this.authCallback}
      />
    )
  }
}

//=========================================================

const mapDispatchToProps = dispatch => ({
  authenticateUser: facebookData => dispatch(authenticateUser(facebookData))
});

export default connect(null, mapDispatchToProps)(signIn);
