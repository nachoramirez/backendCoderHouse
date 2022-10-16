const express = require('express')
const { Router } = express

const router = Router(Router)

let admin = {
  status: false,
}

router.put('/', (req, res, next) => {
  const status = req.body
  admin = {
    ...admin,
    status: status,
  }
  res.sendStatus(200)
})

router.get('/', (req, res, next) => {
  const response = {
    ...JSON.parse(admin),
  }
  res.send(response)
})

module.exports = router
