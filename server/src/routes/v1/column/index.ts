import express from "express"
import { StatusCodes } from "http-status-codes"
import { asyncHandler } from "~/middleware/error.middleware"
import controllers from "~/controllers/column.controller"
import validations from "~/validations/column.validation"

const router = express.Router()

router
  .route("/")
  .get((_, res) => {
    res.status(StatusCodes.OK).json({ message: `API get list columns` })
  })
  .post(validations.createNew, asyncHandler(controllers.createNew))

router
  .route("/:id")
  .put(validations.update, asyncHandler(controllers.update))
  .delete(validations.deleteItem, asyncHandler(controllers.deleteItem))

export default router
