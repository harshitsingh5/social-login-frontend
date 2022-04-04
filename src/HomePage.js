import React, { Component, useState } from "react";
import axios from "axios";

const HomePage = () => {

  let fbLoginResponse = null;
  let lnkdLoginResponse = null;
  

  const LinkedinLogin = ({ accesstoken }) => {
    axios
      .post("http://localhost:8000/linkedin/", { access_token: accesstoken })
      .then((res) => {
        lnkdLoginResponse = res?.data;
      })
      .catch((e) => console.log(e));
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    window.location='/';
  };

  return (
  <>
    <div style={{position:'absolute', textAlign:'center', top:'50%', left:'50%', transform:'translate(-50%, -50%)'}}>
      <div style={{fontSize:'50px' }}>HOMEPAGE</div>
      <br/><br/>
      <div style={{fontSize:'30px' }}>Hello User, You are logged in. </div>
      <br/><br/><br/>
      <button onClick={logout} style={{fontSize:'20px' }}>Logout</button> 
    </div>
  </>
  );
};

export default HomePage;
