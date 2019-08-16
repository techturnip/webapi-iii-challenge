// SERVER SETUP ===================================|
// ================================================|

// IMPORTS/INITIALIZATION =========================|
// ================================================|
// import express ---------------------------------|
const express = require('express')
// import routers ---------------------------------|
const userRouter = require('./users/userRouter')
const postRouter = require('./posts/postRouter')
// hookup server to express -----------------------|
const server = express()
// intialize the body parser module ---------------|
const bodyParser = express.json()
// ------------------------------------------------|
// BRING IN MIDDLEWARE ============================|
// ================================================|
// bring in body parser module as middleware ------|
server.use(bodyParser)
// bring in custom middleware - defined below -----|
server.use(logger)
// setup router endpoints -------------------------|
server.use('/api/users/', userRouter)
server.use('/api/posts/', postRouter)
// ------------------------------------------------|
// DEFINE ROOT ROUTE ==============================|
// ================================================|
server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
})
// ------------------------------------------------|
// DEFINE CUSTOM MIDDLEWARE =======================|
// ================================================|
function logger(req, res, next) {
  console.log(
    `Request to URL: '${req.url}' | Method: ${
      req.method
    } | Time: ${new Date().toLocaleTimeString()}`
  )
  next()
}
// ------------------------------------------------|
// EXPORT SERVER ==================================|
// ================================================|
module.exports = server
