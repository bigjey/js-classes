angular.module('myApp')

.controller('listCtrl', ['$scope', '$http', 'phonesService', listCtrl]);
function listCtrl($scope, $http, phonesService) {

  $scope.phones = phonesService.getPhones();

  $scope.orderProp = 'name';
  $scope.orderReversed = false;

  $scope.removePhone = function(id){
    $scope.phones = phonesService.removePhone(id);
  }

  $scope.setOrderProp = function(newProp){
    if ($scope.orderProp === newProp) {
      $scope.orderReversed = !$scope.orderReversed;
    } else {
      $scope.orderProp = newProp;
      $scope.orderReversed = false;
    }
    
  }

}
