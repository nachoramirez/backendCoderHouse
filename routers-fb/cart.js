const express = require('express')
const { Router } = express
const firebaseContainer = require('../daos/firebase/cartDaos')

const router = Router(Router)
const firebase = new firebaseContainer()


router.get('/', async (req, res) => {
  const allcart = await firebase.getAll()
  res.send(allcart)
})

router.get('/:id/products', async (req, res, next) => {

  const id = req.params.id
  try {
    const allcart = await firebase.getById(id)

    res.send(allcart[0])
  } catch (e) {
    next(e)
  }
})

router.post('/', async (req, res) => {

  const newCart = await firebase.createCart()

  console.log(newCart)
  res.send(newCart)
})

router.post('/:id/products', async (req, res) => {

  const id = req.params.id

  const newProduct = await firebase.saveItem(req.body, id)

  res.sendStatus(204)
})

router.delete('/:id', async (req, res, next) => {

  const id = req.params.id

  try {
    await firebase.deleteById(id)
    res.sendStatus(204)
  } catch (e) {
    next(e)
  }
})

router.delete('/:id/products/:productId', async (req, res, next) => {

  const id = req.params.id
  const productId = req.params.productId

  try {
    await firebase.deleteProductOnCart(id, productId)

    res.sendStatus(204)
  } catch (e) {
    next(e)
  }
})


module.exports = router

