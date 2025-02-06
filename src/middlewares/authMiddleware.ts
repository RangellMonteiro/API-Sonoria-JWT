import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import AppError from '../error/app-error'

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization

  // Verifica se o cabeçalho Authorization está no formato correto
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(new AppError('Formato de token inválido', 401));
  }

  // Extrai o token
  const token = authHeader.split(' ')[1];

  // Verifica se a chave secreta está configurada
  if (!process.env.SECRET_KEY_JWT) {
    return next(new AppError('Chave secreta JWT não configurada', 500));
  }

  // Verifica o token
  jwt.verify(token, process.env.SECRET_KEY_JWT, (err, decoded) => {
    if (err) {
      return next(new AppError('Token inválido ou expirado', 401));
    }

    // Adiciona as informações do usuário ao request
    req.user = decoded
    next()
  })
}
