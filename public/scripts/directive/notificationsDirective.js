angular.module('myApp')
.directive('notifications', ['notificationService', notificationsDirective])

function notificationsDirective(notificationService){
  
  return {
    restrict: 'E',
    templateUrl: '/templates/notificationsDirective.html',
    scope: {
      group: '@'
    },
    link: function(scope){
      scope.notifications = notificationService.getNotifications.bind(null, scope.group);
      scope.removeNotification = notificationService.destroyNotification;
    }
  }
}