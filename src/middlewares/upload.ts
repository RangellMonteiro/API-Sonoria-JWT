/* eslint-disable consistent-return */
import multer, { FileFilterCallback } from 'multer'
import { Request } from 'express'
import path from 'path'
import enviroment from '../config/enviroment'

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, enviroment.PATH_FILE)
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`
    cb(null, `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`)
  },
})

const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
  const allowedTypes = /csv|pdf|xlsx/
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase())
  const mimetype = allowedTypes.test(file.mimetype)

  if (extname && mimetype) {
    return cb(null, true)
  }
  cb(new Error('Arquivo inválido, aceitamos apenas arquivos CSV, PDF e XLSX'))
}

const limits = {
  fileSize: 1024 * 1024 * 2, // 2MB
}

const upload = multer({
  storage,
  fileFilter,
  limits,
})

export default upload
