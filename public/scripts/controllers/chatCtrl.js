angular.module('myApp')

.controller('chatCtrl', ['$scope', function($scope) {

  var username = JSON.parse(window.localStorage.getItem('username')) || 'anonymous';
  $scope.username = username;
  
  var socket = io.connect('http://10.10.4.166:5325');

  socket.emit('username', {
    name: username
  });

  $scope.messages = [];

  $scope.changeLogin = function() {
    window.localStorage.setItem('username', JSON.stringify($scope.username));

    socket.emit('username', {
      name: $scope.username
    });

  }

  $scope.send = function() {
    if($scope.message === "") return;

    var message = {
      text: $scope.message
    }

    $scope.messages.push({
      username: 'me',
      text: $scope.message
    });

    socket.emit('chatMessage', message);
    
    $scope.message = "";
  }

  socket.on('history', function(data) {
    $scope.messages = data.messages;
  });

  socket.on('User Count', function(uc) {
    $scope.userCount = uc;
    $scope.$apply();
  });

  socket.on('serverChatMessage', function(data) {
    $scope.messages.push(data);
    $scope.$apply();
  });
}])

