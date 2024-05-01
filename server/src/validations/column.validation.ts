import Joi from "joi"
import { RequestHandler } from "express"
import { UnprocessableEntityError } from "~/core/error.response"
import { isString, isObjId, isArrayObjectId } from "~/utils/validator"

const createNew: RequestHandler = async (req, _, next) => {
  // // z: if u want to custom/override error message follow links below:
  // // !: https://stackoverflow.com/questions/48720942/node-js-joi-how-to-display-a-custom-error-messages
  // // !: https://github.com/hapijs/joi/blob/master/lib/types/string.js#L694
  const schema = Joi.object({
    boardId: isObjId(),
    title: isString().min(3).max(50)
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
    // boardId: isObjId(false), // if u want to move column to another board, u must be validate boardId
    title: isString(false).min(3).max(50),
    cardOrderIds: isArrayObjectId()
  })

  try {
    // TODO: abortEarly -> return all errors
    await schema.validateAsync(req.body, { abortEarly: false, allowUnknown: true })
    next()
  } catch (error) {
    next(new UnprocessableEntityError(`${error}`))
  }
}

const deleteItem: RequestHandler = async (req, _, next) => {
  const schema = Joi.object({ id: isObjId() })

  try {
    await schema.validateAsync(req.params)
    next()
  } catch (error) {
    next(new UnprocessableEntityError(`${error}`))
  }
}

export default { createNew, update, deleteItem }
