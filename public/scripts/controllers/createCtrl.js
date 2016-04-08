angular.module('myApp')

.controller('createCtrl', ['$scope', 'productsService', 'notificationService', createCtrl]);
function createCtrl($scope, productsService, notificationService) {

  $scope.notificationsGroup = 'create';

  $scope.formData = {};

  $scope.handleSubmit = function(){

    if ($scope.addForm.$valid){

      var product = _serializeForm();

      productsService.addProduct(product, true);

      notificationService.createNotification({
        group: $scope.notificationsGroup,
        type: 'success',
        text: 'Товар "' + $scope.formData.name + '" добавлен', 
        autoHide: true
      });

      $scope.formData = {};
      $scope.addForm.$setPristine();

    } else {

      notificationService.createNotification({
        group: $scope.notificationsGroup,
        type: 'danger',
        text: 'В форме есть ошибки', 
        autoHide: true
      });

    }
  }

  function _serializeForm(){
    return {
      id: Date.now(),
      name: $scope.formData.name,
      snippet: $scope.formData.snippet,
      tags: $scope.formData.tags && $scope.formData.tags.map(function(tag){
        return tag.text
      }),
      price: $scope.formData.price
    }
  }

}
