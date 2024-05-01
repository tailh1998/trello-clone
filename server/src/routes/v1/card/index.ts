import express from "express"
import { StatusCodes } from "http-status-codes"
import { asyncHandler } from "~/middleware/error.middleware"
import controllers from "~/controllers/card.controller"
import validations from "~/validations/card.validation"

const router = express.Router()

router
  .route("/")
  .get((_, res) => {
    res.status(StatusCodes.OK).json({ message: `API get list cards` })
  })
  .post(validations.createNew, asyncHandler(controllers.createNew))

export default router
