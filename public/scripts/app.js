var myApp = angular.module('myApp', ['ngRoute', 'ngTagsInput']);

myApp.config(['$routeProvider', function($routeProvider){
  $routeProvider
    .when('/list', {
      templateUrl: '/templates/list.html',
      controller: 'listCtrl'
    })
    .when('/item/:id', {
      templateUrl: '/templates/item.html',
      controller: 'itemCtrl'
    })
    .when('/create', {
      templateUrl: '/templates/create.html',
      controller: 'createCtrl'
    })
    .otherwise({
      redirectTo: '/list'
    })
}]);
