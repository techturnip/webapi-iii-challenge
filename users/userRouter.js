const express = require('express')

const router = express.Router()

const Users = require('./userDb')

// USER ROUTES ------------------------------------|
// ------------------------------------------------|
// POST
router.post('/', validateUser, async (req, res) => {
  try {
    const postedUser = await Users.insert(req.body)

    res.json(postedUser)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Unable to add user to database' })
  }
})

// POST
router.post('/:id/posts', (req, res) => {})

// GET - '/api/users' - Returns all users
router.get('/', async (req, res) => {
  try {
    const users = await Users.get()
    res.status(200).json(users)
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'unknown error'
    })
  }
})

// GET - '/api/users/:id' - Uses the validateUserId()
// middleware which stores the user in req.user
router.get('/:id', validateUserId, async (req, res) => {
  res.status(200).json(req.user)
})

// GET - '/api/users/:id/posts' - Returns specified
// user's posts
router.get('/:id/posts', (req, res) => {})

// DELETE - '/api/users/:id' - Deletes specified user
router.delete('/:id', (req, res) => {})

// PUT - '/api/users/:id' - Updates specified user
router.put('/:id', (req, res) => {})

//custom middleware
function validateUserId(req, res, next) {
  const { id } = req.params

  Users.getById(id)
    .then(user => {
      if (user) {
        req.user = user
        next()
      } else {
        res.status(404).json({ message: 'Invalid user id' })
      }
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({
        message: 'Error processing request'
      })
    })
}

function validateUser(req, res, next) {
  if (req.body && Object.keys(req.body).length > 0) {
    const { name } = req.body

    if (name) {
      if (name.length > 2 && typeof name === 'string') {
        next()
      } else {
        res.status(400).json({
          message: 'Name field must be a string and cannot be empty'
        })
      }
    } else {
      res.status(400).json({
        message: 'Missing required name field'
      })
    }
  } else {
    res.status(400).json({
      message: 'Missing user data'
    })
  }
}

function validatePost(req, res, next) {}

module.exports = router
