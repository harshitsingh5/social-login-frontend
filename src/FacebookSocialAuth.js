import React, { Component } from "react";
import axios from "axios";
import FacebookLogin from "react-facebook-login";

const FacebookSocialAuth = () => {

  const fbResponse = (response) => {
    // console.log(response);

    const headers = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }

    axios
      .post("http://localhost:8000/facebook", { auth_token: response.accessToken }, {headers} )
      .then((res) => {
        let fbLoginResponse = res?.data?.tokens?.access ;
        if (fbLoginResponse) {
          localStorage.setItem('authToken', fbLoginResponse);
          window.location='/';
        }
      })
      .catch((e) => console.log(e));
  };

  return (
    <div className="App">
      <h1>LOGIN PAGE</h1>

      <FacebookLogin
        textButton="LOGIN WITH FACEBOOK"
        appId="492601505740558"
        fields="name,email,picture"
        callback={fbResponse}
      />
    </div>
  );
}

export default FacebookSocialAuth;
