const express = require('express')
const routes = express.Router()


const UserController = require('./controllers/UserController')
const QueueController = require('./controllers/QueueController')

routes.get('/allusers', UserController.get)
routes.get('/users', UserController.index)
routes.post('/users', UserController.store)
routes.get('/set', UserController.set)
routes.get('/getuser', UserController.getUser)

routes.get('/queue', QueueController.get)

module.exports = routes