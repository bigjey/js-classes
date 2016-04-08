var express = require('express');
var path = require('path');

var app = express();
var port = 5325;

var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

var mongoose = require('mongoose');

var dbUser = 'js-classes';
var dbPassword = 'cv7654321';
var dbUrl = 'mongodb://' + dbUser + ':' + dbPassword + '@ds013260.mlab.com:13260/baraholka';

mongoose.connect(dbUrl);

var Product = require('./models/product');


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

var apiRouter =  express.Router();

apiRouter.route('/products')
  .get(function(req, res){
    Product.find({}, function(err, docs) {
      if (err) throw new err;

      res.json(docs);
    })
  })

app.use('/api', apiRouter);

app.get('*', function(req, res) {
  res.sendFile(path.resolve(__dirname + '/../public/app.html'));
})

// app start
app.listen(port, function(){
  console.log('app is running at http://localhost:%s', port);
});