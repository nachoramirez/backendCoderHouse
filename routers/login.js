const express = require('express')
const { Router } = express

const router = Router(Router)

router.get('/', async (req, res) => {
  const { user } = req.query
  if (true) {
    req.session.user = user
    req.session.admin = true
    res.send(200)
    console.log(req.session)
  } else {
    res.send(401)
  }
})

router.delete('/', async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.json({ status: 'logout error', body: err })
    }
    res.send(200)
  })
})

module.exports = router
