import { RequestHandler } from "express"
import { CREATED } from "~/core/success.response"
import CardService from "~/services/card.service"

class CardController {
  createNew: RequestHandler = async (req, res) => {
    new CREATED({
      metadata: await CardService.createNew(req.body)
    }).send(res)
  }
}

export default new CardController()
