angular.module('myApp')

.controller('productItemCtrl', ['$scope', '$routeParams', productItemCtrl]);
function productItemCtrl($scope, $routeParams) {
  $scope.id = $routeParams.id;
}
