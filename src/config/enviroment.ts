import 'dotenv/config'

class Enviroment {
  PORT: string

  SECRET_KEY_JWT: string

  PATH_FILE: string

  constructor() {
    this.PORT = process.env.PORT!
    this.SECRET_KEY_JWT = process.env.SECRET_KEY_JTW!
    this.PATH_FILE = process.env.PATH_FILE!
  }
}

export default new Enviroment()
