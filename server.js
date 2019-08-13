const express = require('express')

const server = express()

server.use(logger)

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
