const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
  },
});

let currentQuestion = null;
let studentResponses = {};
let chatMessages = [];

io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("askQuestion", (question) => {
    currentQuestion = question;
    studentResponses = {};
    io.emit("newQuestion", question);
  });

  socket.on("submitAnswer", ({ name, answer }) => {
    studentResponses[name] = answer;
    io.emit("updateResults", studentResponses);
  });

  socket.on("chatMessage", (msg) => {
    chatMessages.push(msg);
    io.emit("chatUpdate", chatMessages);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

server.listen(5000, () => {
  console.log("Server running on port 5000");
});
