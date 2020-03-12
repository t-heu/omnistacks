const express = require('express')
const multer = require('multer')
const routes = express.Router()
const uploadConfig = require('./config/upload')
const upload = multer(uploadConfig)
const PostController = require('./controllers/PostController')
const LikeController = require('./controllers/LikeController')

routes.get('/posts', PostController.index)
routes.post('/posts', upload.single('image'), PostController.store)

routes.put('/posts/:id/likes', LikeController.store)

module.exports = routes
