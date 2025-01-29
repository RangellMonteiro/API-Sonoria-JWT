export class ErrorCustom extends Error {
  constructor(
    public message: string,
    public code = 400,
  ) {
    super(message)
  }
}
