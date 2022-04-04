import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import FacebookSocialAuth from './FacebookSocialAuth';
import HomePage from './HomePage';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={localStorage.getItem('authToken') ? <HomePage /> : <FacebookSocialAuth/> } />
          <Route path="login" element={<FacebookSocialAuth/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
