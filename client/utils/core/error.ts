type CustomErrorType<T = Error> = {
  statusCode: number
  statusMessage: string
  error: T
}

type TError = Pick<CustomErrorType, "error"> | any

class CustomError {
  statusCode: number
  statusMessage: string
  error: TError

  constructor(error: TError) {
    this.statusCode = 404
    this.statusMessage = "Something went wrong!!!"
    this.error = error
  }
}

export default CustomError
