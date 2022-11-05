const express = require('express')
const { Router } = express
const productsFirebase = require('../daos/firebase/productsDaos')

const router = Router(Router)

const firebase = new productsFirebase()

router.get('/', async (req, res, next) => {
  try {
    const allProducts = await firebase.getAll()
    res.send(allProducts)
  } catch (e) {
    next(e)
  }
})

router.get('/:id', async (req, res, next) => {
  const id = req.params.id
  try {
    const allProducts = await firebase.getById(id)
    res.send(allProducts)
  } catch (e) {
    next(e)
  }
})

router.post('/', async (req, res, next) => {
  const admin = req.query.admin
  if (admin === 'true') {
    try {
      const newProduct = await firebase.save(req.body)
      res.sendStatus(201)
    } catch (e) {
      next(e)
    }
  } else {
    res.sendStatus(401)
  }
})

router.put('/:id', async (req, res, next) => {
  const id = req.params.id
  const admin = req.query.admin
  if (admin === 'true') {
    try {
      const newProduct = await firebase.reWrite(id, req.body)
      res.sendStatus(204)
    } catch (e) {
      next(e)
    }
  } else {
    res.sendStatus(401)
  }
})

router.delete('/:id', async (req, res, next) => {
  const id = req.params.id
  const admin = req.query.admin
  if (admin === 'true') {
    try {
      await firebase.deleteById(id)
      res.sendStatus(204)
    } catch (e) {
      next(e)
    }
  } else {
    res.sendStatus(401)
  }
})

module.exports = router
