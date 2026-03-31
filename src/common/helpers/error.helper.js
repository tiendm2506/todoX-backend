import { responseError } from './response.helper.js'
import jwt from 'jsonwebtoken'

export const handleError = (error, req, res, next) => {
  if (error instanceof jwt.JsonWebTokenError) {
    error.code = 401 // logout user if token is invalid
  }
  if (error instanceof jwt.TokenExpiredError) {
    error.code = 403 // logout user if token is expired
  }
  const resData = responseError(error.message, error.code, error.stack)
  res.status(resData.code).json(resData)
}

export class BadRequestException extends Error {
  constructor(message = 'BadRequestException') {
    super(message)
    this.code = 400
  }
}

export class ForbiddenException extends Error {
  constructor(message = 'ForbiddenException') {
    super(message)
    this.code = 403
  }
}

export class UnauthorizedException extends Error {
  constructor(message = 'Unauthorized') {
    super(message)
    this.code = 401
  }
}