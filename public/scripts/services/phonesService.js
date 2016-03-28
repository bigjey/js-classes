angular.module('myApp')

.service('phonesService', ['$http', phonesService])

function phonesService($http){

  var _phones = [];
  _phones = JSON.parse(localStorage.getItem('phones'));

  function getPhones(){
    return _phones;
  }

  function removePhone(id){
    if (_phones.length > 0){
      _phones = _phones.filter(function(p){
        return p.id !== id;
      })
    }
    _save();
    return _phones;
  }

  function addPhone(data){
    _phones.push(data);
    _save();
  }

  function _save(){
    localStorage.setItem('phones', JSON.stringify(_phones));
  }

  return {
    getPhones: getPhones,
    removePhone: removePhone,
    addPhone: addPhone
  };

}