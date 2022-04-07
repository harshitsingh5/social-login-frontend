import React, { useState } from "react";
import axios from "axios";
import FacebookLogin from "react-facebook-login";
import { LinkedIn } from "react-linkedin-login-oauth2";
// import { LinkedIn, useLinkedIn } from "react-linkedin-login-oauth2";
import linkedin from "react-linkedin-login-oauth2/assets/linkedin.png";
import { GoogleLogin } from "react-google-login";

const SocialAuth = () => {
  const gclientId =
    "41857448079-of9kcsc6q9bo6ucrcfodr96mcr9hnp0o.apps.googleusercontent.com";

  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  };

  const [data, setData] = useState("");
  // console.log("🚀 ~ file: SocialAuth.js ~ line 17 ~ SocialAuth ~ data", data)
  const [error, setError] = useState("");

  const fbResponse = (response) => {
    console.log(response);

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

  
  const linkedBackendApi = (code) => {
    axios
      .post(
        "http://localhost:8000/linkedin",
        { auth_token: code },
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
  

  
  // FOR GOOGLE LOGIN
  
  
  
  const onSuccess = (res) => {
    console.log("Login Success: currentUser:", res);
    // alert(`Logged in successfully welcome ${res.profileObj.name} 😍. \n See console for full profile object.`);
    // refreshTokenSetup(res);

    axios
      .post(
        "http://localhost:8000/google",
        { auth_token: res.tokenObj.id_token },
        { headers }
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
    // console.log("Login failed: res:", res);
    // alert(`Failed to login. 😢 `);
  };

  return (
    <div className="App">
      {/* <div style={{position:'absolute', textAlign:'center', top:'50%', left:'50%', transform:'translate(-50%, -50%)'}}> */}
      <div style={{ marginTop: "80px" }}>
        <h1>LOGIN PAGE</h1>
        <br />
        <br />
        <div>
          <FacebookLogin
          textButton="LOGIN WITH FACEBOOK"
          appId="492601505740558"
          fields="name,email,picture"
          callback={fbResponse}
        />
        </div>
        <br />
        <br />
        {/* <img
          onClick={linkedInLogin}
          src={linkedin}
          alt="Sign in with LinkedIn"
          style={{ maxWidth: "238px", cursor: "pointer" }}
        /> */}

        <LinkedIn
          clientId="78xx67hewmxxlr"
          onFailure={(errorr) => {
            setError(errorr.response.data.message);
            console.log("🚀 ~ file: SocialAuth.js ~ line 122 ~ SocialAuth ~ error", error)
          }}
          onSuccess={(data) => {
            setData(data?.code);
            console.log("🚀 ~ file: SocialAuth.js ~ line 126 ~ SocialAuth ~ code", data?.code)
            // linkedBackendApi(data?.code);
          }}
          redirectUri="https://localhost:3000/linkedin"
        >
          <img
          src={linkedin}
          alt="Sign in with LinkedIn"
          style={{ maxWidth: "238px", cursor: "pointer" }}
        />
        </LinkedIn>

        <br />
        <br />
        <div>
          <GoogleLogin
            clientId={gclientId}
            buttonText="Login"
            onSuccess={onSuccess}
            onFailure={onFailure}
            cookiePolicy={"single_host_origin"}
            style={{ marginTop: "100px" }}
            isSignedIn={false}
          />
        </div>

        {/* <button onClick={gsignIn} className="button">
          <img src="icons/google.svg" alt="google login" className="icon"></img>
          <span className="buttonText">Sign in with Google</span>
        </button> */}
      </div>
    </div>
  );
};

export default SocialAuth;
