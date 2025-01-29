import express from 'express'
import routeUsuario from './usuario-route'
import routesFiles from './files-route'

const route = express.Router()

route.use('/usuario', routeUsuario)
route.use('/files', routesFiles)

export default route
