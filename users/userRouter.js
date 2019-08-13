const express = require('express')

const router = express.Router()

const Users = require('./userDb')
const Posts = require('../posts/postDb')

// REQ HANDLERS -----------------------------------|
// ------------------------------------------------|

// POST - '/api/users' - inserts a new user to the
// database and returns the new user object
router.post('/', validateUser, async (req, res) => {
  try {
    const postedUser = await Users.insert(req.body)

    res.json(postedUser)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Unable to add user to database' })
  }
})

// POST - '/api/users' - inserts a new post for
// specified user
router.post('/:id/posts', validateUserId, validatePost, async (req, res) => {
  try {
    if (req.user.id === Number(req.params.id)) {
      req.body.user_id = req.user.id
      console.log(req.body)

      const newPost = await Posts.insert(req.body)

      res.status(200).json(newPost)
    } else {
      res.status(400).json({
        message: 'Error with the user id'
      })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'Could not insert post into database'
    })
  }
})

// GET - '/api/users' - Returns all users
router.get('/', async (req, res) => {
  try {
    const users = await Users.get()
    res.status(200).json(users)
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'Could not get users from database'
    })
  }
})

// GET - '/api/users/:id' - Returns a specified user
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

function validatePost(req, res, next) {
  if (req.body && Object.keys(req.body).length > 0) {
    const { text } = req.body

    if (text) {
      if (text.length > 2 && typeof text === 'string') {
        next()
      } else {
        res
          .status(400)
          .json({ message: 'Text field must be a string and cannot be empty' })
      }
    } else {
      res.status(400).json({ message: 'Missing required text field' })
    }
  } else {
    res.status(400).json({ message: 'Missing post data' })
  }
}

module.exports = router
