const express = require('express')
const routes = express.Router()


const ProductController = require('./controllers/ProductController')
const UserController = require('./controllers/UserController')

routes.get('/products', ProductController.index)
routes.get('/products/:id', ProductController.show)
routes.put('/products/:id', ProductController.update)
routes.delete('/products/:id', ProductController.destroy)
routes.post('/products', ProductController.store)

routes.get('/allusers', UserController.get)
routes.get('/users', UserController.index)
routes.post('/users', UserController.store)
routes.get('/userss', UserController.set)

module.exports = routes