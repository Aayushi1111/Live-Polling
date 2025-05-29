// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import TeacherView from "./components/TeacherView";
import StudentView from "./components/StudentView";

function App() {
  return (
    <Router>
      <div>
        {/* Optional: Navigation */}
        <nav style={{ marginBottom: "20px" }}>
          <Link to="/teacher" style={{ marginRight: "15px" }}>👩‍🏫 Teacher</Link>
          <Link to="/student">🧑‍🎓 Student</Link>
        </nav>

        <Routes>
          <Route path="/teacher" element={<TeacherView />} />
          <Route path="/student" element={<StudentView />} />
          <Route path="*" element={<h2>Welcome! Choose a view above.</h2>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
