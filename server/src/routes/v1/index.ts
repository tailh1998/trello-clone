import express from "express"
import { OK } from "~/core/success.response"
import { apiKey, permission } from "~/auth/checkAuth"

// Entities
import access from "~/routes/v1/access"
import board from "~/routes/v1/board"
import column from "~/routes/v1/column"
import card from "~/routes/v1/card"
const router = express.Router()

router.use(apiKey)
router.use(permission("0000"))

router.use("/", access)

/**
 * @openapi
 * /v1/api/health-check:
 *  get:
 *     tags:
 *     - API
 *     description: Responds if the app is up and running
 *     responses:
 *       200:
 *         description: App is up and running
 */
router.get("/health-check", (_, res) => {
  new OK({
    message: "Welcome ROUTE V1 !!!",
    metadata: {
      cheatCode: "HaHaHaHa !!!"
    }
  }).send(res)
})

router.use("/board", board)

router.use("/column", column)

router.use("/card", card)

export default router
