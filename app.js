const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const path = require('path');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index');
});
var history = [];
var userNames = {};

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('setSocketId', function(data) {
    var userName = data.name;
    var userId = data.userId;
    userNames[userName] = userId;
  });

  io.once('connect', () => {
    io.emit('chat message', ': test')
  })

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('chat message', (msg) => {
    io.emit('chat message', `: ${msg}`);
  });
});


server.listen(process.env.PORT || 3000, () => {
  console.log('server listening');
});

module.exports = app;