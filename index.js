// bring in our server - exported from server.js
const server = require('./server.js')
// call the listen() method on our server
server.listen(4000, () => {
  console.log('\n* Server Running on http://localhost:4000 *\n')
})
