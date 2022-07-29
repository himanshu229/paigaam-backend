const express = require("express");
const bodyParser = require("body-parser");
const http = require("http");
const cors = require("cors");
const { ApolloServer } = require("apollo-server-express");
const { ApolloServerPluginDrainHttpServer } = require("apollo-server-core");
const socketIo = require("socket.io");

const { queryschema } = require("./query");
const { corsAuth, istokenAuth } = require("./middleware");
require("./dbConnection/connection");

const app = express();
const port = process.env.PORT || 8000;

app.use(cors(corsAuth));

app.use(bodyParser.json());

app.use(istokenAuth);

const httpServer = http.createServer(app);

const serverApollo = new ApolloServer({
  schema: queryschema,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

const serverStart = async () => {
  await serverApollo.start();
  await serverApollo.applyMiddleware({ app });
};

serverStart();

httpServer.listen(port, () => console.log(`Listening on port ${port}`));

// const io = socketIo(server, {
//   cors: {
//     origin: `${process.env.CLIENT_URL}`,
//     methods: ["GET", "POST"],
//   },
// });

// let interval;

// io.on("connection", (socket) => {
//   console.log("New client connected");
//   if (interval) {
//     clearInterval(interval);
//   }
//   interval = setInterval(() => getApiAndEmit(socket), 1000);
//   socket.on("disconnect", () => {
//     console.log("Client disconnected");
//     clearInterval(interval);
//   });
//   socket.on("join_room", (data) => {
//     console.log(data);
//     socket.emit("respond", { hello: "Hey, Mr.Client!" });
//   });
//   socket.on("send_message", (data) => {
//     console.log(data);
//     socket.to(data.room).emit("receive_message", data);
//   });
// });

// const getApiAndEmit = (socket) => {
//   const response = new Date();
//   socket.emit("FromAPI", response);
// };
