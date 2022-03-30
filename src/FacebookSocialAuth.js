import React, { Component } from "react";
import FacebookLogin from "react-facebook-login";
import FbLogin from "./FbLogin";

class FacebookSocialAuth extends Component {
  render() {
    const fbResponse = (response) => {
      console.log(response);
      FbLogin(response);
    };

    return (
      <div className="App">
        <h1>LOGIN WITH FACEBOOK</h1>

        <FacebookLogin
          textButton="LOGIN WITH FACEBOOK"
          appId="492601505740558"
          fields="name,email,picture"
          callback={fbResponse}
        />
      </div>
    );
  }
}

export default FacebookSocialAuth;
