import React from 'react';
import './LandingPage.css';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      <h1>Welcome to Live Polling App</h1>
      <p className="subtitle">Real-time polls for classrooms, events, and more!</p>
      <div className="role-buttons">
        <button className="role-btn" onClick={() => navigate('/teacher')}>I am a Teacher</button>
        <button className="role-btn" onClick={() => navigate('/student')}>I am a Student</button>
      </div>
    </div>
  );
};

export default LandingPage;
