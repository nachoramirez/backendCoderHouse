const express = require('express')
const { Router } = express

const MongoContainer = require('../daos/mongo/cartDaos')

const router = Router(Router)
const mongo = new MongoContainer()
mongo.connect()

router.get('/', async (req, res) => {
  const allcart = await mongo.getAll()
  res.send(allcart)
})

router.get('/:id/products', async (req, res, next) => {

  const id = req.params.id
  try {
    const allcart = await mongo.getById(id)

    res.send(allcart[0])
  } catch (e) {
    next(e)
  }
})

router.post('/', async (req, res) => {

  const newCart = await mongo.createCart()

  console.log(newCart)
  res.send(newCart)
})

router.post('/:id/products', async (req, res) => {

  const id = req.params.id

  const newProduct = await mongo.saveItem(req.body, id)

  res.sendStatus(204)
})

router.delete('/:id', async (req, res, next) => {

  const id = req.params.id

  try {
    await mongo.deleteById(id)
    res.sendStatus(204)
  } catch (e) {
    next(e)
  }
})

router.delete('/:id/products/:productId', async (req, res, next) => {

  const id = req.params.id
  const productId = req.params.productId

  try {
    await mongo.deleteProductOnCart(id, productId)

    res.sendStatus(204)
  } catch (e) {
    next(e)
  }
})


module.exports = router

