const router = require('express').Router()
const products = require('../controllers/backend')

router.route('/products')
  .get(products.get)
  .post(products.create)

module.exports = router