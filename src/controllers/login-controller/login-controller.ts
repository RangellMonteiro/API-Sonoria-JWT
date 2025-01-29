import { Request, Response, NextFunction } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client'
import AppError from '../../error/app-error'

const prisma = new PrismaClient()

export class LoginController {
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { cpf, senha } = req.body

      const usuario = await prisma.usuario.findUnique({
        where: { cpf },
      })

      if (!usuario) {
        throw new AppError('Usuário não encontrado', 404)
      }

      // Verificar se a senha corresponde
      const isPasswordValid = await bcrypt.compare(senha, usuario.senha)
      if (!isPasswordValid) {
        throw new AppError('Senha inválida', 401)
      }

      // Gerar o JWT
      const token = this.generateToken(usuario.id, usuario.cpf)

      res.status(200).json({
        usuario: {
          id: usuario.id,
          cpf: usuario.cpf,
          nome: usuario.nome,
          email: usuario.email,
        },
        token,
      })
    } catch (error) {
      next(error)
    }
  }

  private generateToken(id: string, cpf: string): string {
    return jwt.sign({ id, cpf }, process.env.SECRET_KEY_JWT!, {
      expiresIn: '8h', // O token expira em 8 horas
    })
  }
}
