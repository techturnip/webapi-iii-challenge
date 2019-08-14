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
// ------------------------------------------------|
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
// ------------------------------------------------|
router.delete('/:id', validatePostId, async (req, res) => {
  try {
    const deletePost = await Posts.remove(req.params.id)

    res.status(200).json(req.post)
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'Could not remove specified post from the database'
    })
  }
})
// ------------------------------------------------|
router.put('/:id', validatePostId, validatePost, async (req, res) => {
  try {
    const updatedPost = await Posts.update(req.post.id, req.body)

    res.status(200).json(req.post)
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'Could not update the specified post'
    })
  }
})

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
// ------------------------------------------------|
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
