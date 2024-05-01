import { StatusCodes, ReasonPhrases } from "http-status-codes"

export class ErrorResponse extends Error {
  status: StatusCodes
  constructor(message: string, status: StatusCodes) {
    super(message)
    this.status = status
  }
}

export class ConflictRequestError extends ErrorResponse {
  constructor(message: string = ReasonPhrases.CONFLICT, statusCode = StatusCodes.CONFLICT) {
    super(message, statusCode)
  }
}

export class BadRequestError extends ErrorResponse {
  constructor(message: string = ReasonPhrases.FORBIDDEN, statusCode = StatusCodes.FORBIDDEN) {
    super(message, statusCode)
  }
}

export class AuthFailureError extends ErrorResponse {
  constructor(message: string = ReasonPhrases.UNAUTHORIZED, statusCode = StatusCodes.UNAUTHORIZED) {
    super(message, statusCode)
  }
}

export class NotFoundError extends ErrorResponse {
  constructor(message: string = ReasonPhrases.NOT_FOUND, statusCode = StatusCodes.NOT_FOUND) {
    super(message, statusCode)
  }
}

export class ForbiddenError extends ErrorResponse {
  constructor(message: string = ReasonPhrases.FORBIDDEN, statusCode = StatusCodes.FORBIDDEN) {
    super(message, statusCode)
  }
}

export class UnprocessableEntityError extends ErrorResponse {
  constructor(
    message: string = ReasonPhrases.UNPROCESSABLE_ENTITY,
    statusCode = StatusCodes.UNPROCESSABLE_ENTITY
  ) {
    super(message, statusCode)
  }
}
