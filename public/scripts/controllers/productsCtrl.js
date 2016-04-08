angular.module('myApp')

.controller('productsCtrl', ['$scope', '$http', 'productsService', productsCtrl]);
function productsCtrl($scope, $http, productsService) {

  $scope.loading = true;

  productsService.getProducts().then(function(res) {
    $scope.products = res.data;
    $scope.loading = false;
  });

  $scope.orderProp = '';
  $scope.orderReversed = true;

  $scope.handleRemoveClick = function(id){
    $scope.products = productsService.removeProduct(id);
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
