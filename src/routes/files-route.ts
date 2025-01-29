import express from 'express'
import { FileController } from '../controllers/file-controller/file-controller'
import upload from '../middlewares/upload'

const routesFiles = express.Router()

const fileController = new FileController()
routesFiles.post('/upload', upload.fields([{ name: 'exame', maxCount: 1 }]), fileController.upload)

export default routesFiles
