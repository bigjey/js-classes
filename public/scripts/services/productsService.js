angular.module('myApp')

.service('productsService', ['$http', productsService])

function productsService($http){



  var _storageKey = 'products';

  var _products = JSON.parse(localStorage.getItem(_storageKey)) || [];

  function getProducts(){
    return $http.get('/api/products');
  }

  function addProduct(data){
    _products.push(data);
    _save();
  }

  function removeProduct(id){
    if (_products.length > 0){
      _products = _products.filter(function(p){
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