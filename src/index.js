const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");
const Authentication = require("./routes/Authentication");
const app = express();
const port = process.env.PORT || 8000;

app.use(cors());

app.use(Authentication);

const server = http.createServer(app);

const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

let interval;

io.on("connection", (socket) => {
  console.log("New client connected");
  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(() => getApiAndEmit(socket), 1000);
  socket.on("disconnect", () => {
    console.log("Client disconnected");
    clearInterval(interval);
  });
  socket.on("join_room", (data) => {
    console.log(data);
    socket.emit("respond", { hello: "Hey, Mr.Client!" });
  });
  socket.on("send_message", (data) => {
    console.log(data);
    socket.to(data.room).emit("receive_message", data);
  });
});

const getApiAndEmit = (socket) => {
  const response = new Date();
  socket.emit("FromAPI", response);
};

server.listen(port, () => console.log(`Listening on port ${port}`));
