var express = require('express');
var path = require('path');

var app = express();
var port = 5325;

var userCount = 0;
// app start
var server = app.listen(port, function(){
  console.log('app is running at http://localhost:%s', port);
});

var socketServer = require("socket.io")(server);

var chatHistory = [];

socketServer.on('connection', function(user) {
  
  user.emit('history', {
    messages: chatHistory
  });

  user.on('username', function(data) {
    user.username = data.name;
  })

  socketServer.emit('User Count', ++userCount);

  user.on('disconnect', function() {
    --userCount;
    socketServer.emit('User Count', userCount);
  });

  user.on('chatMessage', function(data) {
    var message = {
      username: user.username,
      text: data.text
    }
    chatHistory.push(message);
    user.broadcast.emit('serverChatMessage', message);
  })
});

// middlwares

// serve static files from node_modules
// when requesting "/libs"
app.use('/libs', express.static(
  path.resolve(__dirname + '/../node_modules/')
))

// serve all static files from public
app.use(express.static(
  path.resolve(__dirname + '/../public/')
))

// app routes
app.get('*', function(req, res){
  res.sendFile(path.resolve(__dirname + '/../public/app.html'));
})
