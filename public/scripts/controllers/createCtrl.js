angular.module('myApp')

.controller('createCtrl', ['$scope', '$timeout', 'phonesService', createCtrl]);
function createCtrl($scope, $timeout, phonesService) {

  $scope.alerts = [];

  $scope.addPhone = function(){
    if ($scope.addForm.$valid){
      phonesService.addPhone(_serializeForm());      
      _createAlert('success', 'Товар "' + $scope.name + '" добавлен', true);
    } else {
      _createAlert('danger', 'В форме есть ошибки', true);
    }
  }

  $scope.removeAlert = function(id){
    $scope.alerts = $scope.alerts.filter(function(a){
      return a.id !== id
    })
  }

  function _serializeForm(){
    return {
      id: $scope.id,
      name: $scope.name,
      snippet: $scope.snippet,
      price: $scope.price
    }
  }

  function _createAlert(type, message, autoHide){
    var id = Date.now();
    $scope.alerts.push({
      id: id,
      type: type,
      text: message
    })
    if (autoHide){
      $timeout(function(){
        $scope.alerts = $scope.alerts.filter(function(a){
          return a.id !== id
        })
      }, 3000);
    }
    
  }

}
