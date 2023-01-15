let readyPlayerCount = 0;
const ioClient = require('socket.io-client');
const flaskSocket = ioClient.connect('http://localhost:5000/pong');
let UUID1 = "";
let UUID2 = "";


function listen(io) {
  const pongNamespace = io.of('/pong');
  //const flaskNamespace = io.of('http://127.0.0.1:5000/socket.io/?EIO=3&transport=websocket&ns=pong');
  pongNamespace.on('connection', (socket) => {
    let room;

    console.log('a user connected', socket.id);

    socket.on('ready', (UUID) => {
      room = 'room' + Math.floor(readyPlayerCount / 2);
      socket.join(room);

      console.log('Player ready', socket.id, room, UUID);

      readyPlayerCount++;

      if (readyPlayerCount % 2 === 0) {
        pongNamespace.in(room).emit('startGame', socket.id);
        UUID2 = UUID;
        console.log("Player 2: ",UUID2);
      }
      else{
        UUID1 = UUID;
        console.log("Player 1: ",UUID1);
      }
    });

    socket.on('paddleMove', (paddleData) => {
      socket.to(room).emit('paddleMove', paddleData);
    });

    socket.on('ballMove', (ballData) => {
      socket.to(room).emit('ballMove', ballData);
    });

    socket.on('timer', (timerTime) => {
      socket.to(room).emit('timer', timerTime);
    });

    socket.on('finished', (winnerId) => {
      ({winner, score} = winnerId);
      socket.to(room).emit('finished', winnerId);
      /*ws.on('open', function open() {
          ws.send(JSON.stringify({name:'finished',args:[winnerId]}));
      });*/
      flaskSocket.emit('finished', {"winnerId": winner, "UUID1":UUID1, "UUID2": UUID2, "score1": score[1], "score2": score[0]});
    });

    socket.on('disconnect', (reason) => {
      console.log(`Client ${socket.id} disconnected: ${reason}`);
      socket.leave(room);
    });   
  })
}

module.exports = {
  listen,
};
