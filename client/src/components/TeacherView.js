import React, { useState } from "react";
import { io } from "socket.io-client";
const socket = io("http://localhost:5000");

function TeacherView() {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [timeLimit, setTimeLimit] = useState(60);

 const askQuestion = () => {
  console.log("Asking Question:", { question, options, timeLimit });
  socket.emit("askQuestion", { question, options, timeLimit });
};


  return (
    <div className="teacher">
      <h1>Let’s Get Started</h1>
      <p>Create and manage polls in real-time.</p>
      <textarea
        placeholder="Enter your question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />
      <div>
        {options.map((opt, idx) => (
          <input
            key={idx}
            value={opt}
            onChange={(e) =>
              setOptions(options.map((o, i) => (i === idx ? e.target.value : o)))
            }
            placeholder={`Option ${idx + 1}`}
          />
        ))}
        <button onClick={() => setOptions([...options, ""])}>+ Add Option</button>
      </div>
      <select value={timeLimit} onChange={(e) => setTimeLimit(Number(e.target.value))}>
        <option value={30}>30 seconds</option>
        <option value={60}>60 seconds</option>
        <option value={90}>90 seconds</option>
      </select>
      <button onClick={askQuestion}>Ask Question</button>
    </div>
  );
}

export default TeacherView;
