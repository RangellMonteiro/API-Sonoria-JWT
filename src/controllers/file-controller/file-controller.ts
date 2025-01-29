import { NextFunction, Request, Response } from 'express'
import AppError from '../../error/app-error'

export class FileController {
  async upload(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.files) {
        AppError('Arquivo não foi enviado.')
      }
      console.log(req.files)

      res.status(200).json('Arquivo salvo com sucesso!')
    } catch (error) {
      next(error)
    }
  }
}
