import React, { useState } from "react";
import axios from "axios";
import FacebookLogin from "react-facebook-login";
import { LinkedIn, useLinkedIn } from "react-linkedin-login-oauth2";
import linkedin from "react-linkedin-login-oauth2/assets/linkedin.png";
import { GoogleLogin, useGoogleLogin } from "react-google-login";

const SocialAuth = () => {

  const gclientId = "41857448079-of9kcsc6q9bo6ucrcfodr96mcr9hnp0o.apps.googleusercontent.com";

  const fbResponse = (response) => {
    console.log(response);

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

  const responseLinkedin = (response) => {
    console.log(response);
  };

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

  // const gLogin = () => {
  const onSuccess = (res) => {
    console.log("Login Success: currentUser:", res);
    // alert(`Logged in successfully welcome ${res.profileObj.name} 😍. \n See console for full profile object.`);
    // refreshTokenSetup(res);

    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    };

    axios
      .post(
        "http://localhost:8000/google",
        { auth_token: res.tokenObj.id_token },
        { headers },
        // console.log('after post', res.tokenObj.id_token)
      )
      .then((res) => {
        // console.log('then', res)
        let gLoginResponse = res?.data?.username;
        if (gLoginResponse) {
          localStorage.setItem("authToken", gLoginResponse);
          window.location = "/";
        }
      })
      .catch((e) => console.log(e));
  };

  const onFailure = (res) => {
    console.log("Login failed: res:", res);
    // alert(`Failed to login. 😢 `);
  };
  // };

  // const { gsignIn } = useGoogleLogin({
  //   onSuccess,
  //   onFailure,
  //   gclientId,
  //   isSignedIn: true,
  //   accessType: 'offline',
  //   // responseType: 'code',
  //   // prompt: 'consent',
  // });


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
        <br />
        <br />
        <GoogleLogin
          clientId={gclientId}
          buttonText="Login"
          onSuccess={onSuccess}
          onFailure={onFailure}
          cookiePolicy={"single_host_origin"}
          style={{ marginTop: "100px" }}
          isSignedIn={false}
        />

        {/* <button onClick={gsignIn} className="button">
          <img src="icons/google.svg" alt="google login" className="icon"></img>
          <span className="buttonText">Sign in with Google</span>
        </button> */}
      </div>
    </div>
  );
};

export default SocialAuth;
