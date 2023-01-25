const http = require("http");
const sockets = require("./sockets");
const io = require("socket.io");
const cors = require('cors');


const port = process.env.PORT || 51000;

const apiServer = require("./api");
const httpServer = http.createServer(apiServer);
const socketServer = io(httpServer, {
  cors: {
    origin: "*",
  },
});

httpServer.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});

sockets.listen(socketServer);