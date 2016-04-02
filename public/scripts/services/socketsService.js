angular.module('myApp')

.service('socketsService', [socketsService])

function socketsService(){

  var _socket = io.connect('http://localhost:5325');
  
  return _socket;

}