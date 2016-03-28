angular.module('myApp')

.controller('createCtrl', ['$scope', '$log', '$route', '$routeParams', createCtrl]);
function createCtrl($scope, $log, $route, $routeParams) {
  $scope.test = 123;
}
