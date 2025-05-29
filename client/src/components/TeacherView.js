import React, { useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

function TeacherView() {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [timeLimit, setTimeLimit] = useState(60);
  const [currentQuestion, setCurrentQuestion] = useState(null); // new state

  const askQuestion = () => {
    const newQuestion = { question, options, timeLimit };
    console.log("Asking Question:", newQuestion);
    socket.emit("askQuestion", newQuestion);
    setCurrentQuestion(newQuestion); // store it in local state for UI display
  };

  return (
    <div className="teacher" style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Let’s Get Started</h1>
      <p>Create and manage polls in real-time.</p>

      <textarea
        placeholder="Enter your question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        style={{ width: "100%", height: "80px", marginBottom: "10px" }}
      />

      <div style={{ marginBottom: "10px" }}>
        {options.map((opt, idx) => (
          <input
            key={idx}
            value={opt}
            onChange={(e) =>
              setOptions(options.map((o, i) => (i === idx ? e.target.value : o)))
            }
            placeholder={`Option ${idx + 1}`}
            style={{ marginRight: "10px", marginBottom: "5px" }}
          />
        ))}
        <button onClick={() => setOptions([...options, ""])} style={{ backgroundColor: "#7C4DFF", color: "#fff", border: "none", padding: "6px 10px", borderRadius: "4px" }}>
          + Add Option
        </button>
      </div>

      <select
        value={timeLimit}
        onChange={(e) => setTimeLimit(Number(e.target.value))}
        style={{ marginRight: "10px", padding: "5px" }}
      >
        <option value={30}>30 seconds</option>
        <option value={60}>60 seconds</option>
        <option value={90}>90 seconds</option>
      </select>

      <button
        onClick={askQuestion}
        style={{
          backgroundColor: "#7C4DFF",
          color: "#fff",
          border: "none",
          padding: "10px 20px",
          borderRadius: "6px",
          cursor: "pointer"
        }}
      >
        Ask Question
      </button>

      {currentQuestion && (
        <div
          className="asked-question"
          style={{
            marginTop: "30px",
            padding: "15px",
            border: "1px solid #ccc",
            borderRadius: "8px",
            backgroundColor: "#f9f9ff"
          }}
        >
          <h2>Current Question:</h2>
          <p><strong>Q:</strong> {currentQuestion.question}</p>
          <ul>
            {currentQuestion.options.map((opt, idx) => (
              <li key={idx}>{opt}</li>
            ))}
          </ul>
          <p><strong>Time Limit:</strong> {currentQuestion.timeLimit} seconds</p>
        </div>
      )}
    </div>
  );
}

export default TeacherView;
