export default class CustomError extends Error {
  constructor (code = '', message, status = 500) {
    super(message)
    this.code = code
    this.status = status
    Error.captureStackTrace(this, this.constructor)
  }
}
