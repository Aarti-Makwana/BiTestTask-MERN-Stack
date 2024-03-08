// socketServer.js
import express from "express";
import http from "http";
import { Server } from "socket.io";
// import mongooes from './model/connection.js';
import mongoose from 'mongoose';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

mongoose.connect("mongodb://localhost:27017/BrainInventory_db");

io.on("connection", (socket) => {
  console.log("A user connected");

  // Handle messages here
  socket.on("message", (data) => {
    // Save the message to the database and broadcast to the other user
    // You need to implement this part based on your application logic
    io.to(data.chatId).emit("message", data);
  });

  socket.on("join", (chatId) => {
    // Join the room corresponding to the chat ID
    socket.join(chatId);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
