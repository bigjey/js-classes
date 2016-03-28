angular.module('myApp')

.controller('itemCtrl', ['$scope', '$routeParams', itemCtrl]);
function itemCtrl($scope, $routeParams) {
  $scope.id = $routeParams.id;
}
