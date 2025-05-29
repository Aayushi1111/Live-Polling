import React, { useState } from "react";
import TeacherView from "./components/TeacherView";
import StudentView from "./components/StudentView";
import "./App.css"; // Import the CSS you’ll define next

function App() {
  const [role, setRole] = useState(null);

  return (
    <div>
      {!role ? (
        <div className="landing-container">
          <h1>Welcome to Live Polling App</h1>
          <p className="subtitle">Real-time polls for classrooms, events, and more!</p>
          <div className="role-buttons">
            <button className="role-btn" onClick={() => setRole("teacher")}>
              I am a Teacher
            </button>
            <button className="role-btn" onClick={() => setRole("student")}>
              I am a Student
            </button>
          </div>
        </div>
      ) : role === "teacher" ? (
        <TeacherView />
      ) : (
        <StudentView />
      )}
    </div>
  );
}

export default App;
