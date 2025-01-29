import { Request, Response, NextFunction } from 'express'
import { ErrorCustom } from '../error/error-custom'

export default function errorHandler(error: unknown, _res: Request, res: Response, _next: NextFunction) {
  console.error(error)
  if (error instanceof ErrorCustom) {
    res.status(error.code).json({ message: error.message })
  } else {
    res.status(500).json({ message: 'Error interno no servidor.' })
  }
}
