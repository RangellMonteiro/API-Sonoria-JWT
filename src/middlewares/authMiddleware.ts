import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import AppError from '../error/app-error'

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1] // "Bearer <token>"

  if (!token) {
    return next(new AppError('Token não fornecido', 401))
  }

  jwt.verify(token, process.env.SECRET_KEY_JWT!, (err, decoded) => {
    if (err) {
      return next(new AppError('Token inválido', 401))
    }

    req.user = decoded // Adiciona a informação do usuário no request
    next()
  })
}
