// import express from 'express';
// import mongoose from 'mongoose';
// import bodyParser from 'body-parser';
// import cors from 'cors';
// import bcrypt from 'bcrypt';
// import chatRouter from './Router/chatRouter.js';
// import userRouter from './Router/userRouter.js';

// const app = express();
// const PORT = 4000;

// app.use(cors());
// app.use(bodyParser.json());
// app.use("/user",userRouter);
// app.use('/chat',chatRouter);

// app.listen(PORT, () => {
// console.log(`Server is running on http://localhost:${PORT}`);
// });

// import express from 'express';
// import mongoose from 'mongoose';
// import bodyParser from 'body-parser';
// import cors from 'cors';
// import userRouter from './Router/userRouter.js';
// import chatRouter from './Router/chatRouter.js';
// import http from "http";
// import { Server } from "socket.io";
// // import messageRouter from './Router/messageRouter.js';

// const app = express();
// const server = http.createServer(app); 
// const io = new Server(server);
// const PORT = 4000;

// app.use(cors());
// app.use(bodyParser.json());
// app.use("/user", userRouter);
// app.use('/chat', chatRouter);
// // app.use('/message', messageRouter); // Corrected the route path

// server.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });

// // Add Socket.IO logic here
// io.on("connection", (socket) => {
//   console.log("A user connected");

//   socket.on("disconnect", () => {
//     console.log("User disconnected");
//   });
// });

import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import userRouter from './Router/userRouter.js';
import chatRouter from './Router/chatRouter.js';
import http from 'http';
import { Server } from 'socket.io';
// import messageRouter from '../backend/Router/messageRouter.js';

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const PORT = 4000;

app.use(cors());
app.use(bodyParser.json());
app.use('/user', userRouter);
app.use('/chat', chatRouter);
// app.use('/message', messageRouter);
// app.use('/message', messageRouter);


// Add Socket.IO logic here
io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });

  // Handle messages here
  socket.on('message', (data) => {
    // Save the message to the database and broadcast to the other user
    // You need to implement this part based on your application logic
    io.to(data.chatId).emit('message', data);
  });

  socket.on('join', (chatId) => {
    // Join the room corresponding to the chat ID
    socket.join(chatId);
  });
});

// Your other routes and logic go here

// Start the combined server
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`Socket.IO is listening on the same server instance.`);
});



