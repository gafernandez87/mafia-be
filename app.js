const http = require('http');
const express = require('express');
const socketIo = require('socket.io');
const bodyParser = require('body-parser');
const cors = require('cors');

const routes = require('./routes/index');

const socketConnection = require('./socket-utils');

const app = express();

const corsOptions = {
  // origin: "http://localhost:3000",
  origin: "https://mafia-fe.vercel.app",
  methods: ["GET", "POST"],
  credentials: true // Permite el uso de cookies/sesiones
};

// Serve static files from the React app
app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use('/api', routes);

const server = http.createServer(app);
const io = socketIo(server, {cors: corsOptions});
const port = process.env.PORT || 4001;

io.on('connection', (socket) => socketConnection(socket, io));

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
