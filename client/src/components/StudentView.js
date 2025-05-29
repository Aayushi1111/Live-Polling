import React, { useEffect, useState } from "react";
import io from "socket.io-client";

// 🔌 Connect to backend
const socket = io("http://localhost:5000"); // Make sure port matches your backend

function StudentView() {
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [selectedOption, setSelectedOption] = useState("");
  const [hasAnswered, setHasAnswered] = useState(false);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    // 👂 Listen for new question
    socket.on("newQuestion", (data) => {
      console.log("Received Question:", data); // ✅ Should print object
      setCurrentQuestion(data);
      setHasAnswered(false);
      setSelectedOption("");
      setTimer(data.timeLimit); // Example: 60
    });

    // ⏱ Countdown timer
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => {
      clearInterval(interval);
      socket.off("newQuestion");
    };
  }, []);

  const handleAnswer = (option) => {
    if (hasAnswered) return;

    setSelectedOption(option);
    setHasAnswered(true);

    socket.emit("submitAnswer", { answer: option });
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>👨‍🎓 Student View</h1>

      {!currentQuestion ? (
        <h2>No question yet...</h2>
      ) : (
        <div>
          <h2>{currentQuestion.question}</h2>

          <ul style={{ listStyleType: "none", padding: 0 }}>
            {currentQuestion.options.map((option, index) => (
              <li key={index} style={{ margin: "10px" }}>
                <button
                  onClick={() => handleAnswer(option)}
                  disabled={hasAnswered}
                  style={{
                    padding: "10px 20px",
                    backgroundColor:
                      hasAnswered && selectedOption === option
                        ? "lightgreen"
                        : "#e0e0e0",
                    border: "none",
                    borderRadius: "8px",
                    cursor: hasAnswered ? "not-allowed" : "pointer",
                    fontWeight: "bold",
                  }}
                >
                  {option}
                </button>
              </li>
            ))}
          </ul>

          <p>Time left: {timer}s</p>
          {hasAnswered && <p>Answer submitted!</p>}
        </div>
      )}
    </div>
  );
}

export default StudentView;
