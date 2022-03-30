import React, { Component } from "react";
import axios from "axios";

const FbLogin = ({accesstoken}) => {
  axios.post("http://localhost:8000/facebook/", { access_token: accesstoken });

};

export default FbLogin;
