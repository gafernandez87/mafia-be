const http = require('http');
const express = require('express');
const socketIo = require('socket.io');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const routes = require('./routes/index');

const app = express();

// Serve static files from the React app
app.use(bodyParser.json());
app.use(cors());
app.use('/api', routes);

const server = http.createServer(app);
const io = socketIo(server);
const port = process.env.PORT || 4001;

const GameController = require('./controllers/Game');
const PlayerController = require('./controllers/Player');

io.on('connection', (socket) => {
  io.emit('game', GameController.getGame());

  socket.on('game', () => {
    socket.emit('game', GameController.getGame());
  });

  socket.on('setAdmin', (id) => {
    const players = PlayerController.setAdmin(id);
    io.emit('game', GameController.updatePlayers(players));
  });

  socket.on('beginGame', () => {
    io.emit('game', GameController.begin());
  });

  socket.on('toggleDay', () => {
    io.emit('game', GameController.toggleDay());
  });
  socket.on('reset', () => {
    io.emit('game', GameController.reset());
  });

  socket.on('changeTurn', (obj) => {
    io.emit('game', GameController.changeTurn(obj.nextTurn, obj.from));
  });

  socket.on('kick', (who) => {
    io.emit('game', GameController.kick(who));
  });

  socket.on('kill', (who) => {
    io.emit('game', GameController.kill(who));
  });

  socket.on('protect', (who) => {
    io.emit('game', GameController.protect(who));
  });

  socket.on('investigate', (who) => {
    socket.emit('investigate', GameController.investigate(who));
  });

  socket.on('disconnect', () => {
    // TODO Investigar como saber quien se desconectó.
    console.log('Client disconnected');
  });
});

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
