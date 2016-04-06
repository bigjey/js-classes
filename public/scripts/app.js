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
    .when('/create', {
      templateUrl: '/templates/create.html',
      controller: 'createCtrl'
    })
    .when('/chat', {
      templateUrl: '/templates/chat.html',
      controller: 'chatCtrl'
    })
    .otherwise({
      redirectTo: '/products'
    })
}]);
