import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import SocialAuth from './SocialAuth';
import HomePage from './HomePage';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={localStorage.getItem('authToken') ? <HomePage /> : <SocialAuth/> } />
          <Route path="login" element={localStorage.getItem('authToken') ? <HomePage /> : <SocialAuth/> } />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
