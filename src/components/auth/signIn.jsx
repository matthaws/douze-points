import React from "react";
import { connect } from "react-redux";
import { signInUser } from "../../actions/reduxAuthActions";
import { authUrl, omniauthURL } from "../../util/constants";

class signIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: "", password: "" };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    const user = this.state;
    const { signInUser } = this.props;
    signInUser(user);
  }

  popUpFacebook() {
    window.open(
      `http://localhost:3000/auth/facebook`,
      "newwindow",
      "toolbar=0,status=0,width=548,height=325,top=150,left=400"
    );
  }

  popUpGoogle() {
    window.open(
      `http://localhost:3000/auth/google`,
      "newwindow",
      "toolbar=0,status=0,width=548,height=325,top=150,left=400"
    );
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Username
            <input type="text" />
          </label>
          <label>
            Password
            <input type="password" />
          </label>
        </form>
        <p onClick={this.popUpFacebook}>Log in with Facebook</p>
        <p onClick={this.popUpGoogle}>Log in with Google</p>
      </div>
    );
  }
}

export default connect(null, { signInUser })(signIn);
