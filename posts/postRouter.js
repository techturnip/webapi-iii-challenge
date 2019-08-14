const express = require('express')

const router = express.Router()

const Posts = require('./postDb')

// REQ HANDLERS -----------------------------------|
// ------------------------------------------------|

router.get('/', async (req, res) => {
  try {
    const posts = await Posts.get()

    res.status(200).json(posts)
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'Could not retrieve posts from database'
    })
  }
})

router.get('/:id', validatePostId, async (req, res) => {
  try {
    const post = await Posts.getById(req.params.id)

    res.status(200).json(post)
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'Could not retrieve specified post from the database'
    })
  }
})

router.delete('/:id', validatePostId, (req, res) => {})

router.put('/:id', validatePostId, (req, res) => {})

// CUSTOM MIDDLEWARE ------------------------------|
// ------------------------------------------------|
function validatePostId(req, res, next) {
  const { id } = req.params

  Posts.getById(id)
    .then(post => {
      if (post) {
        req.post = post
        next()
      } else {
        res.status(404).json({
          message: 'Invalid post id'
        })
      }
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({
        message: 'Error processing request'
      })
    })
}

module.exports = router
