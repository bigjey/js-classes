angular.module('myApp')

.controller('productItemCtrl', ['$scope', '$routeParams', '$http', productItemCtrl]);
function productItemCtrl($scope, $routeParams, $http) {
  
  $scope.loading = true;

  $http.get('/api/products/' + $routeParams.id)
    .then(function(res) {
      $scope.productData = res.data;      
      $scope.loading = false;
    });

  
}
