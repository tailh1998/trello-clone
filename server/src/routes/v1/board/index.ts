import express from "express"
import { StatusCodes } from "http-status-codes"
import { asyncHandler } from "~/middleware/error.middleware"
import controllers from "~/controllers/board.controller"
import validations from "~/validations/board.validation"

const router = express.Router()

router
  .route("/")
  .get((_, res) => {
    res.status(StatusCodes.OK).json({ message: `API get list boards` })
  })
  .post(validations.createNew, asyncHandler(controllers.createNew))

router
  .route("/:id")
  .get(asyncHandler(controllers.getDetails))
  .put(validations.update, asyncHandler(controllers.update))

// Api support for moving cards between different columns
router
  .route("/supports/moving_card")
  .put(validations.moveCardToDiffColumn, asyncHandler(controllers.moveCardToDiffColumn))

export default router
