angular.module('myApp')

.controller('chatCtrl', ['$scope', function($scope) {
  
  var socket = io.connect('http://10.10.4.166:5325');

  $scope.messages = [];

  $scope.send = function() {
    if($scope.message === "") return;

    $scope.messages.push($scope.message);
    socket.emit('chatMessage', $scope.message);
    
    $scope.message = "";
  }

  socket.on('Hello, fuckface', function() {
    console.log('it\'s on!');
  });

  socket.on('User Count', function(uc) {
    console.log(uc);
    $scope.userCount = uc;
    $scope.$apply();
  });

  socket.on('serverChatMessage', function(message) {
    $scope.messages.push(message);
    $scope.$apply();
  });
}])

