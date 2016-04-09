angular.module('myApp')

.controller('formCtrl', ['$scope', '$route', '$routeParams', 'productsService', 'notificationService', formCtrl]);
function formCtrl($scope, $route, $routeParams, productsService, notificationService) {
  
  $scope.isNew = $route.current.$$route.isNewModel;

  $scope.notificationsGroup = 'create';
  $scope.formData = {};
  $scope.loading = false;

  if (!$scope.isNew){
    $scope.loading = true;
    productsService.getOneProduct($routeParams.id)
      .then(function(res) {
        $scope.formData = res.data;
        $scope.loading = false;
      })
  }

  $scope.handleSubmit = function(){

    if ($scope.addForm.$valid){

      if ($scope.isNew){

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

        productsService.updateProduct($routeParams.id, _serializeForm());
        
        notificationService.createNotification({
          group: $scope.notificationsGroup,
          type: 'info',
          text: 'Данные обновлены', 
          autoHide: true
        });

      }

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
      name: $scope.formData.name,
      snippet: $scope.formData.snippet,
      tags: $scope.formData.tags && $scope.formData.tags.map(function(tag){
        return tag.text
      }),
      price: $scope.formData.price
    }
  }

}
