import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

const StudentView = () => {
  const [name, setName] = useState("");
  const [question, setQuestion] = useState(null);
  const [selectedOption, setSelectedOption] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    socket.on("newQuestion", (q) => {
      setQuestion(q);
      setSubmitted(false);
    });

    return () => {
      socket.off("newQuestion");
    };
  }, []);

  const handleSubmit = () => {
    if (selectedOption) {
      socket.emit("submitAnswer", {
        studentName: name,
        answer: selectedOption,
      });
      setSubmitted(true);
    }
  };

  if (!name) {
    return (
      <div style={{ padding: "2rem" }}>
        <h2>Enter your name</h2>
        <input onChange={(e) => setName(e.target.value)} />
      </div>
    );
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Welcome, {name}</h1>

      {!question ? (
        <p>Waiting for the teacher to ask a question...</p>
      ) : submitted ? (
        <p>Answer submitted. Waiting for results...</p>
      ) : (
        <div>
          <h2>{question.question}</h2>
          {question.options.map((opt, i) => (
            <div key={i}>
              <input
                type="radio"
                name="option"
                value={opt}
                onChange={(e) => setSelectedOption(e.target.value)}
              />
              {opt}
            </div>
          ))}
          <button onClick={handleSubmit}>Submit Answer</button>
        </div>
      )}
    </div>
  );
};

export default StudentView;
