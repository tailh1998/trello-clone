import Joi from "joi"
import { RequestHandler } from "express"
import { isString, isObjId } from "~/utils/validator"
import { UnprocessableEntityError } from "~/core/error.response"

const createNew: RequestHandler = async (req, _, next) => {
  // // z: if u want to custom/override error message follow links below:
  // // !: https://stackoverflow.com/questions/48720942/node-js-joi-how-to-display-a-custom-error-messages
  // // !: https://github.com/hapijs/joi/blob/master/lib/types/string.js#L694
  const schema = Joi.object({
    boardId: isObjId(),
    columnId: isObjId(),
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

export default { createNew }
