const Product = require('../models/Product') // we need the Animal models, attached to this are all the mongoose methods to query or create things in our DB. eg Animal.find(), Animal.create()

// index route - /animals
function get(req, res) {
  Product.find() // finds all the animals
    .then(product => res.status(200).json(product)) // if found, sends back the animals in an JSON array
    .catch(() => res.status(404).json({ message: 'Not Found' })) // if any error, sends back 404 not found message
}

// create route - /animals
function create(req, res, next) {
  Product.create(req.body) // creates a new animal based on the JSON object sent as the body of the request
    .then(product => res.status(201).json(product)) // if it succesfully creates, sends back that new animal
    .catch(next) // otherwise we send the errors 
}

module.exports = {
  get,
  create
} 