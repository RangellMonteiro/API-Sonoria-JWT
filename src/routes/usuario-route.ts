import express from 'express'
import { UsuarioController } from '../controllers/usuario-controller/usuario-controller'
import { authMiddleware } from '../middlewares/authMiddleware'

const routeUsuario = express.Router()
const usuarioController = new UsuarioController()

// Rota para criação do usuário
routeUsuario.post('/', usuarioController.create)

// Rota para login (autenticação)
routeUsuario.post('/login', usuarioController.login)

// Rota protegida para obter informações do usuário autenticado
routeUsuario.get('/perfil', authMiddleware, usuarioController.getProfile)

export default routeUsuario
