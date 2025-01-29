import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import errorHandler from './middlewares/error-middleware'
import enviroment from './config/enviroment'
import route from './routes'

const port = enviroment.PORT || 3001
const app = express()

app.use(
  cors({
    origin: '*',
  }),
)
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
)
app.use(bodyParser.json())

app.use(route)

app.use(errorHandler)

app.listen(port, async () => {
  console.log(`Serviço em execução: http://localhost:${port}`)
})
