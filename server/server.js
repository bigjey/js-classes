var express = require('express');
var path = require('path');

var app = express();
var port = 5325;

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

// app start
app.listen(port, function(){
  console.log('app is running at http://localhost:%s', port);
});