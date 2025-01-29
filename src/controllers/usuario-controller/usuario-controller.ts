import { Request, Response, NextFunction } from 'express'
import bcrypt from 'bcrypt'
import { CriarUsuario } from '../../useCases/usuario/criar-usuario'
import { UsuarioCreateInput } from '../../types/usuario'

export class UsuarioController {
  async create(req: Request<null, UsuarioCreateInput>, res: Response, next: NextFunction) {
    try {
      const data = req.body
      const criarUsuario = new CriarUsuario()
      await criarUsuario.execute(data)
      res.status(200).json(criarUsuario)
    } catch (error) {
      next(error)
    }
  }
}
