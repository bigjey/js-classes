angular.module('myApp')

.controller('chatCtrl', ['$scope', '$timeout', chatCtrl]);

function chatCtrl($scope, $timeout){

  var socket = io.connect('http://10.10.4.166:5325');

  $scope.messages = [];
  $scope.message = '';
  $scope.username = '';
  $scope.userCount = 0;

  var chatbox = angular.element(document.getElementById('chatbox'));  

  $scope.sendMessage = function(){

    if ($scope.message === '') return;

    var message = {
      username: $scope.username || 'anonymus',
      content: $scope.message
    }

    addMessageToChatbox(message);
    socket.emit('chatMessage', message);

    $scope.message = '';
  }

  socket.emit('getHistory');

  socket.on('history', function(messages){
    $scope.messages = messages;
    $scope.$apply();
  })

  socket.on('chatMessage', function(message){
    addMessageToChatbox(message);
  })

  socket.on('userCount', function(count){
    $scope.userCount = count;
    $scope.$apply()
  })

  function addMessageToChatbox(message) {
    $scope.messages.push(message);
  }

  $scope.$watch('messages.length', function(newVal, oldVal){
    $timeout(function(){
      chatbox[0].scrollTop = chatbox[0].scrollHeight;
    }, 0);
  })

}