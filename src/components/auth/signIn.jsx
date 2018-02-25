import React from "react";
import PropTypes from "prop-types";
import FacebookLogin from "react-facebook-login";
import { connect } from "react-redux";
import { authenticateUser } from "../../actions/authActions";
import { startSpinner } from "../../actions/uiActions";
import "./signin.css";

class signIn extends React.Component {
  static propTypes = {
    authenticateUser: PropTypes.func.isRequired,
    startSpinner: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.authCallback = this.authCallback.bind(this);
  }

  authCallback(auth) {
    this.props.startSpinner();
    window.FB.login(auth => {
      const socialToken = auth.authResponse.accessToken;
      this.props.authenticateUser(socialToken);
    });
  }

  render() {
    return (
      <div className="login-wrapper">
        <FacebookLogin
          appId="312658112474450"
          autoLoad={true}
          fields="name,email,picture"
          cssClass="facebook-button"
          textButton="Login with Facebook"
          callback={this.authCallback}
        />
      </div>
    );
  }
}

//=========================================================

const mapDispatchToProps = dispatch => ({
  authenticateUser: facebookData => dispatch(authenticateUser(facebookData)),
  startSpinner: () => dispatch(startSpinner())
});

export default connect(null, mapDispatchToProps)(signIn);
