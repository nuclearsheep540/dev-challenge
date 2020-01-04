const Product = require('../models/Product') 

// required for front end to fetch data
function get(req, res) {
  Product.find() 
    .then(product => res.status(200).json(product)) 
    .catch(() => res.status(404).json({ message: 'Not Found' })) 
}

// required for seeds to create
function create(req, res, next) {
  Product.create(req.body) 
    .then(product => res.status(201).json(product))
    .catch(next) 
}

module.exports = {
  get,
  create
} 