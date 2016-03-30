angular.module('myApp')

.directive('orderarrow', function(){
  return {
    restrict: 'E',
    templateUrl: '/templates/orderArrowDirective.html',
    replace: true,
    scope: {
      direction: '@'
    }
  }
})