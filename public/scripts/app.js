var myApp = angular.module('myApp', ['ngRoute', 'ngTagsInput']);

myApp.config(['$routeProvider', function($routeProvider){
  $routeProvider
    .when('/products', {
      templateUrl: '/templates/products.html',
      controller: 'productsCtrl'
    })
    .when('/product/:id', {
      templateUrl: '/templates/product.html',
      controller: 'productItemCtrl'
    })
    .when('/form/:id', {
      templateUrl: '/templates/form.html',
      controller: 'formCtrl',
      isNewModel: false
    })
    .when('/form', {
      templateUrl: '/templates/form.html',
      controller: 'formCtrl',
      isNewModel: true
    })
    .otherwise({
      redirectTo: '/products'
    })
}]);
