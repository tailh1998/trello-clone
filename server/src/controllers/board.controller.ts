import { RequestHandler } from "express"
import { CREATED, OK } from "~/core/success.response"
import BoardService from "~/services/board.service"

export interface RequestCustom extends Request {
  user: {
    userId: string
    email: string
    iat: number
    exp: number
  }
}

class BoardController {
  createNew: RequestHandler = async (req, res) => {
    const customRequest = req as unknown as RequestCustom // ! skip for now , fix after

    new CREATED({
      metadata: await BoardService.createNew({
        ...req.body,
        userId: customRequest.user.userId
      })
    }).send(res)
  }

  update: RequestHandler = async (req, res) => {
    new OK({
      metadata: await BoardService.update(req.params.id, req.body)
    }).send(res)
  }

  getDetails: RequestHandler = async (req, res) => {
    const customRequest = req as unknown as RequestCustom // ! skip for now , fix after

    const data = {
      id: req.params.id,
      userId: customRequest.user.userId
    }
    new OK({
      metadata: await BoardService.getDetails(data)
    }).send(res)
  }

  moveCardToDiffColumn: RequestHandler = async (req, res) => {
    new OK({
      metadata: await BoardService.moveCardToDiffColumn(req.body)
    }).send(res)
  }
}

export default new BoardController()
