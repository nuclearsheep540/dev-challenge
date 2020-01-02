function logger(req, res, next) {
  // this log will appear in console on requests
  console.log(`${req.method} to ${req.url}`) 
  next()
}

module.exports = logger