const { Router } = require('express')
const routes = Router()

const DevController = require('./app/controller/DevController')
const SearchController = require('./app/controller/SearchController')

routes.get('/dev/:github_username', DevController.show)

routes.get('/devs', DevController.index)
routes.post('/devs', DevController.store)
routes.put('/devs/:id', DevController.update)
routes.delete('/devs/:id', DevController.destroy)

routes.get('/search', SearchController.index)

module.exports = routes
