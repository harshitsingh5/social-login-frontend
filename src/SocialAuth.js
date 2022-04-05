import React, { useState } from "react";
import axios from "axios";
import FacebookLogin from "react-facebook-login";
import { LinkedIn, useLinkedIn } from "react-linkedin-login-oauth2";
import linkedin from "react-linkedin-login-oauth2/assets/linkedin.png";

const SocialAuth = () => {
  const fbResponse = (response) => {
    // console.log(response);

    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    };

    axios
      .post(
        "http://localhost:8000/facebook",
        { auth_token: response.accessToken },
        { headers }
      )
      .then((res) => {
        let fbLoginResponse = res?.data?.tokens?.access;
        if (fbLoginResponse) {
          localStorage.setItem("authToken", fbLoginResponse);
          window.location = "/";
        }
      })
      .catch((e) => console.log(e));
  };

  const responseLinkedin = response => {
    console.log(response)
  }

  // function showLin() {
  //   return <LinkedIn
  //     // clientId="77mh7zgv7lrcb6"
  //     clientId="81wrdonc7mzh15"
  //     clientSecret="3DeWXvnsWeOtK783"
  //     scope='r_basicprofile r_emailaddress r_contactinfo r_network'
  //     onFailure={responseLinkedin}
  //     onSuccess={responseLinkedin}
  //     redirectUri="http://localhost:3000/login"
  //   >
  //   </LinkedIn>
  // }

  const { linkedInLogin } = useLinkedIn({
    clientId: "78xx67hewmxxlr",
    clientSecret: "X6Ju6nl6q5a9UF05",
    // redirectUri: `${window.location.origin}/signin-linkedin`,
    // redirectUri: `https://127.0.0.1:3000/signin-linkedin`,
    redirectUri: `https://localhost:3000/signin-linkedin`,
    onSuccess: (code) => {
      console.log(code);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return (
    <div className="App">
      {/* <div style={{position:'absolute', textAlign:'center', top:'50%', left:'50%', transform:'translate(-50%, -50%)'}}> */}
      <div style={{ marginTop: "80px" }}>
        <h1>LOGIN PAGE</h1>
        <br />
        <br />
        <FacebookLogin
          textButton="LOGIN WITH FACEBOOK"
          appId="492601505740558"
          fields="name,email,picture"
          callback={fbResponse}
        />
        <br />
        <br />
        {/* {showLin()} */}
        <img
          onClick={linkedInLogin}
          src={linkedin}
          alt="Sign in with LinkedIn"
          style={{ maxWidth: "238px", cursor: "pointer" }}
        />
      </div>
    </div>
  );
};

export default SocialAuth;
