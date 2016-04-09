var mongoose = require('mongoose');

var productSchema = new mongoose.Schema({
  name: {type: String, required: true},
  snippet: {type: String},
  price: {type: Number, default: 0},
  tags: [{type: String}]
});

var ProductModel = mongoose.model('Product', productSchema);

module.exports = ProductModel;