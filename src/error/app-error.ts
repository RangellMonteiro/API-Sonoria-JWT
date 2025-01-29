import { ErrorCustom } from './error-custom'

export default function AppError(message: string, code = 400) {
  throw new ErrorCustom(message, code)
}
