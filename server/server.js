var express = require('express');
var path = require('path');

var app = express();
var port = 5325;

// app start
var server = app.listen(port, function(){
  console.log('app is running at http://10.10.4.166:%s', port);
});


// chat sandbox
var io = require('socket.io')(server);

var chatUsers = 0;
var chatHistory = [];
var chatHistoryMax = 10;

io.on('connection', function(socket){

  io.emit('userCount', ++chatUsers);

  socket.on('getHistory', function(){
    socket.emit('history', chatHistory);
  })

  socket.on('chatMessage', function(message){
    if (chatHistory.length >= chatHistoryMax) chatHistory.shift();
    
    chatHistory.push(message);
    
    socket.broadcast.emit('chatMessage', message);
  })

  socket.on('newProduct', function(product) {
    socket.broadcast.emit('newProduct', product);
  })

  socket.on('productDelete', function(id) {
    socket.broadcast.emit('productDelete', id);
  })

  socket.on('disconnect', function(){
    io.emit('userCount', --chatUsers)
  })

})


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
