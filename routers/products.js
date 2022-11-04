const express = require('express')
const { Router } = express
const productsMongo = require('../daos/mongo/productsDaos')

const router = Router(Router)

const mongo = new productsMongo()
mongo.connect()

router.get('/', async (req, res) => {
  const allProducts = await mongo.getAll()
  res.send(allProducts)
})

router.get('/:id', async (req, res, next) => {
  const id = req.params.id
  try {
    const allProducts = await mongo.getById(id)
    res.send(allProducts)
  } catch (e) {
    next(e)
  }
})

router.post('/', async (req, res) => {
  const admin = req.query.admin
  if (admin === 'true') {
    const newProduct = await mongo.save(req.body)
    res.sendStatus(201)
  } else {
    res.sendStatus(401)
  }
})

router.put('/:id', async (req, res) => {
  const id = req.params.id
  const admin = req.query.admin
  if (admin === 'true') {
    const newProduct = await mongo.reWrite(id, req.body)
    res.sendStatus(204)
  } else {
    res.sendStatus(401)
  }
})

router.delete('/:id', async (req, res, next) => {
  const id = req.params.id
  const admin = req.query.admin
  if (admin === 'true') {
    try {
      await mongo.deleteById(id)
      res.sendStatus(204)
    } catch (e) {
      next(e)
    }
  } else {
    res.sendStatus(401)
  }
})

module.exports = router
