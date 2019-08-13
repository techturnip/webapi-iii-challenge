const express = require('express')

const router = express.Router()

const Users = require('./userDb')

router.post('/', (req, res) => {})

router.post('/:id/posts', (req, res) => {})

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

router.get('/:id', validateUserId, async (req, res) => {
  res.status(200).json(req.user)
})

router.get('/:id/posts', (req, res) => {})

router.delete('/:id', (req, res) => {})

router.put('/:id', (req, res) => {})

//custom middleware

async function validateUserId(req, res, next) {
  const { id } = req.params

  try {
    const user = await Users.getById(id)

    if (user) {
      req.user = user
      next()
    } else {
      res.status(404).json({ message: 'No user with given id' })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'Error processing request'
    })
  }
}

function validateUser(req, res, next) {}

function validatePost(req, res, next) {}

module.exports = router
