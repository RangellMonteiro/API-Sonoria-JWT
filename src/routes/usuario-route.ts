import express from 'express'
import { UsuarioController } from '../controllers/usuario-controller/usuario-controller'
import { LoginController } from '../controllers/login-controller/login-controller'
import { authMiddleware } from '../middlewares/authMiddleware'

const routeUsuario = express.Router()

const usuarioController = new UsuarioController()
const loginController = new LoginController()

// Rota para criação do usuário
routeUsuario.post('/', usuarioController.create)

// Rota para login (autenticação)
routeUsuario.post('/login', loginController.login)

// Rota protegida (somente usuários autenticados podem acessar)
routeUsuario.get('/me', authMiddleware, (req, res) => {
  res.json(req.user) // Usuário autenticado
})

export default routeUsuario
