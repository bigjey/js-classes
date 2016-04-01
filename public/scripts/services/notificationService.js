angular.module('myApp')

.service('notificationService', ['$timeout', notificationService])

function notificationService($timeout){

  var _notifications = [];

  function getNotifications(group){
    if (typeof group !== 'undefined'){
      return _notifications.filter(function(n){
        return n.group === group;
      })
    }

    return _notifications;
  }

  function createNotification(params){

    var exist = false;
    _notifications.forEach(function(item){
      if (item.text === params.text) exist = true;
    })

    if (exist) return;


    var id = Date.now();

    _notifications.push({
      id: id,
      group: params.group,
      type: params.type,
      text: params.text
    })

    if (params.autoHide){
      $timeout(function(){
        destroyNotification(id);
      }, 3000);
    }

  }

  function destroyNotification(id){
    _notifications = _notifications.filter(function(n) {
      return n.id !== id;
    });
  }

  return {
    getNotifications: getNotifications,
    createNotification: createNotification,
    destroyNotification: destroyNotification
  };

}