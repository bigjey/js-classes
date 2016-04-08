angular.module('myApp')

.service('productsService', ['socketsService', 'notificationService', productsService])

function productsService(socketsService, notificationService){

  var _storageKey = 'products';

  var _products = JSON.parse(localStorage.getItem(_storageKey)) || [];

  socketsService.on('newProduct', function(product) {
    addProduct(product, false)

    notificationService.createNotification({
      group: 'list',
      type: 'info',
      text: 'Ктото добавил товар',
      autoHide: true
    })
  })

  socketsService.on('productDelete', function(id){
    removeProduct(id, false);
  })

  function getProducts(){
    return _products;
  }

  function addProduct(data, doEmit){
    _products.push(data);
    _save();

    if (doEmit){
      socketsService.emit('newProduct', data);
    }
  }

  function removeProduct(id, doEmit){
    if (_products.length > 0){
      _products = _products.filter(function(p){
        if (p.id === id && doEmit){
          socketsService.emit('productDelete', id);
        }
        return p.id !== id;
      })
    }
    _save();
    return _products;
  }

  function _save(){
    localStorage.setItem(_storageKey, JSON.stringify(_products));
  }

  return {
    getProducts: getProducts,
    removeProduct: removeProduct,
    addProduct: addProduct
  };

}