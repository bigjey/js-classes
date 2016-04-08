angular.module('myApp')

.controller('productsCtrl', ['$scope', '$http', 'productsService', 'socketsService', productsCtrl]);
function productsCtrl($scope, $http, productsService, socketsService) {

  $scope.products = productsService.getProducts();

  $scope.orderProp = '';
  $scope.orderReversed = true;

  $scope.handleRemoveClick = function(id){
    $scope.products = productsService.removeProduct(id, true);
  }

  $scope.setOrderProp = function(newProp){
    if ($scope.orderProp === newProp) {
      $scope.orderReversed = !$scope.orderReversed;
    } else {
      $scope.orderProp = newProp;
      $scope.orderReversed = false;
    }
    
  }

  socketsService.on('newProduct', function(){
    $scope.$apply();
  })

  socketsService.on('productDelete', function(){
    $scope.products = productsService.getProducts();
    $scope.$apply();
  })

}
