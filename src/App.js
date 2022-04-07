import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import SocialAuth from './SocialAuth';
import HomePage from './HomePage';
import { LinkedInPopUp } from 'react-linkedin-login-oauth2';
// import { LinkedInCallback } from 'react-linkedin-login-oauth2';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={localStorage.getItem('authToken') ? <HomePage /> : <SocialAuth/> } />
          <Route path="login" element={localStorage.getItem('authToken') ? <HomePage /> : <SocialAuth/> } />
          <Route exact path="/linkedin" element= {<LinkedInPopUp/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
