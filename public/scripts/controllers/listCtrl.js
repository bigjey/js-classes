angular.module('myApp')

.controller('listCtrl', ['$scope', '$http', 'phonesService', listCtrl]);
function listCtrl($scope, $http, phonesService) {

  $scope.phones = phonesService.getPhones();

  $scope.removePhone = function(id){
    $scope.phones = phonesService.removePhone(id);
  }

}
