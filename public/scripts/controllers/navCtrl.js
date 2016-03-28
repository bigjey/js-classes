angular.module('myApp')

.controller('navCtrl', ['$scope', '$location', navCtrl])
function navCtrl($scope, $location) {
  $scope.isActive = function(url){
    return url === location.hash.slice(1);
  }
}