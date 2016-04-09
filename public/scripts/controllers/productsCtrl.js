angular.module('myApp')

.controller('productsCtrl', ['$scope', '$http', 'productsService', productsCtrl]);
function productsCtrl($scope, $http, productsService) {

  $scope.orderProp = '';
  $scope.orderReversed = true;
  $scope.loading = true;

  productsService.getProducts().then(function(res) {
    $scope.products = res.data;
    $scope.loading = false;
  });

  $scope.handleRemoveClick = function(id){
    productsService.removeProduct(id).then(function(res) {
      if(res.status === 200) {
        $scope.products = $scope.products.filter(function(item) {
          return item._id !== id;
        })
      }
    });;

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
