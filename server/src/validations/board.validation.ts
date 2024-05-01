import Joi from "joi"
import { RequestHandler } from "express"
import { BOARD_TYPES } from "~/constants"
import { UnprocessableEntityError } from "~/core/error.response"
import { isArrayObjectId, isObjId, isString } from "~/utils/validator"

// z: FYI - if u want to custom/override error message follow links below:
// !: https://stackoverflow.com/questions/48720942/node-js-joi-how-to-display-a-custom-error-messages
// !: https://github.com/hapijs/joi/blob/master/lib/types/string.js#L694

const createNew: RequestHandler = async (req, _, next) => {
  const schema = Joi.object({
    title: isString().min(3).max(50),
    type: Joi.string().valid(BOARD_TYPES.PRIVATE, BOARD_TYPES.PUBLIC).required(),
    description: isString().min(3).max(256)
  })
  try {
    // TODO: abortEarly -> return all errors
    await schema.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error) {
    next(new UnprocessableEntityError(`${error}`))
  }
}

const update: RequestHandler = async (req, _, next) => {
  const schema = Joi.object({
    title: isString(false).min(3).max(50),
    description: isString(false).min(3).max(256),
    type: Joi.string().valid(BOARD_TYPES.PRIVATE, BOARD_TYPES.PUBLIC),
    columnOrderIds: isArrayObjectId()
  })

  try {
    // TODO: abortEarly -> return all errors
    await schema.validateAsync(req.body, { abortEarly: false, allowUnknown: true })
    next()
  } catch (error) {
    next(new UnprocessableEntityError(`${error}`))
  }
}

const moveCardToDiffColumn: RequestHandler = async (req, _, next) => {
  const schema = Joi.object({
    currentCardId: isObjId(),
    nextColumnId: isObjId(),
    prevColumnId: isObjId(),
    nextCardOrderIds: isArrayObjectId(false),
    prevCardOrderIds: isArrayObjectId(false)
  })

  try {
    // TODO: abortEarly -> return all errors
    await schema.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error) {
    next(new UnprocessableEntityError(`${error}`))
  }
}

export default { createNew, update, moveCardToDiffColumn }
