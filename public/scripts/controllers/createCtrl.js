angular.module('myApp')

.controller('createCtrl', ['$scope', 'productsService', 'notificationService', createCtrl]);
function createCtrl($scope, productsService, notificationService) {

  $scope.notificationsGroup = 'create';

  $scope.formData = {};

  $scope.handleSubmit = function(){

    if ($scope.addForm.$valid){

      productsService.addProduct(_serializeForm());

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
      id: $scope.formData.id,
      name: $scope.formData.name,
      snippet: $scope.formData.snippet,
      tags: $scope.formData.tags && $scope.formData.tags.map(function(tag){
        return tag.text
      }),
      price: $scope.formData.price
    }
  }

}
