angular.module('myApp')

.service('productsService', ['$http', productsService])

function productsService($http){

  function getProducts(){
    return $http.get('/api/products');
  }

  function addProduct(data){
    $http.post('/api/products', data);
  }

  function getOneProduct(id){
    return $http.get('/api/products/' + id);
  }

  function updateProduct(id, data) {
    return $http.put('/api/products/' + id, data);
  }

  function removeProduct(id){
    return $http.delete('/api/products/' + id);    
  }

  return {
    getProducts: getProducts,
    removeProduct: removeProduct,
    addProduct: addProduct,
    getOneProduct: getOneProduct,
    updateProduct: updateProduct
  };

}