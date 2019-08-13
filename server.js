const express = require('express')
const userRouter = require('./users/userRouter')
const server = express()
const bodyParser = express.json()

// built in middleware
server.use(bodyParser)

// custom middleware
server.use(logger)

// router
server.use('/api/users/', userRouter)

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
})

//custom middleware
function logger(req, res, next) {
  console.log(
    `Request to URL: '${req.url}' | Method: ${
      req.method
    } | Time: ${new Date().toLocaleTimeString()}`
  )
  next()
}

module.exports = server
